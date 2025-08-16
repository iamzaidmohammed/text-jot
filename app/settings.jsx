import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActionSheetIOS,
  Alert,
  Platform,
  SectionList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { clearFolders } from "../database/queries";
import { useThemeColors } from "../theme";

export default function SettingsScreen() {
  const colors = useThemeColors();

  // State for toggles and selections
  const { theme, setTheme } = useTheme();
  const [fontSize, setFontSize] = useState("medium");
  const [sortOrder, setSortOrder] = useState("dateEdited");

  // --- Handlers ---
  const handleExport = () => Alert.alert("Export", "Exporting notes...");
  const handleImport = () => Alert.alert("Import", "Importing notes...");

  const handleClearFolders = () =>
    Alert.alert(
      "Clear All Folders",
      "This will delete all folders and notes. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            await clearFolders();
            console.log("All folders and notes cleared");
          },
        },
      ]
    );

  const openPicker = (title, options, selected, onSelect) => {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [...options, "Cancel"],
          cancelButtonIndex: options.length,
          title,
        },
        (index) => {
          if (index < options.length) {
            onSelect(options[index]);
          }
        }
      );
    } else {
      // Simple fallback for Android
      Alert.alert(
        title,
        null,
        options.map((opt) => ({
          text: opt,
          onPress: () => onSelect(opt),
        }))
      );
    }
  };

  const sections = [
    {
      title: "Appearance",
      data: [
        {
          label: `Theme: ${theme}`,
          onPress: () =>
            openPicker(
              "Select Theme",
              ["system", "light", "dark"],
              theme,
              setTheme
            ),
        },
        {
          label: `Font Size: ${fontSize}`,
          onPress: () =>
            openPicker(
              "Select Font Size",
              ["small", "medium", "large"],
              fontSize,
              setFontSize
            ),
        },
      ],
    },
    {
      title: "Notes Organization",
      data: [
        {
          label: `Sort Notes By: ${sortOrder}`,
          onPress: () =>
            openPicker(
              "Sort Notes By",
              ["dateEdited", "dateCreated", "title"],
              sortOrder,
              setSortOrder
            ),
        },
      ],
    },
    {
      title: "Data & Backup",
      data: [
        { label: "Export Notes", onPress: handleExport },
        { label: "Import Notes", onPress: handleImport },
        { label: "Clear All Notes", onPress: handleClearFolders, danger: true },
      ],
    },
    {
      title: "About",
      data: [
        { label: "App Version: 1.0.0" },
        {
          label: "About TextJot",
          onPress: () => Alert.alert("About", "TextJot – a simple notes app."),
        },
        {
          label: "Visit Project Page",
          onPress: () =>
            Alert.alert("Open Link", "Would open GitHub/project page"),
        },
      ],
    },
  ];

  const renderItem = ({ item }) => {
    if (item.type === "switch") {
      return (
        <View style={[styles.item, { backgroundColor: colors.bg }]}>
          <Text style={[styles.text, { color: colors.text }]}>
            {item.label}
          </Text>
          <Switch value={item.value} onValueChange={item.onValueChange} />
        </View>
      );
    }

    return (
      <TouchableOpacity
        onPress={item.onPress}
        disabled={!item.onPress}
        style={[styles.item, { backgroundColor: colors.bg }]}
      >
        <Text
          style={[
            styles.text,
            {
              color: item.danger ? "red" : colors.text,
              fontWeight: item.danger ? "600" : "400",
            },
          ]}
        >
          {item.label}
        </Text>
        {item.onPress && (
          <Ionicons name="chevron-forward" size={18} color="#888" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => item.label + index}
      renderItem={renderItem}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={[styles.sectionHeader, { color: "#888" }]}>{title}</Text>
      )}
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: colors.background }}
    />
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 5,
    fontSize: 13,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  text: {
    fontSize: 16,
  },
});
