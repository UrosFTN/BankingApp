// src/services/api/auth.api.ts
import client from "./client";

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user_id: string;
  email: string;
  role: string;
  access_token: string;
  refresh_token: string;
}

export const authApi = {
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await client.post("/api/auth/register", data);
    return response.data;
  },
};
