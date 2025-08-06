import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Appearance,
  ColorSchemeName,
} from "react-native";
import { GraduationCap, Search } from "lucide-react-native";
import { blue } from "react-native-reanimated/lib/typescript/Colors";

interface ClassOverviewHeaderProps {
  onSearchChange: (query: string) => void;
}

const ClassOverviewHeader = ({ onSearchChange }: ClassOverviewHeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme()
  );

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });

    return () => subscription.remove();
  }, []);

  const isDarkTheme = theme === "dark";

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    onSearchChange(query);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkTheme ? "#333" : "#fff", // Adjust background color based on theme
        },
      ]}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: isDarkTheme
                ? "rgba(255, 255, 255, 0.2)"
                : "rgba(0, 0, 0, 0.1)", // Adjust icon background
            },
          ]}
        >
          <GraduationCap size={32} color={isDarkTheme ? "white" : "black"} />
        </View>
        <View>
          <Text
            style={[
              styles.title,
              { color: isDarkTheme ? "white" : "black" }, // Adjust title color
            ]}
          >
            Class Performance Overview
          </Text>
          <Text
            style={[
              styles.subtitle,
              {
                color: isDarkTheme
                  ? "rgba(255, 255, 255, 0.9)"
                  : "rgba(0, 0, 0, 0.7)",
              }, // Adjust subtitle color
            ]}
          >
            Monitor student progress across learning strands
          </Text>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <Search
          size={16}
          color={isDarkTheme ? "#ccc" : "#666"}
          style={styles.searchIcon}
        />
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDarkTheme
                ? "rgba(255, 255, 255, 0.2)"
                : "rgba(0, 0, 0, 0.05)", // Adjust input background
              borderColor: isDarkTheme
                ? "rgba(255, 255, 255, 0.3)"
                : "rgba(0, 0, 0, 0.2)", // Adjust input border
              color: isDarkTheme ? "white" : "black", // Adjust input text color
            },
          ]}
          placeholder="Search for students..."
          placeholderTextColor={isDarkTheme ? "#ccc" : "#666"} // Adjust placeholder color
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    borderRadius: 50,
    marginRight: 16,
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
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
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 40,
    paddingVertical: 8,
    flex: 1,
  },
});

export default ClassOverviewHeader;
