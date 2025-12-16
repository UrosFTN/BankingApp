import React, { useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { colors } from "../../styles/colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAccountStore } from "../../store/accountStore";
import { Account } from "../../services/api/account.api";
export default function AccountsScreen() {
  const router = useRouter();
  const { selectMode } = useLocalSearchParams<{ selectMode?: string }>();

  const {
    accounts,
    isLoading,
    error,
    loadAccounts,
    setSelectedAccount,
    clearError,
  } = useAccountStore();

  useEffect(() => {
    loadAccounts().catch(() => {});
  }, []);
  const handleAddAccount = () => {
    router.push("/(app)/create-account");
  };

  const handleAccountPress = (account: Account) => {
    setSelectedAccount(account);
    if (selectMode === "new-payment") {
      router.back();
      return;
    }
    router.navigate("/(app)/account-details");
  };
  const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
  const onRefresh = useCallback(() => {
    clearError();
    loadAccounts().catch(() => {});
  }, [loadAccounts, clearError]);

  if (isLoading && accounts.length === 0) {
    return (
      <View style={[styles.container]}>
        <ActivityIndicator color={colors.lime} size="large" />
        <Text style={styles.loadingText}>Loading accounts…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accounts</Text>
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
        {accounts.map((account) => (
          <TouchableOpacity
            key={account.id}
            style={styles.card}
            onPress={() => handleAccountPress(account)}
          >
            <View style={styles.row}>
              <Text style={styles.accountType}>
                {cap(account.account_type)}
              </Text>
              <Text style={styles.status}>{cap(account.status)}</Text>
            </View>
            <Text style={styles.number}>{account.account_number}</Text>
            <Text style={styles.balance}>
              {account.balance.toFixed(2)} {account.currency}
            </Text>
          </TouchableOpacity>
        ))}

        {!isLoading && accounts.length === 0 ? (
          <View style={[{ paddingVertical: 24 }]}>
            <Text style={styles.emptyText}>No accounts yet.</Text>
            <Text style={styles.emptySub}>Create your first account.</Text>
          </View>
        ) : null}
      </ScrollView>
      <TouchableOpacity style={styles.fab} onPress={handleAddAccount}>
        <Ionicons name="add" size={32} color={colors.black} />
      </TouchableOpacity>
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
    color: colors.white,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: colors.lime,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  list: {
    marginTop: 10,
  },
  loadingText: { marginTop: 12, color: colors.white, opacity: 0.9 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.gray,
    marginBottom: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  accountType: {
    color: colors.lime,
    fontWeight: "700",
    fontSize: 14,
  },
  status: {
    color: colors.white,
    fontSize: 12,
    opacity: 0.8,
  },
  name: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  number: {
    color: colors.white,
    fontSize: 14,
    opacity: 0.85,
    marginTop: 4,
  },
  balance: {
    color: colors.lime,
    fontSize: 18,
    fontWeight: "700",
    marginTop: 8,
  },
  emptyText: { color: colors.white, fontWeight: "600" },
  emptySub: { color: colors.white, opacity: 0.8, marginTop: 4 },
});
