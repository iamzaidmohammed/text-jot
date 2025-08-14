import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  SectionList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useThemeColors } from "../theme";

export default function SettingsScreen() {
  const colors = useThemeColors();

  // State for toggles and selections
  const [theme, setTheme] = useState("system");
  const [fontSize, setFontSize] = useState("medium");
  const [sortOrder, setSortOrder] = useState("dateEdited");
  const [previewLines, setPreviewLines] = useState(2);
  const [groupByFolder, setGroupByFolder] = useState(true);

  const handleExport = () => Alert.alert("Export", "Exporting notes...");
  const handleImport = () => Alert.alert("Import", "Importing notes...");
  const handleClear = () =>
    Alert.alert("Clear All Notes", "This action cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        style: "destructive",
        onPress: () => console.log("Cleared"),
      },
    ]);

  const sections = [
    {
      title: "Appearance",
      data: [
        {
          label: `Theme: ${theme}`,
          onPress: () => console.log("Change theme"),
        },
        {
          label: `Font Size: ${fontSize}`,
          onPress: () => console.log("Change font size"),
        },
      ],
    },
    {
      title: "Notes Organization",
      data: [
        {
          label: `Sort Notes By: ${sortOrder}`,
          onPress: () => console.log("Change sort"),
        },
        {
          label: `Note Preview Lines: ${previewLines}`,
          onPress: () => console.log("Change preview lines"),
        },
        {
          label: "Group Notes by Folder",
          type: "switch",
          value: groupByFolder,
          onValueChange: setGroupByFolder,
        },
      ],
    },
    {
      title: "Data & Backup",
      data: [
        { label: "Export Notes", onPress: handleExport },
        { label: "Import Notes", onPress: handleImport },
        { label: "Clear All Notes", onPress: handleClear, danger: true },
      ],
    },
    {
      title: "About",
      data: [
        { label: "App Version: 1.0.0" },
        { label: "About TextJot", onPress: () => console.log("Show about") },
        {
          label: "Visit Project Page",
          onPress: () => console.log("Open link"),
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
