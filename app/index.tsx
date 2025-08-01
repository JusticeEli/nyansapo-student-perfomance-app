import { StyleSheet, View } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import ClassOverviewHeader from "@/components/ClassOverviewHeader";
import StrandCard from "@/components/StrandCard";
import StrandList from "@/components/StrandList";
import MasteryKeyPanel from "@/components/MasteryKeyPanel";

const strandListData = [
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
  return (
    <ThemedView style={styles.container}>
      <ClassOverviewHeader onSearchChange={(_) => {}} />

      <StrandList strandList={strandListData} />
      {/* Sticky Mastery Key Panel */}
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
