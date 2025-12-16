import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi, AuthResponse } from "../services/api/auth.api";

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
      await authApi.logout();
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
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
}));
