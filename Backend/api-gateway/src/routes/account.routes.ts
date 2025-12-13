import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { accountClient } from "../clients/account.client";

const accountRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  // List accounts by user
  fastify.get<{ Params: { userId: string } }>(
    "/:userId",
    async (request, reply) => {
      const { userId } = request.params as any;
      const response = await accountClient.getAccountsByUser({
        user_id: Number(userId),
      });
      return response;
    },
  );

  // Get a single account
  fastify.get<{ Params: { userId: string; id: string } }>(
    "/:userId/:id",
    async (request, reply) => {
      const { userId, id } = request.params as any;
      const response = await accountClient.getAccount({
        account_id: Number(id),
        user_id: Number(userId),
      });
      return response;
    },
  );

  // Create an account
  fastify.post("/", async (request, reply) => {
    const { user_id, account_holder_name, account_type, currency } =
      request.body as any;
    const response = await accountClient.createAccount({
      user_id: Number(user_id),
      account_holder_name,
      account_type,
      currency,
    });
    return response;
  });

  // Delete an account
  fastify.delete<{ Params: { userId: string; id: string } }>(
    "/:userId/:id",
    async (request, reply) => {
      const { userId, id } = request.params as any;
      const response = await accountClient.deleteAccount({
        account_id: Number(id),
        user_id: Number(userId),
      });
      return response;
    },
  );
};

export default accountRoutes;
