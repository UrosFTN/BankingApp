import { AccountClient } from "../clients/account.client";
import { servicesConfig } from "./service.config";
import { TransactionService } from "./transaction.service";

const accountClient = new AccountClient(
  servicesConfig.account.host,
  servicesConfig.account.port,
);

export const transactionService = new TransactionService({
  accountClient,
});
