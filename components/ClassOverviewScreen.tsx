import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
import config from "@/util/config.json";
import ClassOverviewHeader from "@/components/ClassOverviewHeader";
import MasteryKeyPanel from "@/components/MasteryKeyPanel";
import StrandList from "@/components/StrandList";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { showErrorMessage } from "@/util/MainUtility";

interface StrandListItem {
  strandId: string;
  strand: string;
  workCovered: number;
  students: {
    studentId: string;
    name: string;
    competence: string;
  }[];
}

const ClassOverviewScreen = () => {
  const [strandListData, setStrandListData] = useState<StrandListItem[]>([]);
  const [filteredStrandList, setFilteredStrandList] = useState<
    StrandListItem[]
  >([]); // State for filtered data
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState<unknown | null>(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    const fetchStrandData = async () => {
      try {
        const baseUrl = config.JSON_SERVER_BASE_URL!!;
        const response = await fetch(`${baseUrl}/class_profile`); // Replace with your API URL
        const data = await response.json();
        setStrandListData(data.strands);
        setFilteredStrandList(data.strands);
      } catch (error) {
        setNetworkError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStrandData();
  }, []);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query); // Update the search query
    // Filter students within each strand
    const filteredData = strandListData.map(
      (strandListItem: StrandListItem) => {
        const filteredStudents = strandListItem.students.filter(
          (student) => student.name.toLowerCase().includes(query.toLowerCase()) // Filter students by name
        );

        return {
          ...strandListItem,
          students: filteredStudents, // Update the students array with filtered students
        };
      }
    );

    setFilteredStrandList(filteredData); // Update the filtered data
  };

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </ThemedView>
    );
  }
  const router = useRouter();
  const onStudentClick = (studentId: string) => {
    console.log("hello");
    router.push(`/student/${studentId}`);
  };

  if (networkError) {
    return showErrorMessage(networkError);
  }

  return (
    <ThemedView style={styles.container}>
      <ClassOverviewHeader onSearchChange={handleSearchChange} />

      <StrandList
        strandList={filteredStrandList}
        onStudentClick={onStudentClick}
      />

      <View style={styles.stickyContainer}>
        <MasteryKeyPanel />
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  stickyContainer: {
    //alignSelf:"flex-end",
  },
});

export default ClassOverviewScreen;
