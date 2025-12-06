export const jwtConfig = {
  accessSecret: process.env.JWT_ACCESS_SECRET || "change-this-secret",
  refreshSecret: process.env.JWT_REFRESH_SECRET || "change-this-secret-too",
  accessExpiry: process.env.JWT_ACCESS_EXPIRY || "15m",
  refreshExpiry: process.env.JWT_REFRESH_EXPIRY || "7d",
  deviceTokenExpiry: process.env.DEVICE_TOKEN_EXPIRY || "90d",
};
