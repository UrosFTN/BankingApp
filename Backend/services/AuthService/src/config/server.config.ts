export const serverConfig = {
  port: parseInt(process.env.PORT || "3001", 10),
  host: "0.0.0.0",
  env: process.env.NODE_ENV || "development",
};
