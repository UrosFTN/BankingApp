import dotenv from "dotenv";

dotenv.config();

export const servicesConfig = {
  account: {
    host: process.env.ACCOUNT_SERVICE_HOST || "localhost",
    port: parseInt(process.env.ACCOUNT_SERVICE_PORT || "50052", 10),
  },
};
