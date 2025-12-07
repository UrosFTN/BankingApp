import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { authClient } from "../clients/auth.client";

const authRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.post("/register", async (request, reply) => {
    const { email, password } = request.body as any;
    const response = await authClient.register({ email, password });
    return response;
  });

  fastify.post("/login", async (request, reply) => {
    const { email, password } = request.body as any;
    const response = await authClient.login({ email, password });
    return response;
  });

  fastify.post("/refresh", async (request, reply) => {
    const { refresh_token } = request.body as any;
    const response = await authClient.refreshToken({ refresh_token });
    return response;
  });

  fastify.post("/validate", async (request, reply) => {
    const { access_token } = request.body as any;
    const response = await authClient.validateToken({ access_token });
    return response;
  });

  fastify.post("/logout", async (request, reply) => {
    const { user_id, refresh_token } = request.body as any;
    const response = await authClient.logout({ user_id, refresh_token });
    return response;
  });

  fastify.post("/revoke", async (request, reply) => {
    const { refresh_token } = request.body as any;
    const response = await authClient.revokeToken({ refresh_token });
    return response;
  });

  fastify.post("/device/register", async (request, reply) => {
    const { user_id, device_id, device_name } = request.body as any;
    const response = await authClient.registerDevice({
      user_id,
      device_id,
      device_name,
    });
    return response;
  });

  fastify.post("/device/login", async (request, reply) => {
    const { device_token } = request.body as any;
    const response = await authClient.loginWithDevice({ device_token });
    return response;
  });

  fastify.get("/devices/:userId", async (request, reply) => {
    const { userId } = request.params as any;
    const response = await authClient.getUserDevices({ user_id: userId });
    return response;
  });

  fastify.delete("/devices/:userId/:deviceId", async (request, reply) => {
    const { userId, deviceId } = request.params as any;
    const response = await authClient.revokeDevice({
      user_id: userId,
      device_id: deviceId,
    });
    return response;
  });

  fastify.post("/password/reset-request", async (request, reply) => {
    const { email } = request.body as any;
    const response = await authClient.requestPasswordReset({ email });
    return response;
  });

  fastify.post("/password/reset", async (request, reply) => {
    const { reset_token, new_password } = request.body as any;
    const response = await authClient.resetPassword({
      reset_token,
      new_password,
    });
    return response;
  });

  fastify.post("/password/change", async (request, reply) => {
    const { user_id, old_password, new_password } = request.body as any;
    const response = await authClient.changePassword({
      user_id,
      old_password,
      new_password,
    });
    return response;
  });
};

export default authRoutes;
