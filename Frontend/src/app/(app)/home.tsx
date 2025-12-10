import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      {/* Your home content here */}
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
    color: colors.whiteText,
  },
});
