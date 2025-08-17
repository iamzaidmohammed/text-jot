// pages/index.jsx (FoldersScreen)
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
  const [allFolders, setAllFolders] = useState([]);

  const loadFolders = useCallback(async () => {
    try {
      const data = await getFolders();
      setFolders(data);
      setAllFolders(data);
    } catch (error) {
      console.error("Error loading folders:", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFolders();
    }, [loadFolders])
  );

  const searchFolder = (text) => {
    const q = (text || "").trim().toLowerCase();
    if (q.length > 0) {
      const filteredFolders = allFolders.filter((folder) =>
        folder.name.toLowerCase().includes(q)
      );
      setFolders(filteredFolders);
    } else {
      setFolders(allFolders);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable
              style={{ marginRight: 20, marginTop: 15 }}
              onPress={() => router.push("/settings")}
            >
              <Ionicons name="settings-outline" size={28} color={colors.text} />
            </Pressable>
          ),
        }}
      />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <SearchBar placeholder="Search folders" onChangeText={searchFolder} />
        {folders.length < 1 ? (
          <Text
            style={{ color: colors.text, textAlign: "center", marginTop: 20 }}
          >
            No folders found. Create one to get started!
          </Text>
        ) : (
          <FlatList
            data={folders}
            keyExtractor={(item) => item.id?.toString()}
            renderItem={({ item }) => (
              <FolderItem
                id={item.id}
                name={item.name}
                count={item.count}
                onRefresh={loadFolders}
              />
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
