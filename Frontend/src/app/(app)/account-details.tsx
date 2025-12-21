import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { colors } from "@styles/colors";
import { useAccountStore } from "../../store/accountStore";
import { useAuthStore } from "../../store/authStore";
import { useTransactionStore } from "../../store/transactionStore";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const AccountDetailsScreen = () => {
  const router = useRouter();
  const { selectedAccount } = useAccountStore();
  const { user } = useAuthStore();
  const { deposit, withdraw, isLoading, error, clearError } =
    useTransactionStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [transactionType, setTransactionType] = useState<
    "deposit" | "withdraw"
  >("deposit");
  const [amount, setAmount] = useState("");

  if (!selectedAccount) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No account selected</Text>
      </View>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const capitalize = (str: string) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : str;

  const handleOpenModal = (type: "deposit" | "withdraw") => {
    setTransactionType(type);
    setAmount("");
    clearError();
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setAmount("");
    clearError();
  };

  const handleConfirm = async () => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid positive amount");
      return;
    }

    try {
      const payload = {
        account_number: selectedAccount.account_number,
        amount: parseFloat(amount),
        currency: selectedAccount.currency,
        note: `${capitalize(transactionType)} via mobile app`,
      };

      if (transactionType === "deposit") {
        await deposit(payload);
      } else {
        await withdraw(payload);
      }

      Alert.alert(
        "Success",
        `${capitalize(transactionType)} of ${
          selectedAccount.currency
        } ${amount} completed successfully`,
      );
      handleCloseModal();
    } catch (err: any) {
      Alert.alert(
        "Transaction Failed",
        error || "An error occurred during the transaction",
      );
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Account Details</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Account Type</Text>
            <Text style={styles.value}>
              {capitalize(selectedAccount.account_type)}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Status</Text>
            <Text style={[styles.value, styles.statusBadge]}>
              {capitalize(selectedAccount.status)}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Account Number</Text>
            <Text style={styles.value}>{selectedAccount.account_number}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>IBAN</Text>
            <Text style={styles.value}>{selectedAccount.iban}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Account Holder</Text>
            <Text style={styles.value}>
              {selectedAccount.account_holder_name}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Balance</Text>
          <Text style={styles.balanceAmount}>
            {selectedAccount.balance.toFixed(2)} {selectedAccount.currency}
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleOpenModal("withdraw")}
            >
              <Ionicons
                name="arrow-down-circle"
                size={20}
                color={colors.white}
              />
              <Text style={styles.buttonText}>Withdraw</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleOpenModal("deposit")}
            >
              <Ionicons name="arrow-up-circle" size={20} color={colors.white} />
              <Text style={styles.buttonText}>Deposit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dates</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Created</Text>
            <Text style={styles.value}>
              {formatDate(selectedAccount.created_at)}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Last Updated</Text>
            <Text style={styles.value}>
              {formatDate(selectedAccount.updated_at)}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>IDs</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Account ID</Text>
            <Text style={[styles.value, styles.monospace]}>
              {selectedAccount.id}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>User ID</Text>
            <Text style={[styles.value, styles.monospace]}>
              {selectedAccount.user_id}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Transaction Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{capitalize(transactionType)}</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              placeholderTextColor={colors.gray}
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={setAmount}
              editable={!isLoading}
            />

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={handleCloseModal}
                disabled={isLoading}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modalButton,
                  styles.confirmButton,
                  isLoading && styles.confirmButtonDisabled,
                ]}
                onPress={handleConfirm}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color={colors.background} size="small" />
                ) : (
                  <Text style={styles.confirmButtonText}>
                    {capitalize(transactionType)}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default AccountDetailsScreen;

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
  errorText: {
    color: colors.white,
    fontSize: 16,
    textAlign: "center",
    marginTop: 50,
  },
  section: {
    marginBottom: 24,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.lime,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  label: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.7,
  },
  value: {
    fontSize: 14,
    color: colors.white,
    fontWeight: "500",
    maxWidth: "60%",
    textAlign: "right",
  },
  statusBadge: {
    color: colors.lime,
    fontWeight: "700",
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.lime,
    textAlign: "center",
    paddingVertical: 16,
  },
  monospace: {
    fontFamily: "monospace",
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
    gap: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.black,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 24,
    width: "85%",
    borderWidth: 1,
    borderColor: colors.gray,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.lime,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.white,
    borderWidth: 1,
    borderColor: colors.gray,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  confirmButton: {
    backgroundColor: colors.lime,
  },
  confirmButtonDisabled: {
    opacity: 0.6,
  },
  cancelButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  confirmButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "600",
  },
});
