import { randomUUID } from "crypto";
import { encrypt } from "../utils";
import { RemoteServerRepository } from "../repositories";
import type { CreateNewServerRequest, DeleteServerRequest } from "../dtos";

export class RemoteServerService {
  private repo = new RemoteServerRepository();

  async create(data: CreateNewServerRequest) {
    const uid = randomUUID();

    const server = await this.repo.create({
      ...data,
      uid,
      isPrimary: data.isPrimary ? 1 : 0,
      username: encrypt(data.username),
      password: encrypt(data.password)
    });

    const { username, password, ...sanitized } = server;
    return sanitized;
  }

  async getAll() {
    const servers = await this.repo.findAll();
    return servers.map(({ username, password, ...rest }) => rest);
  }

  delete({ uid }: DeleteServerRequest) {
    return this.repo.delete(uid);
  }
}
