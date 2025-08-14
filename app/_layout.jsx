import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function Layout() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  return (
    <Stack
      screenOptions={{
        headerLargeTitle: true, // iOS large title style
        headerLargeTitleShadowVisible: false,
        headerStyle: { backgroundColor: isDark ? "#000" : "#fefefe" },
        headerTitleStyle: { color: isDark ? "#fff" : "#000" },
        headerTintColor: isDark ? "#fff" : "#000",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Folders" }} />
      <Stack.Screen name="notes-page" options={{ title: "Notes" }} />
      <Stack.Screen name="note-editor" options={{ title: "New Note" }} />
      <Stack.Screen name="settings" options={{ title: "Settings" }} />
      <Stack.Screen
        name="folder-modal"
        options={{
          presentation: "modal",
          title: "",
        }}
      />
    </Stack>
  );
}
