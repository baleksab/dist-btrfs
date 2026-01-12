import { BtrfsSubvolumeSetConfigRequest, BtrfsSubvolumeSetRetentionConfigRequest } from "../dtos";
import { BtrfsRepository } from "../repositories";
import { parseBytes } from "../utils";
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

  async listSubvolumes(serverUid?: string) {
    const server = serverUid
      ? await this.remoteServerService.getServerUnsanitized(serverUid)
      : await this.remoteServerService.getPrimaryServerUnsanitized();

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

      if (absPath === "/" || absPath === "/home") {
        continue;
      }

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

  async checkIfSubvolumeExists(path: string, serverUid?: string) {
    const subvolumes = await this.listSubvolumes(serverUid);

    return subvolumes.some((subvolume) => subvolume.path === path);
  }

  async getStorageMetrics(serverUid?: string) {
    const server = serverUid
      ? await this.remoteServerService.getServerUnsanitized(serverUid)
      : await this.remoteServerService.getPrimaryServerUnsanitized();

    const cmd = "sudo btrfs filesystem usage /";
    const { stdout, stderr } = await this.sshService.execCommand(server, cmd);

    if (stderr && stderr.trim().length > 0) {
      console.warn("btrfs filesystem usage stderr:", stderr);
    }

    const getOverallValue = (label: string) => {
      const regex = new RegExp(`${label}:\\s*(\\d+(?:\\.\\d+)?)\\s*(TiB|GiB|MiB|KiB|B)`);
      const match = stdout.match(regex);
      if (!match) {
        return 0;
      }

      const [, value, unit] = match;
      return Math.round(parseBytes(Number(value), unit));
    };

    const parseSection = (name: string) => {
      const regex = new RegExp(
        `${name}[^\\n]*Size:\\s*(\\d+(?:\\.\\d+)?)\\s*(TiB|GiB|MiB|KiB|B),\\s*Used:\\s*(\\d+(?:\\.\\d+)?)\\s*(TiB|GiB|MiB|KiB|B)`
      );

      const match = stdout.match(regex);
      if (!match) {
        return { total: 0, used: 0 };
      }

      const [, totalVal, totalUnit, usedVal, usedUnit] = match;

      return {
        total: Math.round(parseBytes(Number(totalVal), totalUnit)),
        used: Math.round(parseBytes(Number(usedVal), usedUnit))
      };
    };

    const totalBytes = getOverallValue("Device size");
    const usedBytes = getOverallValue("Used");
    const freeBytes = totalBytes - usedBytes;
    const data = parseSection("Data");
    const metadata = parseSection("Metadata");
    const system = parseSection("System");

    return {
      totalBytes,
      usedBytes,
      freeBytes,
      data,
      metadata,
      system,
      chart: [
        { name: "Data", value: data.used, color: "blue" },
        { name: "Metadata", value: metadata.used, color: "orange" },
        { name: "System", value: system.used, color: "red" },
        { name: "Free", value: freeBytes, color: "green" }
      ]
    };
  }

  async getSubvolumeDetailedMetrics(subvolumePath: string, serverUid?: string) {
    const server = serverUid
      ? await this.remoteServerService.getServerUnsanitized(serverUid)
      : await this.remoteServerService.getPrimaryServerUnsanitized();

    await this.ensureQgroupsEnabled(server);

    const fs = await this.getStorageMetrics(serverUid);

    const qCmd = "sudo btrfs qgroup show /";
    const { stdout, stderr } = await this.sshService.execCommand(server, qCmd);

    if (stderr && stderr.trim()) {
      console.warn("qgroup stderr:", stderr);
    }

    const parseSize = (raw: string): number => {
      const match = raw.match(/^([\d.]+)(KiB|MiB|GiB|TiB|B)$/);
      if (!match) {
        return 0;
      }
      const value = Number(match[1]);
      const unit = match[2];
      switch (unit) {
        case "TiB":
          return value * 1024 ** 4;
        case "GiB":
          return value * 1024 ** 3;
        case "MiB":
          return value * 1024 ** 2;
        case "KiB":
          return value * 1024;
        case "B":
        default:
          return value;
      }
    };

    const normalizePath = (p: string) => {
      if (p === "<toplevel>") {
        return "/";
      }
      if (p === "root") {
        return "/";
      }
      if (p.startsWith("root/")) {
        return "/" + p.slice("root/".length);
      }
      return "/" + p;
    };

    const extractName = (path: string) => path.split("/").pop() || path;

    const extractTimestamp = (name: string) => {
      const match = name.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/);
      return match ? new Date(match[0]).toISOString() : null;
    };

    const lines = stdout
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .slice(2);

    const entries = lines.map((line) => {
      const parts = line.split(/\s+/);
      const referenced = parseSize(parts[1]);
      const exclusive = parseSize(parts[2]);
      const rawPath = parts.slice(3).join(" ");
      const path = normalizePath(rawPath);
      return { path, referenced, exclusive };
    });

    const normalizedSubvol = normalizePath(
      subvolumePath.startsWith("/") ? subvolumePath.slice(1) : subvolumePath
    );

    const subvol = entries.find((e) => e.path === normalizedSubvol);

    const snapshotPrefix = `/.snapshots${normalizedSubvol}/`;

    const snapshotEntries = entries.filter(
      (e) =>
        e.path.startsWith(snapshotPrefix) &&
        /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(e.path)
    );

    const snapshots = snapshotEntries.map((snap) => {
      const name = extractName(snap.path);
      return {
        path: snap.path,
        name,
        timestamp: extractTimestamp(name),
        referencedBytes: snap.referenced,
        exclusiveBytes: snap.exclusive,
        efficiency: snap.referenced > 0 ? Number((snap.exclusive / snap.referenced).toFixed(6)) : 0
      };
    });

    if (!subvol) {
      return {
        filesystem: {
          totalBytes: fs.totalBytes,
          usedBytes: fs.usedBytes,
          freeBytes: fs.freeBytes
        },
        subvolume: null,
        snapshots
      };
    }

    return {
      filesystem: {
        totalBytes: fs.totalBytes,
        usedBytes: fs.usedBytes,
        freeBytes: fs.freeBytes
      },
      subvolume: {
        path: subvol.path,
        name: extractName(subvol.path),
        referencedBytes: subvol.referenced,
        exclusiveBytes: subvol.exclusive,
        snapshotCount: snapshots.length,
        totalSnapshotExclusiveBytes: snapshots.reduce((sum, s) => sum + s.exclusiveBytes, 0)
      },
      snapshots: snapshots.sort(
        (a, b) =>
          (a.timestamp ? new Date(a.timestamp).getTime() : 0) -
          (b.timestamp ? new Date(b.timestamp).getTime() : 0)
      )
    };
  }

  private async ensureQgroupsEnabled(server: any) {
    const checkCmd = "sudo btrfs qgroup show /";
    const { stdout, stderr } = await this.sshService.execCommand(server, checkCmd);

    if (stderr?.includes("quotas not enabled") || stdout.includes("quotas not enabled")) {
      console.warn("Qgroups disabled, enabling quotas...");

      const enableCmd = "sudo btrfs quota enable /";
      await this.sshService.execCommand(server, enableCmd);

      await new Promise((r) => setTimeout(r, 500));
    }
  }
}
