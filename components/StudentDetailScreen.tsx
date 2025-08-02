import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";

import {
  Eye,
  BookOpen,
  PenTool,
  Volume2,
  AlertCircle,
} from "lucide-react-native";
import { ThemedView } from "@/components/ThemedView";
import StudentHeader from "@/components/StudentHeader";
import StudentStrandCard from "@/components/StudentStrandCard";

const mockStudents = [
  {
    id: "student1",
    name: "John Doe",
    strands: {
      letterIdentification: { competence: "ME", progress: 75 },
      letterNaming: { competence: "AE", progress: 50 },
      letterFormation: { competence: "BE", progress: 30 },
      phonemicAwareness: { competence: "EE", progress: 90 },
    },
  },
  {
    id: "student2",
    name: "Jane Smith",
    strands: {
      letterIdentification: { competence: "AE", progress: 60 },
      letterNaming: { competence: "ME", progress: 80 },
      letterFormation: { competence: "ME", progress: 75 },
      phonemicAwareness: { competence: "AE", progress: 55 },
    },
  },
];

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
const StudentDetailScreen = () => {
  console.log("id: " + "");

  const { studentId } = {
    studentId: "student1",
  };

  //const student = mockStudents.find((s) => s.id === studentId);
  const [students, setStudents] = useState<Student[]>([]); // Holds all students fetched from the API
  const [student, setStudent] = useState<Student | null>(null); // Holds the specific student
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        const response = await fetch("http://localhost:3000/students"); // Replace with your API URL
        const data = await response.json();
        setStudents(data as Student[]); // Save all students
      } catch (error) {
        console.error("Error fetching strand data:", error);
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
    if (!student) {
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

  return (
    <ScrollView style={styles.container}>
      <StudentHeader studentName={student.name} />

      <View style={styles.strandGrid}>
        {Object.entries(student.strands).map(([strandKey, strandData]) => (
          <StudentStrandCard
            key={strandKey}
            strandName={strandNames[strandKey as keyof typeof strandNames]}
            strandData={strandData}
            icon={strandIcons[strandKey as keyof typeof strandIcons]}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  strandGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 16,
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
    flexBasis: "48%", // Each card takes 48% of the row width
    flexGrow: 1, // Ensures cards grow equally
    height: 200, // Fixed height for all cards
    marginBottom: 16, // Spacing between rows
  },
});

export default StudentDetailScreen;
