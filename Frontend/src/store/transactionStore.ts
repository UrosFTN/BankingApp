import { create } from "zustand";
import {
  transactionApi,
  Transaction,
  CreateTransactionRequest,
  DepositRequest,
  WithdrawRequest,
} from "../services/api/transaction.api";

interface TransactionState {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  loadTransactions: (userId: string) => Promise<void>;
  createTransaction: (
    payload: CreateTransactionRequest,
  ) => Promise<Transaction>;
  deposit: (payload: DepositRequest) => Promise<Transaction>;
  withdraw: (payload: WithdrawRequest) => Promise<Transaction>;
  clearError: () => void;
}

const getErrorMessage = (error: any) =>
  error?.response?.data?.message || error?.message || "Something went wrong";

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  isLoading: false,
  error: null,

  loadTransactions: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const data = await transactionApi.getTransactionsByUser(userId);
      set({ transactions: data, isLoading: false });
    } catch (error: any) {
      set({ error: getErrorMessage(error), isLoading: false });
      throw error;
    }
  },

  createTransaction: async (payload: CreateTransactionRequest) => {
    set({ isLoading: true, error: null });
    try {
      const txn = await transactionApi.createTransaction(payload);
      set((state) => ({
        transactions: [txn, ...state.transactions],
        isLoading: false,
      }));
      return txn;
    } catch (error: any) {
      const message = getErrorMessage(error);
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  deposit: async (payload: DepositRequest) => {
    set({ isLoading: true, error: null });
    try {
      const txn = await transactionApi.deposit(payload);
      set((state) => ({
        transactions: [txn, ...state.transactions],
        isLoading: false,
      }));
      return txn;
    } catch (error: any) {
      const message = getErrorMessage(error);
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  withdraw: async (payload: WithdrawRequest) => {
    set({ isLoading: true, error: null });
    try {
      const txn = await transactionApi.withdraw(payload);
      set((state) => ({
        transactions: [txn, ...state.transactions],
        isLoading: false,
      }));
      return txn;
    } catch (error: any) {
      const message = getErrorMessage(error);
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  clearError: () => set({ error: null }),
}));
