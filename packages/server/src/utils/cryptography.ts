import crypto from "crypto";
import { config } from "../config";

const ALGO = "aes-256-gcm";
const KEY = Buffer.from(config.encryptionKey, "hex");

export const encrypt = (text: string) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGO, KEY, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  const tag = cipher.getAuthTag().toString("hex");

  return `${iv.toString("hex")}:${tag}:${encrypted}`;
};

export const decrypt = (text: string) => {
  const [ivHex, tagHex, encData] = text.split(":");

  const iv = Buffer.from(ivHex, "hex");
  const tag = Buffer.from(tagHex, "hex");

  const decipher = crypto.createDecipheriv(ALGO, KEY, iv);
  decipher.setAuthTag(tag);

  let decrypted = decipher.update(encData, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};
