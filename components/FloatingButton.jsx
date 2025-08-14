import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { useThemeColors } from "../theme";

export default function FloatingButton({
  icon = "create-outline",
  navigateTo,
}) {
  const router = useRouter();
  const colors = useThemeColors();

  return (
    <Pressable
      onPress={() => navigateTo && router.push(navigateTo)}
      style={[styles.button, { backgroundColor: colors.primary }]}
    >
      <Ionicons name={icon} size={28} color="#fff" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 34,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
});
