import { FlatList, StyleSheet, View } from "react-native";
import FloatingButton from "../components/FloatingButton";
import NotesItem from "../components/NotesItems";
import SearchBar from "../components/SearchBar";
import { useThemeColors } from "../theme";

export default function NotesScreen() {
  const colors = useThemeColors();

  const notes = [
    {
      id: "1",
      title: "Shopping List",
      preview: "Eggs, Milk, Bread",
      date: "Today",
    },
    {
      id: "2",
      title: "Meeting Notes",
      preview: "Discuss project roadmap",
      date: "Yesterday",
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SearchBar placeholder="Search notes..." />
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotesItem
            title={item.title}
            preview={item.preview}
            date={item.date}
          />
        )}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />

      <FloatingButton icon="create-outline" navigateTo="/note-editor" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 150 },
  title: { fontSize: 20, color: "#fff" },
});
