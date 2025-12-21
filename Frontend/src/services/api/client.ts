import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

const API_BASE_URL = "http://192.168.0.18:3000";

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("accessToken");
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const fpEnabled = await SecureStore.getItemAsync("fingerprintEnabled");
        const refreshToken =
          fpEnabled === "true"
            ? await SecureStore.getItemAsync("refreshToken")
            : await AsyncStorage.getItem("refreshToken");
        if (refreshToken) {
          const response = await axios.post(
            `${API_BASE_URL}/api/auth/refresh`,
            {
              refresh_token: refreshToken,
            },
          );
          await AsyncStorage.setItem("accessToken", response.data.access_token);
          const newRefresh = response.data.refresh_token;
          if (fpEnabled === "true") {
            if (newRefresh) {
              await SecureStore.setItemAsync("refreshToken", newRefresh);
            }
            await AsyncStorage.removeItem("refreshToken");
          } else if (newRefresh) {
            await AsyncStorage.setItem("refreshToken", newRefresh);
          }
          client.defaults.headers.Authorization = `Bearer ${response.data.access_token}`;
          return client(originalRequest);
        }
      } catch (refreshError) {
        await AsyncStorage.removeItem("accessToken");
        await AsyncStorage.removeItem("refreshToken");
        await SecureStore.deleteItemAsync("refreshToken");
      }
    }
    return Promise.reject(error);
  },
);

export default client;
