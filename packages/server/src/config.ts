import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

export const config = {
  port: Number(process.env.PORT) || 3001,
  env: process.env.NODE_ENV || "development",
};
