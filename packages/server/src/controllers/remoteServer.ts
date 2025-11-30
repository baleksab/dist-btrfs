import { CreateNewServerRequest } from "../dtos";
import {
  createNewServer as createNewServerService,
  getAllServers as getAllServersService
} from "../services";
import { Request, Response } from "express";

export const createNewServer = async (dto: CreateNewServerRequest, _: Request, res: Response) => {
  const server = await createNewServerService(dto);

  return res.status(200).json(server);
};

export const getAllServers = async (_1: never, _2: Request, res: Response) => {
  const servers = await getAllServersService();

  return res.status(200).json(servers);
};
