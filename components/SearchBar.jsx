import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";
import { useThemeColors } from "../theme";

export default function SearchBar({ value, onChangeText, placeholder }) {
  const colors = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Ionicons
        name="search-outline"
        size={20}
        color="#888"
        style={styles.icon}
      />
      <TextInput
        style={[styles.input, { color: colors.text }]}
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderColor: "#888",
    marginVertical: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});
