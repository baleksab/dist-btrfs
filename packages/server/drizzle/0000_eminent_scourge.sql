CREATE TABLE `containers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`image` text NOT NULL,
	`is_enabled` integer DEFAULT 1 NOT NULL,
	`is_primary` integer DEFAULT 0 NOT NULL,
	`btrfs_volume_path` text,
	`deleted_at` integer,
	`created_at` integer DEFAULT (strftime('%s','now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%s','now')) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `containers_name_unique` ON `containers` (`name`);