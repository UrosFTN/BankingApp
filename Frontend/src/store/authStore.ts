import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";
import { authApi } from "../services/api/auth.api";

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  enableFingerprint: () => Promise<boolean>;
  disableFingerprint: () => Promise<void>;
  fingerprintLogin: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null,

  register: async (email: string, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.register({ email, password });
      await AsyncStorage.setItem("accessToken", response.access_token);
      await AsyncStorage.setItem("refreshToken", response.refresh_token);
      set({
        user: {
          id: response.user_id,
          email: response.email,
          role: response.role,
        },
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        isLoading: false,
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Registration failed";
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.login({ email, password });
      await AsyncStorage.setItem("accessToken", response.access_token);
      await AsyncStorage.setItem("refreshToken", response.refresh_token);
      set({
        user: {
          id: response.user_id,
          email: response.email,
          role: response.role,
        },
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        isLoading: false,
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      // Revoke any stored refresh token before logging out
      const fpEnabled = await SecureStore.getItemAsync("fingerprintEnabled");
      const refreshToken =
        fpEnabled === "true"
          ? await SecureStore.getItemAsync("refreshToken")
          : await AsyncStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          await authApi.revoke(refreshToken);
        } catch {}
      }
      await authApi.logout();
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      await SecureStore.deleteItemAsync("refreshToken");
      await SecureStore.deleteItemAsync("fingerprintEnabled");
      set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isLoading: false,
      });
    } catch (error: any) {
      set({ isLoading: false });
    }
  },

  clearError: () => set({ error: null }),

  enableFingerprint: async () => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (!compatible || !enrolled) return false;

      const refreshToken = await AsyncStorage.getItem("refreshToken");
      if (!refreshToken) return false;

      await SecureStore.setItemAsync("refreshToken", refreshToken);
      await SecureStore.setItemAsync("fingerprintEnabled", "true");
      await AsyncStorage.removeItem("refreshToken");
      return true;
    } catch {
      return false;
    }
  },

  disableFingerprint: async () => {
    try {
      const token = await SecureStore.getItemAsync("refreshToken");
      if (token) {
        try {
          await authApi.revoke(token);
        } catch {}
      }
    } finally {
      await SecureStore.deleteItemAsync("refreshToken");
      await SecureStore.deleteItemAsync("fingerprintEnabled");
    }
  },

  fingerprintLogin: async () => {
    try {
      const enabled = await SecureStore.getItemAsync("fingerprintEnabled");
      if (enabled !== "true") return false;

      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (!compatible || !enrolled) return false;

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Login with fingerprint",
        cancelLabel: "Use password",
        disableDeviceFallback: true,
      });
      if (!result.success) return false;

      const refreshToken = await SecureStore.getItemAsync("refreshToken");
      if (!refreshToken) return false;

      const response = await authApi.refresh(refreshToken);
      await AsyncStorage.setItem("accessToken", response.access_token);
      // Keep new refresh token in SecureStore
      if (response.refresh_token) {
        await SecureStore.setItemAsync("refreshToken", response.refresh_token);
      }
      set({
        user: {
          id: response.user_id,
          email: response.email,
          role: response.role,
        },
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        isLoading: false,
        error: null,
      });
      return true;
    } catch {
      return false;
    }
  },
}));
