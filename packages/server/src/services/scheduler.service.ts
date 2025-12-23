import cron, { ScheduledTask } from "node-cron";
import { SnapshotsService } from "./snapshots.service";

class SchedulerService {
  private jobs = new Map<string, ScheduledTask>();
  private snapshotsService = new SnapshotsService();
  private running = new Set<string>();

  private makeKey(
    serverUid: string,
    subvolPath: string,
    type: "snapshot" | "retention" = "snapshot"
  ) {
    return `${serverUid}:${subvolPath}:${type}`;
  }

  schedule(
    serverUid: string,
    subvolPath: string,
    intervalSeconds: number,
    type: "snapshot" | "retention" = "snapshot",
    retentionOptions?: { type: "daily" | "weekly" | "monthly"; keep: number }
  ) {
    const key = this.makeKey(serverUid, subvolPath, type);
    console.log(`[scheduler] scheduling ${type} job ${key} every ${intervalSeconds}s`);

    this.unschedule(serverUid, subvolPath, type);

    const seconds = Math.max(1, intervalSeconds);
    const cronExpr = `*/${seconds} * * * * *`;

    console.log(`[scheduler] cron expression for ${key}: ${cronExpr}`);

    const task = cron.schedule(cronExpr, async () => {
      console.log(`[scheduler] trigger ${type} job ${key}`);

      if (type === "snapshot") {
        await this.runSnapshot(serverUid, subvolPath);
      } else {
        if (!retentionOptions) {
          console.error(`[scheduler] retentionOptions missing for ${key}, skipping`);
          return;
        }

        await this.runRetention(serverUid, subvolPath, retentionOptions);
      }
    });

    this.jobs.set(key, task);

    console.log(`[scheduler] ${type} job ${key} successfully scheduled`);
  }

  unschedule(serverUid: string, subvolPath: string, type: "snapshot" | "retention" = "snapshot") {
    const key = this.makeKey(serverUid, subvolPath, type);
    const task = this.jobs.get(key);

    if (task) {
      console.log(`[scheduler] unscheduling job ${key}`);
      task.stop();
      this.jobs.delete(key);
    }
  }

  async runSnapshot(serverUid: string, subvolPath: string) {
    const key = this.makeKey(serverUid, subvolPath);

    if (this.running.has(key)) {
      console.log(`[scheduler] job ${key} is already running, skipping`);
      return;
    }

    this.running.add(key);
    console.log(`[scheduler] starting snapshot for ${key}`);

    try {
      await this.snapshotsService.createSnapshot(subvolPath);
      console.log(`[scheduler] snapshot finished for ${key}`);
    } catch (err) {
      console.error(`[scheduler] snapshot failed for ${key}`, err);
    } finally {
      this.running.delete(key);
    }
  }

  async runRetention(
    serverUid: string,
    subvolPath: string,
    options: { type: "daily" | "weekly" | "monthly"; keep: number }
  ) {
    const key = this.makeKey(serverUid, subvolPath, "retention");

    if (this.running.has(key)) {
      console.log(`[scheduler] job ${key} is already running, skipping`);
      return;
    }

    this.running.add(key);
    console.log(`[scheduler] starting retention for ${key}`);

    try {
      await this.snapshotsService.cleanupSnapshots(subvolPath, options);
      console.log(`[scheduler] retention finished for ${key}`);
    } catch (err) {
      console.error(`[scheduler] retention failed for ${key}`, err);
    } finally {
      this.running.delete(key);
    }
  }

  async restoreSnapshotScheduling(
    configs: {
      serverUid: string;
      subvolPath: string;
      snapshotIntervalSeconds: number;
      isEnabled: boolean;
    }[]
  ) {
    for (const cfg of configs) {
      if (cfg.isEnabled) {
        console.log(`[scheduler] restoring job ${cfg.serverUid}:${cfg.subvolPath}`);
        this.schedule(cfg.serverUid, cfg.subvolPath, cfg.snapshotIntervalSeconds);
      }
    }

    console.log(`[scheduler] snapshot scheduling restoration completed`);
  }

  async restoreRetentionScheduling(
    configs: {
      serverUid: string;
      subvolPath: string;
      retentionIntervalSeconds: number;
      isEnabled: boolean;
      type: "daily" | "weekly" | "monthly";
      keep: number;
    }[]
  ) {
    for (const cfg of configs) {
      if (cfg.isEnabled) {
        console.log(`[scheduler] restoring job ${cfg.serverUid}:${cfg.subvolPath}`);
        this.schedule(cfg.serverUid, cfg.subvolPath, cfg.retentionIntervalSeconds, "retention", {
          type: cfg.type,
          keep: cfg.keep
        });
      }
    }

    console.log(`[scheduler] retention scheduling restoration completed`);
  }
}

export const schedulerService = new SchedulerService();
