// Frontend: src/services/api/transaction.api.ts
import client from "./client";

export type TransactionStatus = "pending" | "approved" | "declined";

export interface Transaction {
  id: string;
  sender_id: string;
  sender_account_id: string;
  sender_account_number: string;
  receiver_id: string;
  receiver_account_id: string;
  receiver_account_number: string;
  amount: number;
  currency: string;
  status: TransactionStatus;
  note?: string;
  payment_code?: string;
  model?: string;
  call_number?: string;
  created_at: string;
}

export interface CreateTransactionRequest {
  sender_account_number: string;
  receiver_account_number: string;
  amount: number;
  currency: string;
  note?: string;
  payment_code?: string;
  model?: string;
  call_number?: string;
}

export interface DepositRequest {
  account_number: string;
  amount: number;
  currency: string;
  note?: string;
}

export interface WithdrawRequest {
  account_number: string;
  amount: number;
  currency: string;
  note?: string;
}

const basePath = "/api/transactions";

// Helper to normalize response shape (camelCase or snake_case)
function normalizeTransaction(raw: any): Transaction {
  return {
    id: raw.id ?? raw.Id,
    sender_id: raw.sender_id ?? raw.SenderId,
    sender_account_id: raw.sender_account_id ?? raw.SenderAccountId,
    sender_account_number:
      raw.sender_account_number ?? raw.SenderAccountNumber ?? "",
    receiver_id: raw.receiver_id ?? raw.ReceiverId,
    receiver_account_id: raw.receiver_account_id ?? raw.ReceiverAccountId,
    receiver_account_number:
      raw.receiver_account_number ?? raw.ReceiverAccountNumber ?? "",
    amount: raw.amount ?? raw.Amount,
    currency: raw.currency ?? raw.Currency,
    status: (raw.status ?? raw.Status) as TransactionStatus,
    note: raw.note ?? raw.Note ?? "",
    payment_code: raw.payment_code ?? raw.PaymentCode ?? "",
    model: raw.model ?? raw.Model ?? "",
    call_number: raw.call_number ?? raw.CallNumber ?? "",
    created_at: raw.created_at ?? raw.CreatedAt,
  } as Transaction;
}

export const transactionApi = {
  createTransaction: async (
    payload: CreateTransactionRequest,
  ): Promise<Transaction> => {
    const res = await client.post(basePath, payload);
    const data = res.data.transaction ?? res.data;
    return normalizeTransaction(data);
  },

  deposit: async (payload: DepositRequest): Promise<Transaction> => {
    const res = await client.post(`${basePath}/deposit`, payload);
    const data = res.data.transaction ?? res.data;
    return normalizeTransaction(data);
  },

  withdraw: async (payload: WithdrawRequest): Promise<Transaction> => {
    const res = await client.post(`${basePath}/withdraw`, payload);
    const data = res.data.transaction ?? res.data;
    return normalizeTransaction(data);
  },

  getTransactionsByUser: async (userId: string): Promise<Transaction[]> => {
    const res = await client.get(basePath, { params: { userId } });
    const list = res.data.transactions ?? res.data;
    return Array.isArray(list) ? list.map(normalizeTransaction) : [];
  },
};
