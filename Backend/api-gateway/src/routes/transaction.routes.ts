import fastify, { FastifyInstance, FastifyPluginAsync } from "fastify";
import { authClient } from "../clients/auth.client";
import { transactionClient } from "../clients/transaction.client";

const transactionRoutes: FastifyPluginAsync = async (
  fastify: FastifyInstance,
) => {
  // Require auth for all transaction routes
  fastify.addHook("preHandler", async (request, reply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return reply
        .status(401)
        .send({ message: "Missing Authorization header" });
    }
    const token = authHeader.replace("Bearer", "").trim();
    const validation = await authClient.validateToken({ access_token: token });
    if (!validation?.valid) {
      return reply.status(401).send({ message: "Invalid token" });
    }
    (request as any).user = { id: validation.user_id };
  });

  // Create transaction using account numbers (transfer)
  fastify.post("/", async (request, reply) => {
    const body = request.body as any;
    const payload = {
      sender_account_number: body.sender_account_number,
      receiver_account_number: body.receiver_account_number,
      amount: body.amount,
      currency: body.currency,
      payment_code: body.payment_code,
      model: body.model,
      call_number: body.call_number,
      note: body.note,
    };
    const res = await transactionClient.createTransaction(payload);
    return res;
  });

  // Deposit into authenticated user's account
  fastify.post("/deposit", async (request, reply) => {
    const body = request.body as any;
    const payload = {
      account_number: body.account_number,
      amount: body.amount,
      currency: body.currency,
      note: body.note,
    };
    const res = await transactionClient.deposit(payload);
    return res;
  });

  // Withdraw from authenticated user's account
  fastify.post("/withdraw", async (request, reply) => {
    const body = request.body as any;
    const payload = {
      account_number: body.account_number,
      amount: body.amount,
      currency: body.currency,
      note: body.note,
    };
    const res = await transactionClient.withdraw(payload);
    return res;
  });

  // List transactions for authenticated user
  fastify.get("/", async (request, reply) => {
    const userId = (request as any).user?.id;
    const res = await transactionClient.getTransactionsByUser({
      user_id: userId,
    });
    return res;
  });
};

export default transactionRoutes;
