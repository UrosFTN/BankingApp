import { StyleSheet, Text, View } from "react-native";
import { colors } from "@styles/colors";
import React from "react";

const PaymentsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payments Screen</Text>
    </View>
  );
};

export default PaymentsScreen;

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
});
