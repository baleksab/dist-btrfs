CREATE TABLE `remote_servers` (
	`uid` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`ip_address` text NOT NULL,
	`port` integer DEFAULT 22,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`is_primary` integer DEFAULT 0 NOT NULL
);
