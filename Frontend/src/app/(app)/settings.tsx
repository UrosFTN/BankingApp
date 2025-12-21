import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "@styles/colors";
import * as SecureStore from "expo-secure-store";
import { useAuthStore } from "../../store/authStore";

const SettingsScreen = () => {
  const [enabled, setEnabled] = useState(false);
  const { enableFingerprint, disableFingerprint } = useAuthStore();

  useEffect(() => {
    (async () => {
      const flag = await SecureStore.getItemAsync("fingerprintEnabled");
      setEnabled(flag === "true");
    })();
  }, []);

  async function toggleFingerprint() {
    if (!enabled) {
      const ok = await enableFingerprint();
      setEnabled(ok);
    } else {
      await disableFingerprint();
      setEnabled(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <TouchableOpacity style={styles.button} onPress={toggleFingerprint}>
        <Text>
          {enabled ? "Disable Fingerprint Login" : "Enable Fingerprint Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.lime,
  },
  button: {
    backgroundColor: colors.primaryButton,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 30,
  },
});
