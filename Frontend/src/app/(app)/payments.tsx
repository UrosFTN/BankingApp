import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { colors } from "@styles/colors";
import React from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const PaymentsScreen = () => {
  const router = useRouter();

  const handleNewPayment = () => {
    console.log("New Payment pressed");
    router.push("/(app)/new-payment");
  };

  const handleScanQR = () => {
    console.log("Scan QR pressed");
    router.push("/(app)/qr-scanner");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Payments</Text>

      <TouchableOpacity style={styles.card} onPress={handleNewPayment}>
        <View style={styles.cardContent}>
          <View style={styles.textContent}>
            <Text style={styles.cardTitle}>New Payment</Text>
            <Text style={styles.cardDescription}>
              Send money to another account
            </Text>
          </View>
          <Ionicons name="arrow-forward-circle" size={40} color={colors.lime} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={handleScanQR}>
        <View style={styles.cardContent}>
          <View style={styles.textContent}>
            <Text style={styles.cardTitle}>Scan QR Code and Pay</Text>
            <Text style={styles.cardDescription}>
              Scan a QR code to make a payment
            </Text>
          </View>
          <Ionicons name="qr-code-outline" size={40} color={colors.lime} />
        </View>
      </TouchableOpacity>
    </ScrollView>
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
    marginBottom: 24,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContent: {
    flex: 1,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.white,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.7,
  },
});
