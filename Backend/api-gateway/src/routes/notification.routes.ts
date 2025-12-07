import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { notificationClient } from "../clients/notification.client";

const notificationRoutes: FastifyPluginAsync = async (
  fastify: FastifyInstance,
) => {
  fastify.post("/", async (request) => {
    const { user_id, type, title, message, metadata } = request.body as any;
    return notificationClient.sendNotification({
      user_id,
      type,
      title,
      message,
      metadata,
    });
  });

  fastify.get("/:notificationId", async (request) => {
    const { notificationId } = request.params as any;
    return notificationClient.getNotification({
      notification_id: notificationId,
    });
  });

  fastify.get("/user/:userId", async (request) => {
    const { userId } = request.params as any;
    return notificationClient.listNotifications({ user_id: userId });
  });

  fastify.patch("/:notificationId/read", async (request) => {
    const { notificationId } = request.params as any;
    return notificationClient.markAsRead({ notification_id: notificationId });
  });
};

export default notificationRoutes;
