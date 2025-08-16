import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import FloatingButton from "../components/FloatingButton";
import FolderItem from "../components/FolderItems";
import SearchBar from "../components/SearchBar";
import { useThemeColors } from "../theme";

export default function FoldersScreen() {
  const colors = useThemeColors();
  // const navigation = useNavigation();
  const router = useRouter();

  const folders = [
    { id: "1", name: "College", count: 5 },
    { id: "2", name: "Personal", count: 3 },
  ];

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <Pressable
  //         style={{
  //           marginRight: 20,
  //           marginTop: 15,
  //         }}
  //         onPress={() => router.push("/settings")}
  //       >
  //         <Ionicons name="settings-outline" size={28} color="#fff" />
  //       </Pressable>
  //     ),
  //   });
  // }, [navigation, router]);

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable
              style={{
                marginRight: 20,
                marginTop: 15,
              }}
              onPress={() => router.push("/settings")}
            >
              <Ionicons name="settings-outline" size={28} color="#fff" />
            </Pressable>
          ),
        }}
      />
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
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 150 },
});
