import { pool } from "./database";
import { Account, CreateAccountDto } from "../models/account.model";

export class AccountRepository {
  async create(data: CreateAccountDto): Promise<Account> {
    const { v4: uuidv4 } = await import("uuid");
    const id = uuidv4();
    const query = `
      INSERT INTO accounts (id, user_id, currency, balance, status)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const result = await pool.query(query, [
      id,
      data.user_id,
      data.currency,
      0,
      "ACTIVE",
    ]);
    return result.rows[0];
  }

  async findById(id: string): Promise<Account | null> {
    const result = await pool.query("SELECT * FROM accounts WHERE id = $1", [
      id,
    ]);
    return result.rows[0] || null;
  }

  async listByUser(userId: string): Promise<Account[]> {
    const result = await pool.query(
      "SELECT * FROM accounts WHERE user_id = $1 ORDER BY created_at DESC",
      [userId],
    );
    return result.rows;
  }

  async updateBalance(id: string, newBalance: number): Promise<Account | null> {
    const result = await pool.query(
      `UPDATE accounts SET balance = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`,
      [newBalance, id],
    );
    return result.rows[0] || null;
  }

  async setStatus(id: string, status: string): Promise<void> {
    await pool.query(
      `UPDATE accounts SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2`,
      [status, id],
    );
  }
}

export const accountRepository = new AccountRepository();
