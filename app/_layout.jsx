import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { ThemeProvider } from "../context/ThemeContext";
import { initDB } from "../database/db";
import { useThemeColors } from "../theme";

function InnerLayout() {
  const colors = useThemeColors();

  return (
    <Stack
      screenOptions={{
        headerLargeTitle: true,
        headerLargeTitleShadowVisible: false,
        headerStyle: { backgroundColor: colors.background },
        headerTitleStyle: { color: colors.text },
        headerTintColor: colors.text,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Folders" }} />
      <Stack.Screen name="notes-page" options={{ title: "Notes" }} />
      <Stack.Screen name="note-editor" options={{ title: "New Note" }} />
      <Stack.Screen name="settings" options={{ title: "Settings" }} />
      <Stack.Screen
        name="folder-modal"
        options={{ presentation: "modal", title: "" }}
      />
    </Stack>
  );
}

export default function Layout() {
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    async function prepareDB() {
      try {
        await initDB(); // ✅ wait for migrations
        setDbReady(true);
      } catch (e) {
        console.error("DB init failed", e);
      }
    }
    prepareDB();
  }, []);

  if (!dbReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <InnerLayout />
    </ThemeProvider>
  );
}
