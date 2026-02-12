Technical information
==============================

In this chapter we are going to talk about the technologies and concepts behind dist-btrfs


Btrfs filesystem
------------------------

Btrfs is a modern filesystem for Linux that utilizes copy-on-write (CoW) mechanics with which it provides advanced features including snapshots, subvolumes, compression and built-in RAID support. It was designed with in mind to address scalability and reliability requirements for large storage systems.

**Key characteristics:**

* **Copy on write** - modified data ios written to new locations rather than overwriting existing data, enabling efficient snapshots.
* **Checksumming** - all data and metadata are checksummed to detect corruption
* **Compression** - transparent compression support
* **Subvolumes** - independent file trees within a single filesystem

**Subvolumes**

A btrfs subvolume is an independently mounted file tree within the btrfs filesystem. Subvolumes can be nested as serve as the basis for snapshots.

.. code-block:: bash

   # Create a subvolume
   sudo btrfs subvolume create /mnt/data/mysubvolume

   # List subvolumes
   sudo btrfs subvolume list /mnt/data

   # Delete a subvolume
   sudo btrfs subvolume delete /mnt/data/mysubvolume

They are the fundamental unit of organization in btrfs. Each subvolume has its own snapshots, quota and mount options.

**Snapshots**

A btrfs snapshot is a read-write or read-only copy of a subvolume at a specific time point. Because of btrf's copy on write characteristic the snapshots get created instantly and initially consume no space.

.. code-block:: bash

   # Create a read-only snapshot
   sudo btrfs subvolume snapshot -r /mnt/data/mysubvolume /mnt/snapshots/mysubvolume-2026-01-30

   # Create a read-write snapshot
   sudo btrfs subvolume snapshot /mnt/data/mysubvolume /mnt/snapshots/mysubvolume-rw

Characteristics of snapshots:

* **Instant creation**: snapshots instantly get created, regardless of subvolume size.
* **Space efficiency**: only changed blocks consume additional space.
* **Independent management**: snapshots can be deleted without affecting the source subvolume.

**Snapshot replication**

Btrfs allows the replication of snapshots on remote servers by using the btrfs send/receive cli commands. This is how btrfs enables efficient transfer and enables backup of snapshots.

.. code-block:: bash

   # Create a read-only snapshot
   sudo btrfs subvolume snapshot -r /mnt/data/mysubvolume /mnt/snapshots/mysubvolume-2026-01-30

   # Create a read-write snapshot
   sudo btrfs subvolume snapshot /mnt/data/mysubvolume /mnt/snapshots/mysubvolume-rw

**Full replication scenario**

1. Create read-only snapshot of source subvolume
2. Use ``btrfs send`` to serialize snapshot data
3. Transfer serialized data over network (typically via SSH)
4. Use ``btrfs receive`` to materialize snapshot on destination

**Incremental replication scenario**

Incremental replication tranfers only the diff between two snapshots. This requires:

- A parent snapshot that exists on both source and destination
- A newer snapshot to send
- The ``-p`` flag to specify the base snapshot

Limitations would be:

- Both the primary and the seconadry server must use btrfs
- Snapshots must be read-only for sending
- Parent snapshots must exist on both sides for incremental sends

Distributed system concept
----------------------------------------

dist-btrfs uses a client server architecture where we have:

* **API server**: centralized management service that orchestrates operations across remote servers
* **GUI**: crossplatform desktop application that interacts with the API server
* **Clients**: remote btrfs servers that execute snapshot and replication operations. One of the clients is classified as primary, while the others are classified as secondary.

**Communication with clients**

Communication with clients is done through SSH (Secure Shell). SSH is used to execute commands on remote servers and it provides:

* **Authentication**
* **Encryption** - all communication is encrypted
* **Standard protocol** - SSH is widely supported across most if not all Linux distributions

**Communication with the API server**

Communication with the API server is done by exposing a RESTful API that follows the following HTTP conventions: 

- **GET**: Retrieve resources (servers, snapshots, configurations)
- **POST**: Create new resources
- **PUT/PATCH**: Update existing resources
- **DELETE**: Remove resources

The API design follows REST principles:

- Resources are identified by URIs
- Standard HTTP status codes indicate success or failure
- JSON is used for request and response bodies
 
**Express API server**

The API server is implemented with Express and exposes a JSON REST API. Key implementation details:

- **Router mounting**: all routes are registered via a shared `router` and mounted under the `/api` prefix.
- **Middleware**: the server enables `express.json()` for JSON body parsing and `cors()` for cross-origin requests.
- **Validation & OpenAPI**: routes are defined with Zod schemas using a `createRoute()` utility; the same schemas are used to generate an OpenAPI document with `zod-to-openapi`.
- **Swagger UI**: the generated OpenAPI spec is served with `swagger-ui-express` at `/swagger` and the raw JSON at `/specifications`.
- **Health & diagnostics**: a simple health endpoint is exposed at `/health`.
- **Startup flow**: on startup the server runs `preflight` platform checks, restores scheduled snapshot/retention jobs via the scheduler service, then listens on the configured port.
- **Configuration & scripts**: runtime options (port, env, encryption key) are read from `.env.local` or environment variables. Useful scripts in `packages/server/package.json` include `preflight`, `serve` and `dev` for local development.

**Persistence**

The API server uses SQlite for persistance of configuration data of the remote servers:

The system uses SQLite for local persistence of configuration data:

- **Remote Servers**: connection details and credentials
- **Subvolume Configurations**: snapshot schedules and retention policies
  
SQLite provides:

- **Embedded database**: no separate database server required
- **ACID**: reliable transaction support
- **Simple deployment**: single-file database for easy backup
- **Perforamance**: sufficient for configuration data and metadata

Security considerations

dist-btrfs makes sure that only the needed permissions are required:

* SSH access uses a dedicated user account (not root)
* sudo is configured for commands only
* no shell access or unrestricted sudo privileges are required

SSH credentials are stored securily:

* username and passwords are encrypted
* appropriate file permissions are set
* there are no credentials in the source code or configuration filesystem

**Network security**

All remote operations are done only using encrypted SSH connections. There are no plaintext protocols used for authentication or data transfer.

Conclusion
----------------

By reading this page you should have a basic understanding of btrfs, its subvolumes and snapshots and the distributed concepts btrfs relies on. dist-btrfs builds on these concepts and they are essential for effective usage and deployage of dist-btrfs.

If you wish to learn more, you could check out the following links:

- `Btrfs Wiki <https://btrfs.wiki.kernel.org/>`_
- `Btrfs Documentation <https://btrfs.readthedocs.io/>`_
- `OpenSSH Documentation <https://www.openssh.com/manual.html>`_
- `RESTful API Design Best Practices <https://restfulapi.net/>`_
