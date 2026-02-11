About
===============

What is this project about?
----------------------------------------

This project is about providing a snapshot management system built for distributed networks. 
It provides centralized control over snapshot creation, retention and replication across multiple remote servers.
The way it works is by having one primary server and others being remote servers. You are able to create snapshots on the primary server and then replicate those snapshots to secondary servers.

dist-btrfs addresses the issue of operational challenges when it comes to managing btrfs snapshots at scale, especially when it comes to distributed networks.

Problems
----------------
The btrfs cli already by itself allows anyone to manage snapshots on a local machine, and even replicate the snapshots on secondary servers, but there are a lot of challenges that come with this:

**Manual work**
  On remote servers creating snapshots, managing their retention and setting up their replication requires SSH connections and cli operations on each server. This is time consuming and can produce a lot of errors.

**No centralization**
  Without a central management system, administrators must maintain separate scripts and cron jobs on each remote server. This could be extremely difficult to maintain on a large infrastructure. 

**Complex retention policies**
  Implementing complex retention policies (daily, weekly and monthly snapshots) would require custom scripts and careful coordination to avoid data loss.

**Replication challenges**
  By itself, setting up incremental replication using btrfs's cli requires tracking parent snapshots, managing SSH connections and handling errors.

**Visibility**
  Without a central management system, it could be really difficult for admins to track snapshot status, storage usage and replication health on a large infrastructure.

Solutions
----------------
The problems above are solved by dist-btrfs by providing the following:

**Centralized management**
  dist-btrfs provides a single point of control for all remote servers, accessible by both the GUI and the RESTful API. Admins can amange snapshots across the infrastructure without manual SSH connections.

**Automated scheduling**
  dist-btrfs comes with a built in scheduler with configurable retention policies. The system automatically creates snapshots, applies retention rules which are used to automatically clean up old snapshots.

**Optimized replication**
  btrfs's incremental replication is utilized and because of that the system tracks snapshot relationships, and allows the user only to send the snapshot diff to the remote server. This allows more optional transfers saving up on time and bandwidth.

**Replication across multiple remote servers**
  Administrators can replicate a snapshot to multiple remote servers instantly, saving up on time.

**Monitoring**
  The GUI application provides a dashboard with storage metrics, stats for each subvolume and replication health. Administrators gain easy access to metrics.

**Security**
  All remote operations are done through SSH. Usernames and passwords which are used during authentication are stored securily and are encrypted.

Scope
--------
The focus is on:

- Snapshot creation and deletion on the primary server which has btrfs set up.
- Automatic snapshotting on the primary server.
- Automatic retention policy enforcement on the primary server.
- Full replication and incremental replication to secondary servers from the primary server.
- Centralized configuration and monitoring.

The following are not provided:

- btrfs filesystem creation and configuraiton
- server creation and configuration
- cross filesystem replication (btrfs to zfs and vice versa)
- RAID management