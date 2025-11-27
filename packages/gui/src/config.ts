import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

export const config = {
  serverUrl: process.env.SERVER_URL || ""
};
