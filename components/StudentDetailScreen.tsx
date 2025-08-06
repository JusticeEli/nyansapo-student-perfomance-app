import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  AlertCircle,
  BookOpen,
  Eye,
  PenTool,
  Volume2,
} from "lucide-react-native";

import StudentHeader from "./StudentHeader";
import StudentStrandCard from "./StudentStrandCard";
import { ThemedView } from "./ThemedView";
import { showErrorMessage } from "@/util/MainUtility";
import config from "@/util/config.json";

interface Strand {
  competence: "BE" | "AE" | "ME" | "EE";
  progress: number;
}

interface Student {
  id: string;
  name: string;
  strands: {
    letterIdentification: Strand;
    letterNaming: Strand;
    letterFormation: Strand;
    phonemicAwareness: Strand;
  };
}

interface StudentDetailScreenProp {
  studentId: string;
}
const StudentDetailScreen = ({ studentId }: StudentDetailScreenProp) => {
  console.log("studentId: " + studentId);

  const [students, setStudents] = useState<Student[]>([]); // Holds all students fetched from the API
  const [student, setStudent] = useState<Student | null>(null); // Holds the specific student
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        const baseUrl = config.JSON_SERVER_BASE_URL!!;
        const response = await fetch(`${baseUrl}/students`); // Replace with your API URL
        const data = await response.json();
        setStudents(data as Student[]); // Save all students
      } catch (error) {
        showErrorMessage(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentsData();
  }, []);

  useEffect(() => {
    const foundStudent = students?.find((s) => s.id === studentId);
    console.log("foundstudent: " + foundStudent);

    setStudent(foundStudent || null); // Save the specific student
  }, [students]);
  useEffect(() => {
    if (!student && !loading) {
      Alert.alert("Error", "Student not found", [
        { text: "OK", onPress: () => {} },
      ]);
    }
  }, [student]);

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </ThemedView>
    );
  }
  if (!student) {
    return (
      <View style={styles.notFoundContainer}>
        <View style={styles.notFoundCard}>
          <AlertCircle size={24} color="#757575" />
          <Text style={styles.notFoundText}>Student not found</Text>
        </View>
      </View>
    );
  }

  const strandIcons = {
    letterIdentification: <Eye size={20} color="#1E88E5" />,
    letterNaming: <BookOpen size={20} color="#1E88E5" />,
    letterFormation: <PenTool size={20} color="#1E88E5" />,
    phonemicAwareness: <Volume2 size={20} color="#1E88E5" />,
  };

  const strandNames = {
    letterIdentification: "Letter Identification",
    letterNaming: "Letter Naming",
    letterFormation: "Letter Formation",
    phonemicAwareness: "Phonemic Awareness",
  };

  const renderStrandCard = ({ item }: { item: [string, Strand] }) => {
    const [strandKey, strandData] = item;
    return (
      <StudentStrandCard
        key={strandKey}
        strandName={strandNames[strandKey as keyof typeof strandNames]}
        strandData={strandData}
        icon={strandIcons[strandKey as keyof typeof strandIcons]}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StudentHeader studentName={student.name} />
      <FlatList
        data={Object.entries(student.strands)} // Convert strands object to an array
        renderItem={renderStrandCard} // Render each strand as a card
        keyExtractor={([strandKey]) => strandKey} // Use strandKey as the unique key
        contentContainerStyle={styles.strandGrid} // Apply styles to the list container
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },

  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  notFoundCard: {
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notFoundText: {
    marginTop: 8,
    fontSize: 16,
    color: "#757575",
  },
  strandCard: {
    height: 200, // Fixed height for all cards
    marginBottom: 16, // Spacing between rows
  },
});

export default StudentDetailScreen;
