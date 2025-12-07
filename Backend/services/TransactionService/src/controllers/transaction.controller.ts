import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";
import { transactionService } from "../services";
import logger from "../utils/logger";

export class TransactionController {
  async deposit(
    call: ServerUnaryCall<any, any>,
    callback: sendUnaryData<any>,
  ): Promise<void> {
    try {
      const { account_id, amount, currency, description } = call.request;
      const tx = await transactionService.deposit(
        account_id,
        amount,
        currency,
        description,
      );
      callback(null, {
        success: true,
        message: "Deposit completed",
        transaction: this.map(tx),
      });
    } catch (error: any) {
      logger.error(error, "Error in deposit");
      callback({ code: status.INVALID_ARGUMENT, message: error.message });
    }
  }

  async withdraw(
    call: ServerUnaryCall<any, any>,
    callback: sendUnaryData<any>,
  ): Promise<void> {
    try {
      const { account_id, amount, currency, description } = call.request;
      const tx = await transactionService.withdraw(
        account_id,
        amount,
        currency,
        description,
      );
      callback(null, {
        success: true,
        message: "Withdrawal completed",
        transaction: this.map(tx),
      });
    } catch (error: any) {
      logger.error(error, "Error in withdraw");
      callback({ code: status.INVALID_ARGUMENT, message: error.message });
    }
  }

  async transfer(
    call: ServerUnaryCall<any, any>,
    callback: sendUnaryData<any>,
  ): Promise<void> {
    try {
      const { from_account_id, to_account_id, amount, currency, description } =
        call.request;
      const tx = await transactionService.transfer(
        from_account_id,
        to_account_id,
        amount,
        currency,
        description,
      );
      callback(null, {
        success: true,
        message: "Transfer completed",
        transaction: this.map(tx),
      });
    } catch (error: any) {
      logger.error(error, "Error in transfer");
      callback({ code: status.INVALID_ARGUMENT, message: error.message });
    }
  }

  async getTransaction(
    call: ServerUnaryCall<any, any>,
    callback: sendUnaryData<any>,
  ): Promise<void> {
    try {
      const { transaction_id } = call.request;
      const tx = await transactionService.getTransaction(transaction_id);
      callback(null, {
        success: true,
        message: "Transaction fetched",
        transaction: this.map(tx),
      });
    } catch (error: any) {
      logger.error(error, "Error in getTransaction");
      callback({ code: status.NOT_FOUND, message: error.message });
    }
  }

  async listTransactions(
    call: ServerUnaryCall<any, any>,
    callback: sendUnaryData<any>,
  ): Promise<void> {
    try {
      const { account_id } = call.request;
      const txs = await transactionService.listTransactions(account_id);
      callback(null, {
        transactions: txs.map(this.map),
      });
    } catch (error: any) {
      logger.error(error, "Error in listTransactions");
      callback({ code: status.INVALID_ARGUMENT, message: error.message });
    }
  }

  private map = (tx: any) => ({
    id: tx.id,
    type: tx.type,
    from_account_id: tx.from_account_id,
    to_account_id: tx.to_account_id,
    amount: tx.amount,
    currency: tx.currency,
    status: tx.status,
    description: tx.description,
    created_at: tx.created_at?.toISOString?.() || tx.created_at,
    updated_at: tx.updated_at?.toISOString?.() || tx.updated_at,
  });
}

export const transactionController = new TransactionController();
