import { ActivityIndicator, StyleSheet, View } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import ClassOverviewHeader from "@/components/ClassOverviewHeader";
import StrandCard from "@/components/StrandCard";
import StrandList from "@/components/StrandList";
import MasteryKeyPanel from "@/components/MasteryKeyPanel";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

const strandListData_ = [
  {
    strandId: "strand1",
    strand: "Letter Identification",
    workCovered: 70,
    students: [
      { studentId: "student1", name: "John Doe", competence: "ME" },
      { studentId: "student2", name: "Jane Smith", competence: "AE" },
    ],
  },
  {
    strandId: "strand2",
    strand: "Letter Naming",
    workCovered: 65,
    students: [
      { studentId: "student1", name: "John Doe", competence: "AE" },
      { studentId: "student2", name: "Jane Smith", competence: "ME" },
    ],
  },
];

export default function ClassOverviewScreen() {
  const [strandListData, setStrandListData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStrandData = async () => {
      try {
        const response = await fetch("http://localhost:3000/class_profile"); // Replace with your API URL
        const data = await response.json();
        setStrandListData(data.strands);
      } catch (error) {
        console.error("Error fetching strand data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStrandData();
  }, []);

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

  return (
    <ThemedView style={styles.container}>
      <ClassOverviewHeader onSearchChange={(_) => {}} />

      <StrandList strandList={strandListData} onStudentClick={onStudentClick} />

      <View style={styles.stickyContainer}>
        <MasteryKeyPanel />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  stickyContainer: {
    //alignSelf:"flex-end",
  },
});
