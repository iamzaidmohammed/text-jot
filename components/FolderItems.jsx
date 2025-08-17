import { useRouter } from "expo-router";
import {
  ActionSheetIOS,
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { deleteFolder, renameFolder } from "../database/queries";
import { useThemeColors } from "../theme";

export default function FolderItem({ id, name, count, onRefresh }) {
  const router = useRouter();
  const colors = useThemeColors();

  const handleLongPress = () => {
    const options = ["Rename", "Delete", "Cancel"];
    const cancelIndex = 2;

    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex: cancelIndex,
          destructiveButtonIndex: 1,
        },
        async (buttonIndex) => {
          if (buttonIndex === 0) {
            // Rename
            Alert.prompt("Rename Folder", "Enter a new name:", [
              { text: "Cancel", style: "cancel" },
              {
                text: "Save",
                onPress: async (newName) => {
                  if (newName?.trim()) {
                    await renameFolder(id, newName.trim());
                    onRefresh?.();
                  }
                },
              },
            ]);
          } else if (buttonIndex === 1) {
            // Delete
            Alert.alert(
              "Delete Folder?",
              "This will remove all notes inside.",
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Delete",
                  style: "destructive",
                  onPress: async () => {
                    await deleteFolder(id);
                    onRefresh?.();
                  },
                },
              ]
            );
          }
        }
      );
    } else {
      Alert.alert("Folder Options", name, [
        {
          text: "Rename",
          onPress: () =>
            Alert.prompt("Rename Folder", "Enter a new name:", [
              { text: "Cancel", style: "cancel" },
              {
                text: "Save",
                onPress: async (newName) => {
                  if (newName?.trim()) {
                    await renameFolder(id, newName.trim());
                    onRefresh?.();
                  }
                },
              },
            ]),
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteFolder(id);
            onRefresh?.();
          },
        },
        { text: "Cancel", style: "cancel" },
      ]);
    }
  };

  return (
    <Pressable
      onPress={() => router.push(`/notes-page?folderId=${id}`)}
      onLongPress={handleLongPress}
    >
      <View style={[styles.item, { backgroundColor: colors.bg }]}>
        <Text style={[styles.name, { color: colors.text }]}>{name}</Text>
        <Text style={styles.count}>{count}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#ccc",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  name: { fontSize: 18 },
  count: { color: "#999" },
});
