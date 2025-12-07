import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";
import { accountService } from "../services/account.service";
import logger from "../utils/logger";

export class AccountController {
  async createAccount(
    call: ServerUnaryCall<any, any>,
    callback: sendUnaryData<any>,
  ): Promise<void> {
    try {
      const { user_id, currency } = call.request;
      const account = await accountService.createAccount(user_id, currency);
      callback(null, {
        success: true,
        message: "Account created",
        account: this.map(account),
      });
    } catch (error: any) {
      logger.error(error, "Error in createAccount");
      callback({
        code: status.INTERNAL,
        message: error.message || "Create failed",
      });
    }
  }

  async getAccount(
    call: ServerUnaryCall<any, any>,
    callback: sendUnaryData<any>,
  ): Promise<void> {
    try {
      const { account_id } = call.request;
      const account = await accountService.getAccount(account_id);
      callback(null, {
        success: true,
        message: "Account fetched",
        account: this.map(account),
      });
    } catch (error: any) {
      logger.error(error, "Error in getAccount");
      callback({
        code: status.NOT_FOUND,
        message: error.message || "Not found",
      });
    }
  }

  async listAccounts(
    call: ServerUnaryCall<any, any>,
    callback: sendUnaryData<any>,
  ): Promise<void> {
    try {
      const { user_id } = call.request;
      const accounts = await accountService.listAccounts(user_id);
      callback(null, { accounts: accounts.map(this.map) });
    } catch (error: any) {
      logger.error(error, "Error in listAccounts");
      callback({
        code: status.INTERNAL,
        message: error.message || "List failed",
      });
    }
  }

  async deposit(
    call: ServerUnaryCall<any, any>,
    callback: sendUnaryData<any>,
  ): Promise<void> {
    try {
      const { account_id, amount } = call.request;
      const account = await accountService.deposit(account_id, amount);
      callback(null, {
        success: true,
        message: "Deposit successful",
        account: this.map(account),
      });
    } catch (error: any) {
      logger.error(error, "Error in deposit");
      callback({
        code: status.INVALID_ARGUMENT,
        message: error.message || "Deposit failed",
      });
    }
  }

  async withdraw(
    call: ServerUnaryCall<any, any>,
    callback: sendUnaryData<any>,
  ): Promise<void> {
    try {
      const { account_id, amount } = call.request;
      const account = await accountService.withdraw(account_id, amount);
      callback(null, {
        success: true,
        message: "Withdraw successful",
        account: this.map(account),
      });
    } catch (error: any) {
      logger.error(error, "Error in withdraw");
      callback({
        code: status.INVALID_ARGUMENT,
        message: error.message || "Withdraw failed",
      });
    }
  }

  async transfer(
    call: ServerUnaryCall<any, any>,
    callback: sendUnaryData<any>,
  ): Promise<void> {
    try {
      const { from_account_id, to_account_id, amount } = call.request;
      const result = await accountService.transfer(
        from_account_id,
        to_account_id,
        amount,
      );
      callback(null, {
        success: true,
        message: "Transfer successful",
        from_account: this.map(result.from),
        to_account: this.map(result.to),
      });
    } catch (error: any) {
      logger.error(error, "Error in transfer");
      callback({
        code: status.INVALID_ARGUMENT,
        message: error.message || "Transfer failed",
      });
    }
  }

  private map = (account: any) => ({
    id: account.id,
    user_id: account.user_id,
    currency: account.currency,
    balance: account.balance,
    status: account.status,
    created_at: account.created_at?.toISOString?.() || account.created_at,
    updated_at: account.updated_at?.toISOString?.() || account.updated_at,
  });
}

export const accountController = new AccountController();
