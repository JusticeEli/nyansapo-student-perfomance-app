// filepath: /home/justice/Desktop/projects/student-perfomance-app/app/_layout.tsx
import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="ClassOverviewScreen"
        options={{
          title: "Class Overview",
        }}
      />
      <Stack.Screen
        name="explore"
        options={{
          title: "Explore",
        }}
      />
    </Stack>
  );
}
