import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";
import { colors } from "../../styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../../store/authStore";
import { Ionicons } from "@expo/vector-icons";

export default function AppLayout() {
  const [localError, setLocalError] = useState("");

  const router = useRouter();
  const { logout, error } = useAuthStore();

  async function handleLogout() {
    try {
      await logout();
      router.push("/(auth)/login");
    } catch (err) {
      setLocalError(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>BankingApp</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="settings-outline" size={24} color={colors.lime} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.headerButton}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Body - screens render here */}
      <View style={styles.body}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "none",
          }}
        />
      </View>

      {/* Footer with Tabs */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push("/(app)/accounts")}
        >
          <Text style={styles.tabText}>Accounts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push("/(app)/payments")}
        >
          <Text style={styles.tabText}>Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push("/(app)/transactions")}
        >
          <Text style={styles.tabText}>Transactions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push("/(app)/profile")}
        >
          <Ionicons
            name="person-circle-outline"
            size={32}
            color={colors.lime}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.background,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.lime,
  },
  headerButtons: {
    flexDirection: "row",
    gap: 12,
  },
  headerButton: {
    color: colors.lime,
    fontSize: 14,
    paddingHorizontal: 8,
  },
  body: {
    flex: 1,
  },
  footer: {
    backgroundColor: colors.foreground,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 6,
    borderTopColor: colors.gray,
    borderTopWidth: 1,
  },
  tabItem: {
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tabText: {
    color: colors.lime,
    fontSize: 14,
    fontWeight: "600",
  },
});
