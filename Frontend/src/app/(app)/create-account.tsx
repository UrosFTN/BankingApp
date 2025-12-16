import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { colors } from "@styles/colors";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { useAccountStore } from "../../store/accountStore";
import { AccountType } from "../../services/api/account.api";

const CreateAccountScreen = () => {
  const router = useRouter();
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountType, setAccountType] = useState("checking");
  const [currency, setCurrency] = useState("USD");
  const [isLoading, setIsLoading] = useState(false);

  const { createAccount } = useAccountStore();

  const accountTypes = [
    { label: "Checking", value: "checking" },
    { label: "Savings", value: "savings" },
    { label: "Credit", value: "credit" },
  ];

  const currencies = [
    { label: "USD", value: "USD" },
    { label: "EUR", value: "EUR" },
    { label: "GBP", value: "GBP" },
    { label: "RSD", value: "RSD" },
  ];

  const handleCreateAccount = async () => {
    // Validate inputs
    if (!accountHolderName.trim()) {
      Alert.alert("Error", "Please enter account holder name");
      return;
    }

    setIsLoading(true);

    try {
      await createAccount({
        account_holder_name: accountHolderName,
        account_type: accountType as AccountType,
        currency,
      });

      Alert.alert("Success", "Account created successfully!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create New Account</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Account Holder Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter full name"
          placeholderTextColor={colors.gray}
          value={accountHolderName}
          onChangeText={setAccountHolderName}
        />

        <Text style={styles.label}>Account Type</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={accountType}
            onValueChange={(value) => setAccountType(value)}
            style={styles.picker}
            dropdownIconColor={colors.lime}
          >
            {accountTypes.map((type) => (
              <Picker.Item
                key={type.value}
                label={type.label}
                value={type.value}
              />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Currency</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={currency}
            onValueChange={(value) => setCurrency(value)}
            style={styles.picker}
            dropdownIconColor={colors.lime}
          >
            {currencies.map((curr) => (
              <Picker.Item
                key={curr.value}
                label={curr.label}
                value={curr.value}
              />
            ))}
          </Picker>
        </View>

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleCreateAccount}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Creating..." : "Create Account"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateAccountScreen;

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
  form: {
    gap: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    padding: 12,
    borderRadius: 5,
    color: colors.white,
    backgroundColor: colors.foreground,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 5,
    backgroundColor: colors.foreground,
    overflow: "hidden",
  },
  picker: {
    color: colors.white,
  },
  button: {
    backgroundColor: colors.primaryButton,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.lime,
  },
  cancelButtonText: {
    color: colors.lime,
    fontSize: 16,
    fontWeight: "600",
  },
});
