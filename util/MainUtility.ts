import { Alert } from "react-native";

export const showErrorMessage = (error: unknown) => {
  console.error("Error: "+error)
  if (error instanceof TypeError && error.message.includes("Network")) {
    // Handle network errors
    Alert.alert("Network Error", "Please check your internet connection and try again.");
  } else if (error instanceof Error && error.message === "Request timed out") {
    // Handle timeout errors
    Alert.alert("Timeout Error", "The request timed out. Please try again later.");
  } else if (error instanceof Error) {
    // Handle other general errors
    Alert.alert("Error", error.message || "An unexpected error occurred. Please try again later.");
  } else {
    // Handle unknown errors
    Alert.alert("Error", "An unknown error occurred. Please try again later.");
  }
};
