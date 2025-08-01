import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { GraduationCap, Search } from "lucide-react-native";

interface ClassOverviewHeaderProps {
  onSearchChange: (query: string) => void;
}

const ClassOverviewHeader = ({ onSearchChange }: ClassOverviewHeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    onSearchChange(query);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <GraduationCap size={32} color="white" />
        </View>
        <View>
          <Text style={styles.title}>Class Performance Overview</Text>
          <Text style={styles.subtitle}>
            Monitor student progress across learning strands
          </Text>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <Search size={16} color="#ccc" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search for students..."
          placeholderTextColor="#ccc"
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "linear-gradient(to right, #4CAF50, #81C784)", // Replace with a gradient library if needed
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: "flex-start",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 50,
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.9)",
  },
  searchContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  searchIcon: {
    position: "absolute",
    left: 12,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 40,
    paddingVertical: 8,
    color: "white",
    flex: 1,
  },
});

export default ClassOverviewHeader;
