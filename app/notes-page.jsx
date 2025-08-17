// pages/notes-page.jsx (NotesScreen)
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import FloatingButton from "../components/FloatingButton";
import NotesItem from "../components/NotesItems";
import SearchBar from "../components/SearchBar";
import { getNotes } from "../database/queries";
import { useThemeColors } from "../theme";

export default function NotesScreen() {
  const colors = useThemeColors();
  const router = useRouter();
  const { folderId } = useLocalSearchParams();
  const [notes, setNotes] = useState([]);
  const [allNotes, setAllNotes] = useState([]);

  const loadNotes = useCallback(async () => {
    if (!folderId) return;
    try {
      const result = await getNotes(folderId);
      setNotes(result);
      setAllNotes(result);
    } catch (error) {
      console.error("Error loading notes:", error);
    }
  }, [folderId]);

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [loadNotes])
  );

  const searchNotes = (text) => {
    const q = (text || "").trim().toLowerCase();
    if (q.length > 0) {
      const filteredNotes = allNotes.filter(
        (note) =>
          (note.title || "").toLowerCase().includes(q) ||
          (note.body || "").toLowerCase().includes(q)
      );
      setNotes(filteredNotes);
    } else {
      setNotes(allNotes);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable
              onPress={() => router.push("/settings")}
              style={{ marginRight: 20, marginTop: 15 }}
            >
              <Ionicons name="settings-outline" size={28} color={colors.text} />
            </Pressable>
          ),
        }}
      />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <SearchBar placeholder="Search notes..." onChangeText={searchNotes} />
        {notes.length < 1 ? (
          <Text
            style={{ color: colors.text, textAlign: "center", marginTop: 20 }}
          >
            No notes found in this folder. Create one to get started!
          </Text>
        ) : (
          <FlatList
            data={notes}
            keyExtractor={(item) => item.id?.toString()}
            renderItem={({ item }) => (
              <NotesItem
                id={item.id}
                title={item.title}
                preview={item.body}
                folderId={folderId}
                date={new Date(item.date_edited).toLocaleDateString()}
                onRefresh={loadNotes} // ✅ refresh after delete
              />
            )}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          />
        )}
        <FloatingButton
          icon="create-outline"
          navigateTo={`/note-editor?folderId=${folderId}`}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 150 },
});
