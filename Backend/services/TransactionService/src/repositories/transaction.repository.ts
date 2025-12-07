import { pool } from "./database";
import {
  Transaction,
  TransactionStatus,
  TransactionType,
} from "../models/transaction.model";

export class TransactionRepository {
  async create(data: {
    type: TransactionType;
    from_account_id?: string | null;
    to_account_id?: string | null;
    amount: number;
    currency: string;
    status: TransactionStatus;
    description?: string | null;
  }): Promise<Transaction> {
    const { v4: uuidv4 } = await import("uuid");
    const id = uuidv4();
    const result = await pool.query(
      `INSERT INTO transactions (id, type, from_account_id, to_account_id, amount, currency, status, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        id,
        data.type,
        data.from_account_id || null,
        data.to_account_id || null,
        data.amount,
        data.currency,
        data.status,
        data.description || null,
      ],
    );
    return result.rows[0];
  }

  async findById(id: string): Promise<Transaction | null> {
    const result = await pool.query(
      `SELECT * FROM transactions WHERE id = $1`,
      [id],
    );
    return result.rows[0] || null;
  }

  async listByAccount(accountId: string): Promise<Transaction[]> {
    const result = await pool.query(
      `SELECT * FROM transactions
       WHERE from_account_id = $1 OR to_account_id = $1
       ORDER BY created_at DESC`,
      [accountId],
    );
    return result.rows;
  }
}

export const transactionRepository = new TransactionRepository();
