import React, { useState, useEffect } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter, useLocalSearchParams } from "expo-router";
import { colors } from "@styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { useAccountStore } from "../../store/accountStore";
import { useTransactionStore } from "../../store/transactionStore";

const NewPaymentScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { selectedAccount, setSelectedAccount } = useAccountStore();
  const { createTransaction } = useTransactionStore();

  useEffect(() => {
    // Reset selected account when entering this screen
    setSelectedAccount(null);
  }, [setSelectedAccount]);

  const [recipientName, setRecipientName] = useState("");
  const [recipientAccount, setRecipientAccount] = useState("ACC");
  const [model, setModel] = useState("");
  const [callNumber, setCallNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("RSD");
  const [paymentCode, setPaymentCode] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Pre-fill form if coming from QR scanner
  useEffect(() => {
    if (params.fromQR === "true") {
      if (params.recipientName) setRecipientName(String(params.recipientName));
      if (params.recipientAccount)
        setRecipientAccount(String(params.recipientAccount));
      if (params.amount) setAmount(String(params.amount));
      if (params.currency) setCurrency(String(params.currency));
      if (params.model) setModel(String(params.model));
      if (params.paymentCode) setPaymentCode(String(params.paymentCode));
      if (params.callNumber) setCallNumber(String(params.callNumber));
      if (params.note) setNote(String(params.note));
    }
  }, [params]);

  const handleSubmit = async () => {
    if (!selectedAccount) {
      Alert.alert("Select account", "Please choose an account to pay from.");
      return;
    }

    if (!recipientName.trim() || !recipientAccount.trim() || !amount.trim()) {
      Alert.alert(
        "Missing fields",
        "Please fill recipient name, account, and amount.",
      );
      return;
    }

    const numericAmount = parseFloat(amount);
    if (Number.isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert(
        "Invalid amount",
        "Please enter a valid amount greater than 0.",
      );
      return;
    }

    setSubmitting(true);
    try {
      await createTransaction({
        sender_account_number: selectedAccount.account_number,
        receiver_account_number: recipientAccount,
        amount: numericAmount,
        currency,
        payment_code: paymentCode || undefined,
        model: model || undefined,
        call_number: callNumber || undefined,
        note: note || undefined,
      });
      Alert.alert("Payment", "Payment created successfully", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create payment";
      Alert.alert("Payment failed", message);
      console.log(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChooseAccount = () => {
    router.push({
      pathname: "/(app)/accounts",
      params: { selectMode: "new-payment" },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>New Payment</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>From account</Text>
        <TouchableOpacity
          style={styles.accountPicker}
          onPress={handleChooseAccount}
        >
          <View>
            <Text style={styles.labelSmall}>Selected account</Text>
            {selectedAccount ? (
              <>
                <Text style={styles.accountName}>
                  {selectedAccount.account_type}
                </Text>
                <Text style={styles.accountNumber}>
                  {selectedAccount.account_number}
                </Text>
                <Text style={styles.accountBalance}>
                  {selectedAccount.balance.toFixed(2)}{" "}
                  {selectedAccount.currency}
                </Text>
              </>
            ) : (
              <Text style={styles.placeholderText}>Choose an account</Text>
            )}
          </View>
          <Ionicons name="chevron-forward" size={22} color={colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recipient</Text>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Recipient name"
          placeholderTextColor={colors.gray}
          value={recipientName}
          onChangeText={setRecipientName}
          autoCapitalize="words"
        />

        <Text style={styles.label}>Account Number / IBAN</Text>
        <TextInput
          style={styles.input}
          placeholder="Recipient account"
          placeholderTextColor={colors.gray}
          autoCorrect={false}
          value={recipientAccount}
          onChangeText={(val) => setRecipientAccount(val)}
        />

        <View style={styles.inlineRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Model</Text>
            <TextInput
              style={styles.input}
              placeholder="00"
              placeholderTextColor={colors.gray}
              value={model}
              onChangeText={setModel}
              keyboardType="number-pad"
              maxLength={4}
            />
          </View>
          <View style={{ width: 12 }} />
          <View style={{ flex: 2 }}>
            <Text style={styles.label}>Call Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Reference"
              placeholderTextColor={colors.gray}
              value={callNumber}
              onChangeText={setCallNumber}
              keyboardType="number-pad"
            />
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Payment details</Text>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          placeholderTextColor={colors.gray}
          keyboardType="decimal-pad"
          value={amount}
          onChangeText={setAmount}
        />

        <View style={styles.inlineRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Currency</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={currency}
                onValueChange={(val) =>
                  setCurrency((val as string).toUpperCase())
                }
                style={styles.picker}
                dropdownIconColor={colors.lime}
              >
                <Picker.Item label="RSD" value="RSD" />
                <Picker.Item label="EUR" value="EUR" />
                <Picker.Item label="USD" value="USD" />
                <Picker.Item label="GBP" value="GBP" />
              </Picker>
            </View>
          </View>
          <View style={{ width: 12 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Payment Code</Text>
            <TextInput
              style={styles.input}
              placeholder="97"
              placeholderTextColor={colors.gray}
              value={paymentCode}
              onChangeText={setPaymentCode}
              keyboardType="number-pad"
              maxLength={4}
            />
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Note</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Add a note"
          placeholderTextColor={colors.gray}
          value={note}
          onChangeText={setNote}
          multiline
        />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.secondary]}
          onPress={() => router.back()}
        >
          <Text style={styles.secondaryText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.primary]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          <Text style={styles.primaryText}>
            {submitting ? "Submitting..." : "Submit Payment"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NewPaymentScreen;

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
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.gray,
    marginBottom: 24,
  },
  cardTitle: {
    color: colors.lime,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },
  label: {
    color: colors.white,
    fontSize: 14,
    marginTop: 12,
    marginBottom: 6,
    opacity: 0.8,
  },
  labelSmall: {
    color: colors.white,
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.background,
    color: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  inlineRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 8,
  },
  accountPicker: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  accountName: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  accountNumber: {
    color: colors.white,
    opacity: 0.8,
    marginTop: 4,
  },
  accountBalance: {
    color: colors.lime,
    fontWeight: "700",
    marginTop: 8,
  },
  placeholderText: {
    color: colors.gray,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    backgroundColor: colors.background,
    overflow: "hidden",
    justifyContent: "center",
    height: 44,
  },
  picker: {
    color: colors.white,
    width: "100%",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 30,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  secondary: {
    borderWidth: 1,
    borderColor: colors.gray,
    backgroundColor: colors.background,
  },
  primary: {
    backgroundColor: colors.lime,
  },
  secondaryText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  primaryText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "700",
  },
});
