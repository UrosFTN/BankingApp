import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { accountClient } from "../clients/account.client";
import { authClient } from "../clients/auth.client";

const accountRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  // Validate bearer token and attach user id
  fastify.addHook("preHandler", async (request, reply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      fastify.log.error("❌ Missing Authorization header");
      return reply
        .status(401)
        .send({ message: "Missing Authorization header" });
    }
    const token = authHeader.replace("Bearer ", "").trim();

    try {
      const validation = await authClient.validateToken({
        access_token: token,
      });
      fastify.log.info("✅ Token validation response:", validation);

      if (!validation?.valid) {
        fastify.log.error("❌ Invalid token");
        return reply.status(401).send({ message: "Invalid token" });
      }

      // Parse user_id - handle both number and string
      const userId =
        typeof validation.user_id === "string"
          ? parseInt(validation.user_id, 10)
          : validation.user_id;

      fastify.log.info(
        "✅ Attached user_id to request:",
        userId,
        "type:",
        typeof userId,
      );
      (request as any).user = { id: userId };
    } catch (error: any) {
      fastify.log.error("❌ Token validation error:", error);
      return reply.status(401).send({ message: "Token validation failed" });
    }
  });

  // List accounts for current user (matches frontend GET /api/accounts)
  fastify.get("/", async (request, reply) => {
    const userId = Number((request as any).user?.id);
    const response = await accountClient.getAccountsByUser({ user_id: userId });
    return response;
  });

  // Get a single account for current user (matches frontend GET /api/accounts/:id)
  fastify.get<{ Params: { id: string } }>("/:id", async (request, reply) => {
    const userId = Number((request as any).user?.id);
    const { id } = request.params as any;
    const response = await accountClient.getAccount({
      account_id: Number(id),
      user_id: Number(userId),
    });
    return response;
  });

  // Create an account - use authenticated user_id
  fastify.post("/", async (request, reply) => {
    const userId = Number((request as any).user?.id);
    const { account_holder_name, account_type, currency } = request.body as any;

    // Map string account_type to enum value
    const typeMap: { [key: string]: number } = {
      checking: 0,
      savings: 1,
      credit: 2,
    };

    const response = await accountClient.createAccount({
      user_id: userId,
      account_holder_name,
      account_type: typeMap[account_type.toLowerCase()] ?? 0,
      currency,
    });
    return response;
  });

  // Delete an account
  fastify.delete<{ Params: { id: string } }>("/:id", async (request, reply) => {
    const userId = Number((request as any).user?.id);
    const { id } = request.params as any;
    const response = await accountClient.deleteAccount({
      account_id: Number(id),
      user_id: Number(userId),
    });
    return response;
  });
};

export default accountRoutes;
