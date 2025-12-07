import { transactionRepository } from "../repositories/transaction.repository";
import { Transaction } from "../models/transaction.model";
import { AccountClient } from "../clients/account.client";
import logger from "../utils/logger";

interface TransactionServiceDeps {
  accountClient: AccountClient;
}

export class TransactionService {
  private accountClient: AccountClient;

  constructor(deps: TransactionServiceDeps) {
    this.accountClient = deps.accountClient;
  }

  async deposit(
    accountId: string,
    amount: number,
    currency: string,
    description?: string,
  ): Promise<Transaction> {
    this.validateAmount(amount);

    await this.accountClient.deposit({ account_id: accountId, amount });

    const tx = await transactionRepository.create({
      type: "DEPOSIT",
      to_account_id: accountId,
      amount,
      currency,
      status: "COMPLETED",
      description,
    });

    logger.info({ accountId, amount }, "Deposit recorded");
    return tx;
  }

  async withdraw(
    accountId: string,
    amount: number,
    currency: string,
    description?: string,
  ): Promise<Transaction> {
    this.validateAmount(amount);

    await this.accountClient.withdraw({ account_id: accountId, amount });

    const tx = await transactionRepository.create({
      type: "WITHDRAW",
      from_account_id: accountId,
      amount,
      currency,
      status: "COMPLETED",
      description,
    });

    logger.info({ accountId, amount }, "Withdrawal recorded");
    return tx;
  }

  async transfer(
    fromAccountId: string,
    toAccountId: string,
    amount: number,
    currency: string,
    description?: string,
  ): Promise<Transaction> {
    this.validateAmount(amount);
    if (fromAccountId === toAccountId)
      throw new Error("Cannot transfer to same account");

    await this.accountClient.transfer({
      from_account_id: fromAccountId,
      to_account_id: toAccountId,
      amount,
    });

    const tx = await transactionRepository.create({
      type: "TRANSFER",
      from_account_id: fromAccountId,
      to_account_id: toAccountId,
      amount,
      currency,
      status: "COMPLETED",
      description,
    });

    logger.info({ fromAccountId, toAccountId, amount }, "Transfer recorded");
    return tx;
  }

  async getTransaction(id: string): Promise<Transaction> {
    const tx = await transactionRepository.findById(id);
    if (!tx) throw new Error("Transaction not found");
    return tx;
  }

  async listTransactions(accountId: string): Promise<Transaction[]> {
    return transactionRepository.listByAccount(accountId);
  }

  private validateAmount(amount: number) {
    if (amount <= 0) throw new Error("Amount must be positive");
  }
}
