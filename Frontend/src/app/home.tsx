import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "../store/authStore";

import { colors } from "../styles/colors";

const Home = () => {
  const router = useRouter();

  const { fingerprintLogin } = useAuthStore();

  async function handleLoginPress() {
    const success = await fingerprintLogin();
    if (success) {
      router.replace("/accounts");
    } else {
      router.push("/login");
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/splash-icon.png")}
        style={styles.hero}
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>
        Manage your accounts, payments, and notifications in one place.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLoginPress}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => router.push("/register")}
        accessibilityRole="button"
      >
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    paddingHorizontal: 24,
  },
  title: {
    color: colors.white,
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    color: colors.gray,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  button: {
    backgroundColor: colors.primaryButton,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 6,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.lime,
  },
  buttonText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButtonText: {
    color: colors.lime,
  },
  hero: {
    width: 200,
    height: 160,
    marginBottom: 20,
  },
});
