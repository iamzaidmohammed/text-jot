import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useThemeColors } from "../theme";

export default function NoteEditor() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const colors = useThemeColors();
  const navigation = useNavigation();

  const handleSave = () => {
    // ✅ For now, just log the note
    console.log("Note saved:", { title, body });
    navigation.goBack();
  };

  // Show Save button when typing
  useEffect(() => {
    if (title.trim() !== "" || body.trim() !== "") {
      navigation.setOptions({
        headerRight: () => (
          <Pressable
            onPress={() => {
              console.log("Note saved:", { title, body });
              navigation.goBack();
            }}
            style={{ marginRight: 10 }}
          >
            <Text
              style={{ color: colors.primary, fontSize: 16, fontWeight: "600" }}
            >
              Save
            </Text>
          </Pressable>
        ),
      });
    } else {
      navigation.setOptions({ headerRight: () => null });
    }
  }, [title, body, navigation, colors.primary]);

  return (
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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 150 },
  titleInput: { fontSize: 22, fontWeight: "600", marginBottom: 8 },
  bodyInput: { fontSize: 16, flex: 1, lineHeight: 22 },
});
