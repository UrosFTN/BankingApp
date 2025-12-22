import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { colors } from "@styles/colors";
import React from "react";
import { useAuthStore } from "../../store/authStore";
import { useRouter } from "expo-router";

const ProfileScreen = () => {
  const { user } = useAuthStore();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user?.email || "Unknown"}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(app)/change-password")}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

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
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.gray,
    marginTop: 16,
    marginBottom: 20,
  },
  label: {
    color: colors.gray,
    fontSize: 14,
    marginBottom: 6,
  },
  value: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  button: {
    backgroundColor: colors.primaryButton,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "bold",
  },
});
