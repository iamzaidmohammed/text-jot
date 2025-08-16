import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import FloatingButton from "../components/FloatingButton";
import FolderItem from "../components/FolderItems";
import SearchBar from "../components/SearchBar";
import { getFolders } from "../database/queries";
import { useThemeColors } from "../theme";

export default function FoldersScreen() {
  const colors = useThemeColors();
  const router = useRouter();

  const [folders, setFolders] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadFolders();
    }, [])
  );

  async function loadFolders() {
    try {
      const data = await getFolders();
      setFolders(data);
    } catch (error) {
      console.error("Error loading folders:", error);
    }
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable
              style={{
                marginRight: 20,
                marginTop: 15,
              }}
              onPress={() => router.push("/settings")}
            >
              <Ionicons name="settings-outline" size={28} color={colors.text} />
            </Pressable>
          ),
        }}
      />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <SearchBar placeholder="Search folders" />
        {folders.length < 1 ? (
          <Text
            style={{ color: colors.text, textAlign: "center", marginTop: 20 }}
          >
            No folders found. Create one to get started!
          </Text>
        ) : (
          <FlatList
            data={folders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <FolderItem id={item.id} name={item.name} count={item.count} />
            )}
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={{ paddingHorizontal: 20 }}
          />
        )}
        <FloatingButton icon="folder-outline" navigateTo="/folder-modal" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 150 },
});
