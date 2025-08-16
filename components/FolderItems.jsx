import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useThemeColors } from "../theme";

export default function FolderItem({ id, name, count }) {
  const router = useRouter();
  const colors = useThemeColors();

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: `/notes-page?folderId=${id}`,
          // params: { folderId: id },
        })
      }
    >
      <View style={[styles.item, { backgroundColor: colors.bg }]}>
        <Text style={[styles.name, { color: colors.text }]}>{name}</Text>
        <Text style={[styles.count]}>{count}</Text>
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
