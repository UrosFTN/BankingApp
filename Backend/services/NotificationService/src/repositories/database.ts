import { Pool } from "pg";
import { databaseConfig } from "../config";

export const pool = new Pool(databaseConfig);

pool.on("connect", () => {
  console.log("Connected to PostgreSQL (NotificationService)");
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
