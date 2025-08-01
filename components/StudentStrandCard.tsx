import React from "react";
import { View, Text, StyleSheet, ProgressBarAndroid } from "react-native";
import CompetenceLevel from "./CompetenceLevel"; // Assuming CompetenceLevel is already implemented
import { BookOpen, TrendingUp } from "lucide-react-native"; // Assuming you're using lucide-react-native for icons
import { ProgressBar } from "react-native-paper";

interface StudentStrandCardProps {
  strandName: string;
  strandData: {
    competence: string;
    progress: number;
  };
  icon?: React.ReactNode;
}

const StudentStrandCard = ({
  strandName,
  strandData,
  icon,
}: StudentStrandCardProps) => {
  return (
    <View style={styles.card}>
      {/* Header Section */}
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          <View style={styles.iconContainer}>
            {icon || <BookOpen size={20} color="#1E88E5" />}
          </View>
          <Text style={styles.cardTitle}>{strandName}</Text>
        </View>
        <CompetenceLevel
          level={strandData.competence}
          size="md"
          variant="pill"
        />
      </View>

      {/* Content Section */}
      <View style={styles.cardContent}>
        <View style={styles.progressHeader}>
          <TrendingUp size={16} color="#757575" />
          <Text style={styles.progressHeaderText}>Work Progress</Text>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Completion</Text>
            <Text style={styles.progressValue}>{strandData.progress}%</Text>
          </View>
          <ProgressBar
            progress={strandData.progress / 100}
            color="#4CAF50"
            style={styles.progressBar}
          />
        </View>
        <View style={styles.currentLevelContainer}>
          <Text style={styles.currentLevelText}>
            Current Level:{" "}
            <Text style={styles.currentLevelValue}>
              {strandData.competence}
            </Text>
          </Text>
        </View>
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

 /*    flexBasis: "45%", // Each card takes 48% of the row width
    flexGrow: 1, // Ensures cards grow equally
    height: 200, // Fixed height for all cards
    marginHorizontal:8, */
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    padding: 8,
    backgroundColor: "rgba(30, 136, 229, 0.1)",
    borderRadius: 8,
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E88E5",
  },
  cardContent: {
    marginTop: 8,
  },
  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  progressHeaderText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#757575",
    marginLeft: 8,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 12,
    color: "#757575",
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
  currentLevelContainer: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 8,
  },
  currentLevelText: {
    fontSize: 12,
    color: "#757575",
  },
  currentLevelValue: {
    fontWeight: "500",
    color: "#000",
  },
});

export default StudentStrandCard;
