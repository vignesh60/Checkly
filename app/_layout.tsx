import { Stack } from "expo-router";
import { useFonts } from "expo-font";
export default function RootLayout() {
  useFonts({
    outfit: require("../assets/fonts/Poppins-Regular.ttf"),
    "outfit-m": require("../assets/fonts/Poppins-Medium.ttf"),
    "outfit-b": require("../assets/fonts/Poppins-Bold.ttf"),
    "Merienda-ExtraBold": require("../assets/fonts/Merienda-ExtraBold.ttf"),
    "Merienda-Medium": require("../assets/fonts/Merienda-Medium.ttf"),

  });
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen
        name="ToDoList"
        options={{ title: "To-Do List", headerShown: false }}
      />

      <Stack.Screen
        name="AddTask"
        options={{ title: "Add New Task", headerShown: false }}
      />

      <Stack.Screen
        name="+not-found"
        options={{ title: "Not Found", headerShown: true }}
      />
    </Stack>
  );
}
