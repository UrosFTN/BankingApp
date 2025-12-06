export const serverConfig = {
  port: parseInt(process.env.PORT || "3000", 10),
  host: "0.0.0.0", // Listen on all interfaces (important for Docker)
  logger: {
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    prettyPrint: process.env.NODE_ENV !== "production",
  },
};
