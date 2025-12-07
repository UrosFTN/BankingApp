import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { transactionClient } from "../clients/transaction.client";

const transactionRoutes: FastifyPluginAsync = async (
  fastify: FastifyInstance,
) => {
  fastify.post("/deposit", async (request) => {
    const { account_id, amount, currency, description } = request.body as any;
    return transactionClient.deposit({
      account_id,
      amount,
      currency,
      description,
    });
  });

  fastify.post("/withdraw", async (request) => {
    const { account_id, amount, currency, description } = request.body as any;
    return transactionClient.withdraw({
      account_id,
      amount,
      currency,
      description,
    });
  });

  fastify.post("/transfer", async (request) => {
    const { from_account_id, to_account_id, amount, currency, description } =
      request.body as any;
    return transactionClient.transfer({
      from_account_id,
      to_account_id,
      amount,
      currency,
      description,
    });
  });

  fastify.get("/:transactionId", async (request) => {
    const { transactionId } = request.params as any;
    return transactionClient.getTransaction({ transaction_id: transactionId });
  });

  fastify.get("/account/:accountId", async (request) => {
    const { accountId } = request.params as any;
    return transactionClient.listTransactions({ account_id: accountId });
  });
};

export default transactionRoutes;
