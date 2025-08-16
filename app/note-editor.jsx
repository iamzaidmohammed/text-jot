import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { addNote, getNotes, updateNote } from "../database/queries";
import { useThemeColors } from "../theme";

export default function NoteEditor() {
  const { noteId, folderId } = useLocalSearchParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const colors = useThemeColors();
  const router = useRouter();

  // If editing, load the note from DB
  useEffect(() => {
    async function loadNote() {
      if (noteId) {
        // console.log(folderId);
        const allNotes = await getNotes(folderId);
        const existingNote = allNotes.find((n) => n.id === parseInt(noteId));
        if (existingNote) {
          setTitle(existingNote.title);
          setBody(existingNote.body);
          // console.log(noteId, "exisit");
        }
      }
    }
    loadNote();
  }, [noteId, folderId]);

  const handleSave = useCallback(async () => {
    if (noteId) {
      await updateNote(noteId, title, body);
    } else {
      await addNote(folderId, title, body);
    }
    router.back();
  }, [noteId, folderId, title, body, router]);

  // const handleSave = () => {
  //   console.log(noteId);
  //   console.log(folderId);
  // };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () =>
            title.trim() !== "" || body.trim() !== "" ? (
              <Pressable
                onPress={handleSave}
                style={{ marginRight: 10, padding: 8 }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                accessibilityRole="button"
                accessibilityLabel="Save note"
              >
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  Save
                </Text>
              </Pressable>
            ) : null,
        }}
      />

      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <TextInput
          style={[styles.titleInput, { color: colors.text }]}
          placeholder="Title"
          placeholderTextColor="#888"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.bodyInput, { color: colors.text }]}
          placeholder="Start typing..."
          placeholderTextColor="#888"
          value={body}
          onChangeText={setBody}
          multiline
          textAlignVertical="top"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 150 },
  titleInput: { fontSize: 22, fontWeight: "600", marginBottom: 8 },
  bodyInput: { fontSize: 16, flex: 1, lineHeight: 22 },
});
