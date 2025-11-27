import { randomUUID } from "crypto";
import { encrypt } from "../utils";
import { createNewServer as createNewServerRepository } from "../repositories";
import type { CreateNewServerRequest } from "../dtos";

export const createNewServer = async (data: CreateNewServerRequest) => {
  const uid = randomUUID();

  const server = await createNewServerRepository({
    ...data,
    uid,
    ipAddress: data.ipAddress,
    username: encrypt(data.username),
    password: encrypt(data.password),
  });

  const { username, password, ...sanitizedServer} = server;

  return sanitizedServer;
};