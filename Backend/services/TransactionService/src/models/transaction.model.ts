export type TransactionType = "DEPOSIT" | "WITHDRAW" | "TRANSFER";
export type TransactionStatus = "PENDING" | "COMPLETED" | "FAILED";

export interface Transaction {
  id: string;
  type: TransactionType;
  from_account_id?: string | null;
  to_account_id?: string | null;
  amount: number;
  currency: string;
  status: TransactionStatus;
  description?: string | null;
  created_at: Date;
  updated_at: Date;
}
