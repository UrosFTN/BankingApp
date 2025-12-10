// src/app/screens/auth/RegistrationScreen.tsx
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

export default function RegistrationScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [localError, setLocalError] = useState("");

  const router = useRouter();
  const { register, isLoading, error } = useAuthStore();

  const handleRegister = async () => {
    setLocalError("");

    if (!email || !password || !confirm) {
      setLocalError("All fields are required");
      return;
    }

    if (password !== confirm) {
      setLocalError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setLocalError("Password must be at least 8 characters");
      return;
    }

    try {
      await register(email, password);
      router.replace("/login");
    } catch (err) {
      setLocalError(error || "Registration failed");
    }
  };

  const displayError = localError || error;

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/splash-icon.png")}
        style={styles.hero}
        resizeMode="contain"
      />
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        editable={!isLoading}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        editable={!isLoading}
      />
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        style={styles.input}
        value={confirm}
        onChangeText={setConfirm}
        editable={!isLoading}
      />

      {displayError ? (
        <Text style={styles.errorText}>{displayError}</Text>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.button}>Back to Login</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.whiteText,
  },
  input: {
    width: "80%",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: colors.whiteText,
    backgroundColor: colors.foreground,
  },
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
  hero: {
    width: 180,
    height: 140,
    marginBottom: 16,
  },
  errorText: {
    color: "#ff6b6b",
    marginBottom: 12,
    textAlign: "center",
  },
});
