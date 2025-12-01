import { Request, Response } from "express";
import { CreateNewServerRequest, UpdateServerRequest } from "../dtos";
import { RemoteServerService } from "../services";

export class RemoteServerController {
  private service = new RemoteServerService();

  async create(dto: CreateNewServerRequest, _req: Request, res: Response) {
    const server = await this.service.create(dto);

    return res.status(200).json(server);
  }

  async getAll(_dto: unknown, _req: Request, res: Response) {
    const servers = await this.service.getAll();

    return res.status(200).json(servers);
  }

  async delete(_dto: unknown, req: Request) {
    const uid = req.params.uid;
    await this.service.delete(uid);
  }

  async update(dto: UpdateServerRequest, req: Request, res: Response) {
    const uid = req.params.uid;
    const response = await this.service.update(uid, dto);

    return res.status(200).json(response);
  }

  async healthCheckAll(_dto: unknown, _req: unknown, res: Response) {
    const response = await this.service.healthCheckAll();

    return res.status(200).json(response);
  }
}
