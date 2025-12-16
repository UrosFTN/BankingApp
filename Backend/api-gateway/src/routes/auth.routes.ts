import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { authClient } from "../clients/auth.client";

const authRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  // Extract bearer token and attach validated user id when present
  fastify.addHook("preHandler", async (request) => {
    const authHeader = request.headers.authorization;
    if (!authHeader) return;
    const token = authHeader.replace("Bearer ", "").trim();
    try {
      const validation = await authClient.validateToken({
        access_token: token,
      });
      if (validation?.valid) {
        const userId = validation.user_id;
        (request as any).user = { id: userId };
        (request as any).accessToken = token;
      }
    } catch (_) {
      // ignore; some routes don't require auth
    }
  });

  fastify.post("/register", async (request) => {
    const { email, password } = request.body as any;
    return authClient.register({ email, password });
  });

  fastify.post("/login", async (request) => {
    const { email, password } = request.body as any;
    return authClient.login({ email, password });
  });

  fastify.post("/refresh", async (request) => {
    const { refresh_token } = request.body as any;
    return authClient.refreshToken({ refresh_token });
  });

  // Validate using bearer token only
  fastify.post("/validate", async (request) => {
    const token = (request as any).accessToken;
    if (!token) return { valid: false };
    return authClient.validateToken({ access_token: token });
  });

  // Logout uses RevokeToken (only needs refresh_token)
  fastify.post("/logout", async (request) => {
    const { refresh_token } = (request.body as any) || {};
    return authClient.revokeToken({ refresh_token });
  });

  fastify.post("/revoke", async (request) => {
    const { refresh_token } = request.body as any;
    return authClient.revokeToken({ refresh_token });
  });

  // Device register uses bearer-derived user_id
  fastify.post("/device/register", async (request) => {
    const userId = (request as any).user?.id;
    const { device_id, device_name } = request.body as any;
    return authClient.registerDevice({
      user_id: String(userId),
      device_id,
      device_name,
    });
  });

  fastify.post("/device/login", async (request) => {
    const { device_token } = request.body as any;
    return authClient.loginWithDevice({ device_token });
  });

  // List devices for bearer-derived user_id (ignore path param)
  fastify.get("/devices/:userId", async (request) => {
    const userId = (request as any).user?.id;
    return authClient.getUserDevices({ user_id: String(userId) });
  });

  fastify.delete("/devices/:userId/:deviceId", async (request) => {
    const userId = (request as any).user?.id;
    const { deviceId } = request.params as any;
    return authClient.revokeDevice({
      user_id: String(userId),
      device_id: deviceId,
    });
  });

  fastify.post("/password/reset-request", async (request) => {
    const { email } = request.body as any;
    return authClient.requestPasswordReset({ email });
  });

  fastify.post("/password/reset", async (request) => {
    const { reset_token, new_password } = request.body as any;
    return authClient.resetPassword({ reset_token, new_password });
  });

  // Change password uses bearer-derived user_id
  fastify.post("/password/change", async (request) => {
    const userId = (request as any).user?.id;
    const { old_password, new_password } = request.body as any;
    return authClient.changePassword({
      user_id: String(userId),
      old_password,
      new_password,
    });
  });
};

export default authRoutes;
