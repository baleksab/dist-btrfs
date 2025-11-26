import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

export const config = {
  port: Number(process.env.PORT) || 3001,
  env: process.env.NODE_ENV || "development",
  encryptionKey: process.env.ENCRYPTION_KEY || "7f36c5642135f4a65be344070ecd9441201514a4df984f4e06e489833b60f33d"
};
