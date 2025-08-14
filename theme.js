import { useColorScheme } from "react-native";

const lightColors = {
  background: "#FFFFFF",
  bg: "#FFFFFF",
  text: "#000000",
  primary: "#007AFF", // iOS blue
};

const darkColors = {
  background: "#000000",
  bg: "#1f1f1f",
  text: "#FFFFFF",
  primary: "#0A84FF", // iOS dark blue
};

export function useThemeColors() {
  const scheme = useColorScheme(); // 'light' or 'dark'
  return scheme === "dark" ? darkColors : lightColors;
}
