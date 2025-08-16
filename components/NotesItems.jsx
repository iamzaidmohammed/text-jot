import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useThemeColors } from "../theme";

export default function NotesItem({ id, folderId, title, preview, date }) {
  const router = useRouter();
  const colors = useThemeColors();

  return (
    <Pressable
      onPress={
        () =>
          router.push({
            pathname: `/note-editor?noteId=${id}&folderId=${folderId}`,
            // params: { noteId: id, folderId: folderId },
          })
        // console.log(id)
      }
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
