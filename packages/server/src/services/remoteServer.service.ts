import { randomUUID } from "crypto";
import { decrypt, encrypt } from "../utils";
import { RemoteServerRepository } from "../repositories";
import type { CreateNewServerRequest, UpdateServerRequest } from "../dtos";
import { SshService } from "./ssh.servce";
import { UpdateRemoteServer } from "../db";

export class RemoteServerService {
  private remoteServerRepository = new RemoteServerRepository();
  private sshService = new SshService();

  async create(data: CreateNewServerRequest) {
    const uid = randomUUID();

    const server = await this.remoteServerRepository.create({
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
    const servers = await this.remoteServerRepository.findAll();
    return servers.map(({ username, password, ...rest }) => rest);
  }

  delete(uid: string) {
    return this.remoteServerRepository.delete(uid);
  }

  async update(uid: string, data: UpdateServerRequest) {
    const payload: UpdateRemoteServer = {
      ...data,
      isPrimary: data.isPrimary ? 1 : 0
    };

    if (data.username) {
      payload.username = encrypt(data.username);
    }

    if (data.password) {
      payload.password = encrypt(data.password);
    }

    const server = await this.remoteServerRepository.update(uid, payload);

    const { username, password, ...sanitized } = server;

    return sanitized;
  }

  async healthCheckAll() {
    const servers = await this.remoteServerRepository.findAll();

    const decryptedServers = servers.map((server) => ({
      ...server,
      username: decrypt(server.username),
      password: decrypt(server.password)
    }));

    return this.sshService.checkAllServers(decryptedServers);
  }

  async getPrimaryServerUnsanitized() {
    const server = await this.remoteServerRepository.findPrimary();

    const decryptedServer = {
      ...server,
      username: decrypt(server.username),
      password: decrypt(server.password)
    };

    return decryptedServer;
  }
}
