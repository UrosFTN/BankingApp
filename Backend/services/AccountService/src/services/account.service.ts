import { accountRepository } from "../repositories/account.repository";
import { pool } from "../repositories/database";
import { Account } from "../models/account.model";
import logger from "../utils/logger";

export class AccountService {
  async createAccount(userId: string, currency: string): Promise<Account> {
    return accountRepository.create({ user_id: userId, currency });
  }

  async getAccount(accountId: string): Promise<Account> {
    const account = await accountRepository.findById(accountId);
    if (!account) {
      throw new Error("Account not found");
    }
    return account;
  }

  async listAccounts(userId: string): Promise<Account[]> {
    return accountRepository.listByUser(userId);
  }

  async deposit(accountId: string, amount: number): Promise<Account> {
    if (amount <= 0) throw new Error("Amount must be positive");
    const account = await this.getAccount(accountId);
    const newBalance = account.balance + amount;
    const updated = await accountRepository.updateBalance(
      accountId,
      newBalance,
    );
    if (!updated) throw new Error("Failed to update balance");
    return updated;
  }

  async withdraw(accountId: string, amount: number): Promise<Account> {
    if (amount <= 0) throw new Error("Amount must be positive");
    const account = await this.getAccount(accountId);
    if (account.balance < amount) throw new Error("Insufficient funds");
    const newBalance = account.balance - amount;
    const updated = await accountRepository.updateBalance(
      accountId,
      newBalance,
    );
    if (!updated) throw new Error("Failed to update balance");
    return updated;
  }

  async transfer(
    fromId: string,
    toId: string,
    amount: number,
  ): Promise<{ from: Account; to: Account }> {
    if (amount <= 0) throw new Error("Amount must be positive");
    if (fromId === toId) throw new Error("Cannot transfer to same account");

    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const fromRes = await client.query(
        "SELECT * FROM accounts WHERE id = $1 FOR UPDATE",
        [fromId],
      );
      const toRes = await client.query(
        "SELECT * FROM accounts WHERE id = $1 FOR UPDATE",
        [toId],
      );

      const from = fromRes.rows[0];
      const to = toRes.rows[0];

      if (!from || !to) throw new Error("Account not found");
      if (from.balance < amount) throw new Error("Insufficient funds");

      const newFromBalance = from.balance - amount;
      const newToBalance = to.balance + amount;

      await client.query(
        `UPDATE accounts SET balance = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2`,
        [newFromBalance, fromId],
      );
      await client.query(
        `UPDATE accounts SET balance = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2`,
        [newToBalance, toId],
      );

      await client.query("COMMIT");

      const updatedFrom = await accountRepository.findById(fromId);
      const updatedTo = await accountRepository.findById(toId);
      if (!updatedFrom || !updatedTo)
        throw new Error("Transfer post-check failed");

      logger.info({ fromId, toId, amount }, "Transfer completed");
      return { from: updatedFrom, to: updatedTo };
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  }
}

export const accountService = new AccountService();
