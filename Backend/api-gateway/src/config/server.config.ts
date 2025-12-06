export const serverConfig = {
  port: parseInt(process.env.PORT || "3000", 10),
  host: "0.0.0.0",
  logger:
    process.env.NODE_ENV === "production"
      ? { level: "info" }
      : {
          level: "debug",
          transport: {
            target: "pino-pretty",
            options: {
              colorize: true,
              translateTime: "HH:MM:ss Z",
              ignore: "pid,hostname",
            },
          },
        },
};
