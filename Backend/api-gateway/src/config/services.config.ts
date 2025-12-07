export interface ServiceConfig {
  host: string;
  port: number;
}

export interface ServicesConfig {
  auth: ServiceConfig;
  account: ServiceConfig;
  transaction: ServiceConfig;
  notification: ServiceConfig;
}

export const servicesConfig: ServicesConfig = {
  auth: {
    host: process.env.AUTH_SERVICE_HOST || "localhost",
    port: parseInt(process.env.AUTH_SERVICE_PORT || "50051", 10),
  },
  account: {
    host: process.env.ACCOUNT_SERVICE_HOST || "localhost",
    port: parseInt(process.env.ACCOUNT_SERVICE_PORT || "50052", 10),
  },
  transaction: {
    host: process.env.TRANSACTION_SERVICE_HOST || "localhost",
    port: parseInt(process.env.TRANSACTION_SERVICE_PORT || "50053", 10),
  },
  notification: {
    host: process.env.NOTIFICATION_SERVICE_HOST || "localhost",
    port: parseInt(process.env.NOTIFICATION_SERVICE_PORT || "50054", 10),
  },
};
