CREATE TABLE `subvolume_config` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`server_uid` text NOT NULL,
	`subvol_path` text NOT NULL,
	`snapshot_interval_seconds` integer DEFAULT 3600 NOT NULL,
	`is_enabled` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`server_uid`) REFERENCES `remote_servers`(`uid`) ON UPDATE no action ON DELETE cascade
);
