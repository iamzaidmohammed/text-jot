import { useRouter } from "expo-router";
import {
  ActionSheetIOS,
  Alert,
  Platform,
  Pressable,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { deleteNote } from "../database/queries";
import { useThemeColors } from "../theme";

export default function NotesItem({
  id,
  folderId,
  title,
  preview,
  date,
  onRefresh,
}) {
  const router = useRouter();
  const colors = useThemeColors();

  const handleLongPress = () => {
    const options = ["Share", "Delete", "Cancel"];
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
            // Share
            await Share.share({
              message: `${title}\n\n${preview}`,
            });
          } else if (buttonIndex === 1) {
            // Delete
            Alert.alert("Delete Note?", "This cannot be undone.", [
              { text: "Cancel", style: "cancel" },
              {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                  await deleteNote(id);
                  onRefresh?.();
                },
              },
            ]);
          }
        }
      );
    } else {
      Alert.alert("Note Options", title, [
        {
          text: "Share",
          onPress: async () => {
            await Share.share({
              message: `${title}\n\n${preview}`,
            });
          },
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteNote(id);
            onRefresh?.();
          },
        },
        { text: "Cancel", style: "cancel" },
      ]);
    }
  };

  return (
    <Pressable
      onPress={() =>
        router.push(`/note-editor?noteId=${id}&folderId=${folderId}`)
      }
      onLongPress={handleLongPress}
    >
      <View style={styles.item}>
        <View style={{ flex: 1 }}>
          <Text
            style={[styles.title, { color: colors.text }]}
            numberOfLines={1}
          >
            {title}
          </Text>
          <Text
            style={[styles.preview, { color: colors.text }]}
            numberOfLines={1}
          >
            {preview}
          </Text>
        </View>
        <Text style={[styles.date, { color: "#999" }]}>{date}</Text>
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
  title: { fontSize: 18, fontWeight: "600" },
  preview: { fontSize: 14, opacity: 0.8 },
  date: { fontSize: 12, marginLeft: 10 },
});
