export const serverConfig = {
  port: parseInt(process.env.PORT || "50051", 10),
  host: "0.0.0.0",
  env: process.env.NODE_ENV || "development",
};
