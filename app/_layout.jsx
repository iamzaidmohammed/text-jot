import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

export default function Layout() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const router = useRouter();

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
      <Stack.Screen
        name="index"
        options={{
          title: "Folders",
          headerRight: () => (
            <Pressable
              style={{
                marginRight: 20,
                // marginTop: 15,
                padding: 10,
              }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              onPress={() => router.push("/settings")}
            >
              <Ionicons
                name="settings-outline"
                size={28}
                color={isDark ? "#fff" : "#000"}
              />
            </Pressable>
          ),
        }}
      />
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
