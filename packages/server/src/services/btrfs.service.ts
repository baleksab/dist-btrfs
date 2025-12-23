import { BtrfsSubvolumeSetConfigRequest, BtrfsSubvolumeSetRetentionConfigRequest } from "../dtos";
import { BtrfsRepository } from "../repositories";
import { RemoteServerService } from "./remoteServer.service";
import { schedulerService } from "./scheduler.service";
import { SshService } from "./ssh.service";

export type BtrfsSubvolume = {
  id: number;
  gen: number;
  topLevel: number;
  path: string;
};

export class BtrfsService {
  private remoteServerService = new RemoteServerService();
  private sshService = new SshService();
  private btrfsRepository = new BtrfsRepository();

  async listSubvolumes() {
    const server = await this.remoteServerService.getPrimaryServerUnsanitized();

    const cmd = "sudo btrfs subvolume list /";
    const { stdout, stderr } = await this.sshService.execCommand(server, cmd);

    if (stderr && stderr.trim().length > 0) {
      console.warn("btrfs subvolume list stderr:", stderr);
    }

    const lines = stdout.trim().split("\n");
    const results: BtrfsSubvolume[] = [];

    const regex = /ID\s+(\d+)\s+gen\s+(\d+)\s+top level\s+(\d+)\s+path\s+(.+)/;

    for (const line of lines) {
      const match = line.match(regex);

      if (!match) {
        continue;
      }

      const [, id, gen, topLevel, relPath] = match;

      if (relPath.includes(".snapshots/")) {
        continue;
      }

      const absPath = relPath === "root" ? "/" : "/" + relPath.replace(/^root\//, "");

      results.push({
        id: Number(id),
        gen: Number(gen),
        topLevel: Number(topLevel),
        path: absPath
      });
    }

    return results;
  }

  async findSubvolumeConfig(subvolume: string) {
    const server = await this.remoteServerService.getPrimaryServer();

    const config = await this.btrfsRepository.findConfigBySubvolume(server.uid, subvolume);

    if (!config) {
      return {
        subvolPath: subvolume,
        exists: false
      };
    }

    return {
      ...config,
      exists: true
    };
  }

  async findSubvolumeConfigAll() {
    const server = await this.remoteServerService.getPrimaryServer();
    const configs = await this.btrfsRepository.findAllConfigs(server.uid);

    return configs;
  }

  async setSubvolumeConfig(subvolume: string, data: BtrfsSubvolumeSetConfigRequest) {
    const server = await this.remoteServerService.getPrimaryServer();

    const sanitizedConfig = {
      ...data,
      isEnabled: data.isEnabled ? 1 : 0,
      subvolPath: subvolume,
      serverUid: server.uid
    };

    const config = await this.btrfsRepository.setConfig(sanitizedConfig);

    schedulerService.unschedule(server.uid, subvolume);

    if (config.isEnabled) {
      schedulerService.schedule(server.uid, subvolume, config.snapshotIntervalSeconds);
    }

    return config;
  }

  async setSubvolumeRetentionConfig(
    subvolume: string,
    data: BtrfsSubvolumeSetRetentionConfigRequest
  ) {
    const server = await this.remoteServerService.getPrimaryServer();

    const sanitizedConfig = {
      ...data,
      isEnabled: data.isEnabled ? 1 : 0,
      subvolPath: subvolume,
      serverUid: server.uid
    };

    const retentionConfig = await this.btrfsRepository.setRetentionConfig(sanitizedConfig);

    schedulerService.unschedule(server.uid, subvolume, "retention");

    if (retentionConfig.isEnabled) {
      schedulerService.schedule(
        server.uid,
        subvolume,
        retentionConfig.retentionIntervalSeconds,
        "retention",
        { type: retentionConfig.type, keep: retentionConfig.keep }
      );
    }

    return retentionConfig;
  }

  async findSubvolumeRetentionConfigall() {
    const server = await this.remoteServerService.getPrimaryServer();
    const configs = await this.btrfsRepository.findAllRetentionConfigs(server.uid);

    return configs;
  }

  async findSubvolumeRetentionConfig(subvolume: string) {
    const server = await this.remoteServerService.getPrimaryServer();

    const retentionConfig = await this.btrfsRepository.findRetentionConfigBySubvolume(
      server.uid,
      subvolume
    );

    if (!retentionConfig) {
      return {
        subvolPath: subvolume,
        exists: false
      };
    }

    return {
      ...retentionConfig,
      exists: true
    };
  }
}
