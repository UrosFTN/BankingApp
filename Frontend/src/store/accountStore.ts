import { create } from "zustand";
import {
  accountApi,
  Account,
  CreateAccountRequest,
} from "../services/api/account.api";

interface AccountState {
  accounts: Account[];
  selectedAccount: Account | null;
  isLoading: boolean;
  error: string | null;
  loadAccounts: () => Promise<void>;
  createAccount: (payload: CreateAccountRequest) => Promise<Account>;
  deleteAccount: (accountId: string) => Promise<void>;
  setSelectedAccount: (account: Account | null) => void;
  clearError: () => void;
}

const getErrorMessage = (error: any) =>
  error?.response?.data?.message || error?.message || "Something went wrong";

export const useAccountStore = create<AccountState>((set, get) => ({
  accounts: [],
  selectedAccount: null,
  isLoading: false,
  error: null,

  loadAccounts: async () => {
    set({ isLoading: true, error: null });
    try {
      const accounts = await accountApi.getAccounts();
      set({ accounts, isLoading: false });
    } catch (error: any) {
      set({ error: getErrorMessage(error), isLoading: false });
      throw error;
    }
  },

  createAccount: async (payload: CreateAccountRequest) => {
    set({ isLoading: true, error: null });
    try {
      const account = await accountApi.createAccount(payload);
      set((state) => ({
        accounts: [account, ...state.accounts],
        isLoading: false,
      }));
      return account;
    } catch (error: any) {
      const message = getErrorMessage(error);
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  deleteAccount: async (accountId: string) => {
    set({ isLoading: true, error: null });
    try {
      await accountApi.deleteAccount(accountId);
      set((state) => ({
        accounts: state.accounts.filter((a) => a.id !== accountId),
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: getErrorMessage(error), isLoading: false });
      throw error;
    }
  },

  setSelectedAccount: (account: Account | null) =>
    set({ selectedAccount: account }),

  clearError: () => set({ error: null }),
}));
