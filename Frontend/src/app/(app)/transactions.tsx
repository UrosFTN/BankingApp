import React, { useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { colors } from "@styles/colors";
import { useAuthStore } from "../../store/authStore";
import { useTransactionStore } from "../../store/transactionStore";
import { Transaction } from "../../services/api/transaction.api";
import { Ionicons } from "@expo/vector-icons";

const TransactionsScreen = () => {
  const { user } = useAuthStore();
  const { transactions, isLoading, error, loadTransactions, clearError } =
    useTransactionStore();

  useEffect(() => {
    if (user?.id) {
      loadTransactions(user.id).catch(() => {});
    }
  }, [user?.id]);

  const onRefresh = useCallback(() => {
    if (user?.id) {
      clearError();
      loadTransactions(user.id).catch(() => {});
    }
  }, [user?.id, loadTransactions, clearError]);

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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return colors.lime;
      case "pending":
        return "#FFA500";
      case "declined":
        return colors.red;
      default:
        return colors.gray;
    }
  };

  const renderTransaction = (txn: Transaction) => {
    const noteLower = (txn.note || "").toLowerCase();
    const isDeposit = noteLower.startsWith("deposit");
    const isWithdraw = noteLower.startsWith("withdraw");

    // For deposits and withdrawals, override direction/sign by note
    const isSender = !isDeposit && txn.sender_id === user?.id;
    const isReceiver = !isWithdraw && txn.receiver_id === user?.id;
    const amount = parseFloat(txn.amount.toString());

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
      ? colors.red
      : isSender
      ? colors.red
      : colors.lime;

    const sign = isDeposit ? "+" : isWithdraw ? "-" : isSender ? "-" : "+";
    const amountColor = isDeposit
      ? colors.lime
      : isWithdraw
      ? colors.red
      : isSender
      ? colors.red
      : colors.lime;

    const partyLabel = isDeposit
      ? "To"
      : isWithdraw
      ? "From"
      : isSender
      ? "To"
      : "From";
    const partyAccount = isDeposit
      ? txn.receiver_account_number
      : isWithdraw
      ? txn.sender_account_number
      : isSender
      ? txn.receiver_account_number
      : txn.sender_account_number;

    return (
      <View key={txn.id} style={styles.card}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name={arrowName} size={20} color={arrowColor} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.transactionType}>{typeText}</Text>
            <Text style={styles.date}>{formatDate(txn.created_at)}</Text>
          </View>
          <Text style={[styles.status, { color: getStatusColor(txn.status) }]}>
            {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
          </Text>
        </View>

        <View style={styles.details}>
          <View style={styles.row}>
            <Text style={styles.label}>{partyLabel}:</Text>
            <Text style={styles.value}>{partyAccount}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Amount:</Text>
            <Text style={[styles.amount, { color: amountColor }]}>
              {sign}
              {amount.toFixed(2)} {txn.currency}
            </Text>
          </View>

          {txn.note ? (
            <View style={styles.row}>
              <Text style={styles.label}>Note:</Text>
              <Text style={styles.note}>{txn.note}</Text>
            </View>
          ) : null}

          {txn.payment_code ? (
            <View style={styles.row}>
              <Text style={styles.label}>Payment Code:</Text>
              <Text style={styles.value}>{txn.payment_code}</Text>
            </View>
          ) : null}

          {txn.model && txn.call_number ? (
            <View style={styles.row}>
              <Text style={styles.label}>Reference:</Text>
              <Text style={styles.value}>
                {txn.model}-{txn.call_number}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    );
  };

  if (isLoading && transactions.length === 0) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator color={colors.lime} size="large" />
        <Text style={styles.loadingText}>Loading transactions…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      <ScrollView
        style={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
            tintColor={colors.lime}
          />
        }
      >
        {transactions.length > 0 ? (
          transactions.map(renderTransaction)
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={64} color={colors.gray} />
            <Text style={styles.emptyText}>No transactions yet</Text>
            <Text style={styles.emptySub}>
              Your transaction history will appear here
            </Text>
          </View>
        )}
      </ScrollView>
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
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 16,
  },
  list: {
    flex: 1,
  },
  loadingText: {
    marginTop: 12,
    color: colors.white,
    opacity: 0.9,
  },
  errorContainer: {
    backgroundColor: colors.red,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  errorText: {
    color: colors.white,
    fontWeight: "600",
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.foreground,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  transactionType: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  date: {
    color: colors.gray,
    fontSize: 12,
    marginTop: 2,
  },
  status: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  details: {
    gap: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },
  label: {
    color: colors.gray,
    fontSize: 14,
  },
  value: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "500",
    maxWidth: "65%",
    textAlign: "right",
  },
  amount: {
    fontSize: 18,
    fontWeight: "700",
  },
  note: {
    color: colors.white,
    fontSize: 14,
    fontStyle: "italic",
    maxWidth: "65%",
    textAlign: "right",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
  },
  emptySub: {
    color: colors.gray,
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
});
