import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://192.168.1.103:3000";

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
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        if (refreshToken) {
          const response = await axios.post(
            `${API_BASE_URL}/api/auth/refresh`,
            {
              refresh_token: refreshToken,
            },
          );
          await AsyncStorage.setItem("accessToken", response.data.access_token);
          client.defaults.headers.Authorization = `Bearer ${response.data.access_token}`;
          return client(originalRequest);
        }
      } catch (refreshError) {
        await AsyncStorage.removeItem("accessToken");
        await AsyncStorage.removeItem("refreshToken");
      }
    }
    return Promise.reject(error);
  },
);

export default client;
