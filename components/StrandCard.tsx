import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { ProgressBar } from "react-native-paper"; // For progress bar
import { Users } from "lucide-react-native"; // For icons
import CompetenceLevel from "./CompetenceLevel"; // Assuming this is a custom component

interface StrandCardProps {
  strand: {
    strand: string;
    workCovered: number;
    students: {
      studentId: string;
      name: string;
      competence: string;
    }[];
  };
  onStudentClick: (studentId: string) => void;
}

const StrandCard = ({ strand, onStudentClick }: StrandCardProps) => {
  return (
    <View style={styles.card}>
      {/* Header Section */}
      <View style={styles.cardHeader}>
        <View style={styles.headerRow}>
          <Text style={styles.cardTitle}>{strand.strand}</Text>
          <View style={styles.studentCount}>
            <Users size={16} color="#6b7280" />
            <Text style={styles.studentCountText}>
              {strand.students.length}
            </Text>
          </View>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Work Progress</Text>
            <Text style={styles.progressValue}>{strand.workCovered}%</Text>
          </View>
          <ProgressBar
            progress={strand.workCovered / 100}
            color="#4CAF50"
            style={styles.progressBar}
          />
        </View>
      </View>

      {/* Students Section */}
      <View style={styles.cardContent}>
        <Text style={styles.studentsLabel}>Students</Text>
        <FlatList
          data={strand.students}
          keyExtractor={(item) => item.studentId}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.studentButton}
              onPress={() => onStudentClick(item.studentId)}
            >
              <Text style={styles.studentName}>{item.name}</Text>
              <CompetenceLevel level="ME" size="sm" variant="pill" />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E88E5",
  },
  studentCount: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  studentCountText: {
    fontSize: 14,
    color: "#6b7280",
    marginLeft: 4,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 12,
    color: "#6b7280",
  },
  progressValue: {
    fontSize: 12,
    fontWeight: "500",
    color: "#000",
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  cardContent: {
    marginTop: 8,
  },
  studentsLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6b7280",
    marginBottom: 8,
  },
  studentButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    marginBottom: 8,
  },
  studentName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
});

export default StrandCard;
