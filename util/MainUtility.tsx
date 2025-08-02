import { Alert, View, StyleSheet, Text } from "react-native";
import { AlertCircle } from "lucide-react-native";

const getErrorMessage = (error: unknown): string => {
  console.error("Error: " + error);

  if (error instanceof TypeError && error.message.includes("Network")) {
    // Handle network errors
   // return "Network Error: Please check your internet connection and try again.";
    return "Network Error: Please start your local backend";
  } else if (error instanceof Error && error.message === "Request timed out") {
    // Handle timeout errors
    return "Timeout Error: The request timed out. Please try again later.";
  } else if (error instanceof Error) {
    // Handle other general errors
    return (
      error.message || "An unexpected error occurred. Please try again later."
    );
  } else {
    // Handle unknown errors
    return "An unknown error occurred. Please try again later.";
  }
};
export const showErrorMessage = (error: unknown) => {
  console.error("Error: " + error);
  const errorMessage = getErrorMessage(error);

  return (
    <View style={styles.errorContainer}>
      <View style={styles.errorCard}>
        <AlertCircle size={24} color="#757575" />
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  errorCard: {
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
  errorText: {
    marginTop: 8,
    fontSize: 16,
    color: "#757575",
  },
});
