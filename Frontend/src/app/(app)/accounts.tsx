import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../styles/colors";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
export default function AccountsScreen() {
  const router = useRouter();

  const handleAddAccount = () => {
    router.push("/(app)/create-account");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accounts</Text>
      {/* Your home content here */}

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fab} onPress={handleAddAccount}>
        <Ionicons name="add" size={32} color={colors.black} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: colors.lime,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
