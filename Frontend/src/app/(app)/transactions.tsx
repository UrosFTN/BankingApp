import { StyleSheet, Text, View } from "react-native";
import { colors } from "@styles/colors";
import React from "react";

const TransactionsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions Screen</Text>
    </View>
  );
};

export default TransactionsScreen;

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
