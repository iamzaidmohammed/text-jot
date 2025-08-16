import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { addFolder } from "../database/queries";
import { useThemeColors } from "../theme";

export default function FolderModal() {
  const colors = useThemeColors();
  const router = useRouter();
  const [folderName, setFolderName] = useState("");

  async function createFolder() {
    if (folderName !== "") {
      await addFolder(folderName);
      setFolderName("");
      router.back();
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>New Folder</Text>
      <TextInput
        style={[styles.input, { color: colors.text, borderColor: colors.text }]}
        placeholder="Folder name"
        placeholderTextColor="#888"
        value={folderName}
        onChangeText={setFolderName}
      />

      <View style={styles.buttonRow}>
        <Pressable
          style={[styles.button, { backgroundColor: "#ccc" }]}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
        <Pressable
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={createFolder}
          disabled={folderName === ""}
        >
          <Text style={[styles.buttonText, { color: "#fff" }]}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
