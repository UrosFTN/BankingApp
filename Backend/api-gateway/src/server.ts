import Fastify, { FastifyError, FastifyReply } from "fastify";
import dotenv from "dotenv";
import { serverConfig } from "./config";
import authRoutes from "./routes/auth.routes";
import accountRoutes from "./routes/account.routes";
import transactionRoutes from "./routes/transaction.routes";
//import notificationRoutes from "./routes/notification.routes";

dotenv.config();

const fastify = Fastify({
  logger: serverConfig.logger,
});

fastify.setErrorHandler((error: FastifyError, request, reply: FastifyReply) => {
  fastify.log.error(error);

  reply.status(error.statusCode || 500).send({
    success: false,
    error: {
      message: error.message || "Internal server error",
      code: error.code || "INTERNAL_ERROR",
    },
  });
});

fastify.get("/health", async (request, reply) => {
  return {
    success: true,
    status: "healthy",
    service: "api-gateway",
    timeStamp: new Date().toISOString(),
  };
});

fastify.get("/", async (request, reply) => {
  return {
    success: true,
    message: "BankingApp API Gatway",
    version: "1.0.0",
  };
});

// Register routes
fastify.register(authRoutes, { prefix: "/api/auth" });
fastify.register(accountRoutes, { prefix: "/api/accounts" });
fastify.register(transactionRoutes, { prefix: "/api/transactions" });
//fastify.register(notificationRoutes, { prefix: "/api/notifications" });

const start = async () => {
  try {
    await fastify.listen({
      port: serverConfig.port,
      host: serverConfig.host,
    });

    fastify.log.info(
      `API Gateway running on http://${serverConfig.host}:${serverConfig.port}`,
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

process.on("SIGINT", async () => {
  fastify.log.info("Shutting down gracefully...");
  await fastify.close();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  fastify.log.info("Shutting down gracefully...");
  await fastify.close();
  process.exit(0);
});

start();
