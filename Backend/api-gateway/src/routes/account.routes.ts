import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { accountClient } from "../clients/account.client";

const accountRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.post("/", async (request) => {
    const { user_id, currency } = request.body as any;
    return accountClient.createAccount({ user_id, currency });
  });

  fastify.get("/user/:userId", async (request) => {
    const { userId } = request.params as any;
    return accountClient.listAccounts({ user_id: userId });
  });

  fastify.get("/:accountId", async (request) => {
    const { accountId } = request.params as any;
    return accountClient.getAccount({ account_id: accountId });
  });

  fastify.post("/:accountId/deposit", async (request) => {
    const { accountId } = request.params as any;
    const { amount } = request.body as any;
    return accountClient.deposit({ account_id: accountId, amount });
  });

  fastify.post("/:accountId/withdraw", async (request) => {
    const { accountId } = request.params as any;
    const { amount } = request.body as any;
    return accountClient.withdraw({ account_id: accountId, amount });
  });

  fastify.post("/transfer", async (request) => {
    const { from_account_id, to_account_id, amount } = request.body as any;
    return accountClient.transfer({ from_account_id, to_account_id, amount });
  });
};

export default accountRoutes;
