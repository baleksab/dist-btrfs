import { CreateNewServerRequest } from "../dtos";
import { createNewServer as createNewServerService } from "../services";
import { Request, Response } from "express";

export const createNewServer = async (
  dto: CreateNewServerRequest,
  _: Request,
  res: Response
) => {
  const server = await createNewServerService(dto);
  return res.status(201).json(server);
};
