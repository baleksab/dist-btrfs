import { randomUUID } from "crypto";
import { encrypt } from "../utils";
import {
  createNewServer as createNewServerRepository,
  getAllServers as getAllServersRepository
} from "../repositories";
import type { CreateNewServerRequest } from "../dtos";

export const createNewServer = async (data: CreateNewServerRequest) => {
  const uid = randomUUID();

  const server = await createNewServerRepository({
    ...data,
    uid,
    isPrimary: data.isPrimary ? 1 : 0,
    username: encrypt(data.username),
    password: encrypt(data.password)
  });

  const { username, password, ...sanitizedServer } = server;

  return sanitizedServer;
};

export const getAllServers = async () => {
  const servers = await getAllServersRepository();

  const sanitizedServers = servers.map(
    ({ username, password, ...sanitizedServer }) => sanitizedServer
  );

  return sanitizedServers;
};
