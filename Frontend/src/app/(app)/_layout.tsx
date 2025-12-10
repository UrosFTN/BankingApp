import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";
import { colors } from "../../styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";
export default function AppLayout() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>BankingApp</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.headerButton}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
            <Text style={styles.headerButton}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Body - screens render here */}
      <View style={styles.body}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </View>

      {/* Footer with Tabs */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push("/(app)/home")}
        >
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push("/(app)/accounts")}
        >
          <Text style={styles.tabText}>Accounts</Text>
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
          <Text style={styles.tabText}>Profile</Text>
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
    color: colors.limeText,
  },
  headerButtons: {
    flexDirection: "row",
    gap: 12,
  },
  headerButton: {
    color: colors.limeText,
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
    paddingVertical: 12,
    borderTopColor: colors.black,
    borderTopWidth: 1,
  },
  tabItem: {
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tabText: {
    color: colors.limeText,
    fontSize: 12,
    fontWeight: "600",
  },
});
