import client from "./client";

export type AccountType = "checking" | "savings" | "credit";
export type AccountStatus = "active" | "closed" | "frozen";

export interface Account {
  id: string;
  user_id: string;
  account_number: string;
  iban: string;
  account_holder_name: string;
  account_type: AccountType;
  balance: number;
  currency: string;
  status: AccountStatus;
  created_at: string;
  updated_at: string;
}

export interface CreateAccountRequest {
  account_holder_name: string;
  account_type: AccountType;
  currency: string;
}

const basePath = "/api/accounts";

export const accountApi = {
  createAccount: async (payload: CreateAccountRequest): Promise<Account> => {
    const res = await client.post(basePath, payload);
    return res.data.account ?? res.data;
  },

  getAccounts: async (): Promise<Account[]> => {
    const res = await client.get(basePath);
    return res.data.accounts ?? res.data;
  },

  getAccount: async (accountId: string): Promise<Account> => {
    const res = await client.get(`${basePath}/${accountId}`);
    return res.data.account ?? res.data;
  },

  deleteAccount: async (accountId: string): Promise<void> => {
    await client.delete(`${basePath}/${accountId}`);
  },
};
