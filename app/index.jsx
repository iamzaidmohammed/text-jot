import { FlatList, StyleSheet, View } from "react-native";
import FloatingButton from "../components/FloatingButton";
import FolderItem from "../components/FolderItems";
import SearchBar from "../components/SearchBar";
import { useThemeColors } from "../theme";

export default function FoldersScreen() {
  const colors = useThemeColors();

  const folders = [
    { id: "1", name: "College", count: 5 },
    { id: "2", name: "Personal", count: 3 },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SearchBar placeholder="Search folders" />
      <FlatList
        data={folders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FolderItem name={item.name} count={item.count} />
        )}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
      />

      <FloatingButton icon="folder-outline" navigateTo="/folder-modal" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 150 },
});
