import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { colors } from "../../styles/colors";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../store/authSlice";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [localError, setLocalError] = useState("");

  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();

  async function handleForgotPassword() {
    return;
  }

  async function handleLogin() {
    setLocalError("");
    if (!email || !password) {
      setLocalError("Email and password are required");
      return;
    }

    try {
      await login(email, password);
      router.replace("/home");
    } catch (err) {
      setLocalError(error || "Login failed. Please try again.");
    }
  }

  async function handleCreateAccount() {
    router.push("/register");
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/splash-icon.png")}
        style={styles.hero}
        resizeMode="contain"
      />
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={handleForgotPassword} accessibilityRole="link">
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.whiteText,
    outlineColor: colors.limeText,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: colors.whiteText,

    backgroundColor: colors.foreground,
    width: "80%",
  },
  message: { marginTop: 10, fontSize: 16 },
  button: {
    backgroundColor: colors.primaryButton,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPassword: {
    color: colors.limeText,
    textDecorationLine: "underline",
    marginBottom: 12,
  },
  hero: {
    width: 180,
    height: 140,
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
