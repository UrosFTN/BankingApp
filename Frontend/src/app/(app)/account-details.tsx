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
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
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
  const {
    deposit,
    withdraw,
    isLoading,
    error,
    clearError,
    loadTransactionsByAccount,
    transactions,
  } = useTransactionStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [transactionType, setTransactionType] = useState<"deposit" | "withdraw">("deposit");
  const [amount, setAmount] = useState("");
  const [loadingTransactions, setLoadingTransactions] = useState(false);

  // Load transactions for this account on mount or when account changes
  useEffect(() => {
    if (selectedAccount) {
      setLoadingTransactions(true);
      loadTransactionsByAccount(selectedAccount.account_number)
        .then(() => setLoadingTransactions(false))
        .catch(() => setLoadingTransactions(false));
    }
  }, [selectedAccount?.account_number]);

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

  const capitalize = (str: string) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : str);

  const renderTransactionItem = ({ item }: { item: any }) => {
    const noteLower = (item.note || "").toLowerCase();
    const isDeposit = noteLower.startsWith("deposit");
    const isWithdraw = noteLower.startsWith("withdraw");

    // For deposits and withdrawals, override direction/sign by note
    const isSender = !isDeposit && item.sender_account_number === selectedAccount.account_number;
    const isReceiver =
      !isWithdraw && item.receiver_account_number === selectedAccount.account_number;
    const amount = parseFloat(item.amount.toString());

    const typeText = isDeposit
      ? "Deposit"
      : isWithdraw
      ? "Withdraw"
      : isSender
      ? "Sent"
      : "Received";

    const arrowName = isDeposit
      ? "arrow-down"
      : isWithdraw
      ? "arrow-up"
      : isSender
      ? "arrow-up"
      : "arrow-down";

    const arrowColor = isDeposit
      ? colors.lime
      : isWithdraw
      ? "#FF6B6B"
      : isSender
      ? "#FF6B6B"
      : colors.lime;

    const sign = isDeposit ? "+" : isWithdraw ? "-" : isSender ? "-" : "+";
    const amountColor = isDeposit
      ? colors.lime
      : isWithdraw
      ? "#FF6B6B"
      : isSender
      ? "#FF6B6B"
      : colors.lime;

    const partyLabel = isDeposit ? "To" : isWithdraw ? "From" : isSender ? "To" : "From";
    const partyAccount = isDeposit
      ? item.receiver_account_number
      : isWithdraw
      ? item.sender_account_number
      : isSender
      ? item.receiver_account_number
      : item.sender_account_number;

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    return (
      <View style={styles.transactionCard}>
        <View style={styles.transactionHeader}>
          <View style={styles.transactionIconContainer}>
            <Ionicons name={arrowName} size={18} color={arrowColor} />
          </View>
          <View style={styles.transactionHeaderText}>
            <Text style={styles.transactionTypeText}>{typeText}</Text>
            <Text style={styles.transactionDateText}>{formatDate(item.created_at)}</Text>
          </View>
          <Text style={[styles.transactionStatusText, { color: getStatusColor(item.status) }]}>
            {capitalize(item.status)}
          </Text>
        </View>

        <View style={styles.transactionDetails}>
          <View style={styles.transactionRow}>
            <Text style={styles.transactionLabel}>{partyLabel}:</Text>
            <Text style={styles.transactionValue}>{partyAccount}</Text>
          </View>

          <View style={styles.transactionRow}>
            <Text style={styles.transactionLabel}>Amount:</Text>
            <Text style={[styles.transactionAmountValue, { color: amountColor }]}>
              {sign}
              {amount.toFixed(2)} {item.currency}
            </Text>
          </View>

          {item.note ? (
            <View style={styles.transactionRow}>
              <Text style={styles.transactionLabel}>Note:</Text>
              <Text style={styles.transactionNoteValue}>{item.note}</Text>
            </View>
          ) : null}

          {item.payment_code ? (
            <View style={styles.transactionRow}>
              <Text style={styles.transactionLabel}>Payment Code:</Text>
              <Text style={styles.transactionValue}>{item.payment_code}</Text>
            </View>
          ) : null}

          {item.model && item.call_number ? (
            <View style={styles.transactionRow}>
              <Text style={styles.transactionLabel}>Reference:</Text>
              <Text style={styles.transactionValue}>
                {item.model}-{item.call_number}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return colors.lime;
      case "pending":
        return "#FFC107";
      case "declined":
        return "#FF6B6B";
      default:
        return colors.gray;
    }
  };

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
      Alert.alert("Transaction Failed", error || "An error occurred during the transaction");
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
            <Text style={styles.value}>{capitalize(selectedAccount.account_type)}</Text>
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
            <Text style={styles.value}>{selectedAccount.account_holder_name}</Text>
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
              <Ionicons name="arrow-down-circle" size={20} color={colors.white} />
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
            <Text style={styles.value}>{formatDate(selectedAccount.created_at)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Last Updated</Text>
            <Text style={styles.value}>{formatDate(selectedAccount.updated_at)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>

          {loadingTransactions ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color={colors.lime} size="large" />
              <Text style={styles.loadingText}>Loading transactions...</Text>
            </View>
          ) : transactions.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="swap-horizontal" size={40} color={colors.gray} />
              <Text style={styles.emptyText}>No transactions yet</Text>
            </View>
          ) : (
            <FlatList
              data={transactions.slice(0, 5)}
              renderItem={renderTransactionItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          )}

          {transactions.length > 5 && (
            <TouchableOpacity
              style={styles.viewAllButton}
              onPress={() => router.push("/(app)/transactions")}
            >
              <Text style={styles.viewAllText}>View All Transactions</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.lime} />
            </TouchableOpacity>
          )}
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
                  <Text style={styles.confirmButtonText}>{capitalize(transactionType)}</Text>
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
  transactionCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  transactionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  transactionIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.foreground,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  transactionHeaderText: {
    flex: 1,
  },
  transactionTypeText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  transactionDateText: {
    color: colors.gray,
    fontSize: 12,
    marginTop: 2,
  },
  transactionStatusText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  transactionDetails: {
    gap: 8,
  },
  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },
  transactionLabel: {
    color: colors.gray,
    fontSize: 14,
  },
  transactionValue: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "500",
    maxWidth: "65%",
    textAlign: "right",
  },
  transactionAmountValue: {
    fontSize: 18,
    fontWeight: "700",
  },
  transactionNoteValue: {
    color: colors.white,
    fontSize: 14,
    fontStyle: "italic",
    maxWidth: "65%",
    textAlign: "right",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  loadingText: {
    color: colors.gray,
    marginTop: 12,
    fontSize: 14,
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    color: colors.gray,
    marginTop: 12,
    fontSize: 14,
  },
  viewAllButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: `${colors.gray}33`,
    marginTop: 12,
    gap: 6,
  },
  viewAllText: {
    color: colors.lime,
    fontSize: 14,
    fontWeight: "600",
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.gray}33`,
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sentIcon: {
    backgroundColor: "#FF6B6B",
  },
  receivedIcon: {
    backgroundColor: colors.lime,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionType: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
  transactionAccount: {
    color: colors.gray,
    fontSize: 12,
    marginTop: 2,
  },
  transactionDate: {
    color: colors.gray,
    fontSize: 11,
    marginTop: 2,
    opacity: 0.7,
  },
  transactionRight: {
    alignItems: "flex-end",
    gap: 4,
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: "700",
  },
  sentAmount: {
    color: "#FF6B6B",
  },
  receivedAmount: {
    color: colors.lime,
  },
  transactionStatus: {
    fontSize: 11,
    fontWeight: "600",
  },
});
