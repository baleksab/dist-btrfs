import cron, { ScheduledTask } from "node-cron";
import { SnapshotsService } from "./snapshots.service";

type JobKey = string;

class SchedulerService {
  private jobs = new Map<JobKey, ScheduledTask>();
  private snapshotsService = new SnapshotsService();
  private running = new Set<string>();

  private makeKey(serverUid: string, subvolPath: string): JobKey {
    return `${serverUid}:${subvolPath}`;
  }

  schedule(serverUid: string, subvolPath: string, intervalSeconds: number) {
    const key = this.makeKey(serverUid, subvolPath);
    console.log(`[scheduler] scheduling job ${key} every ${intervalSeconds}s`);

    this.unschedule(serverUid, subvolPath);

    const seconds = Math.max(1, intervalSeconds);
    const cronExpr = `*/${seconds} * * * * *`;

    console.log(`[scheduler] cron expression for ${key}: ${cronExpr}`);

    const task = cron.schedule(cronExpr, async () => {
      console.log(`[scheduler] trigger job ${key}`);
      await this.runSnapshot(serverUid, subvolPath);
    });

    this.jobs.set(key, task);

    console.log(`[scheduler] job ${key} successfully scheduled`);
  }

  unschedule(serverUid: string, subvolPath: string) {
    const key = this.makeKey(serverUid, subvolPath);
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

  async restoreFromDb(
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

    console.log(`[scheduler] restore completed`);
  }
}

export const schedulerService = new SchedulerService();
