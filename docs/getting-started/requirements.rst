Requirements
===============

On this page you will found about the system and software requirements for running dist-btrfs.

Platforms and dependencies
--------------------------------

Supported platforms:

- **Linux**: Any modern distribution (Ubuntu 20.04+, Fedora 35+, Debian 11+, etc.)
- **macOS**: macOS 11 (Big Sur) or later
- **Windows**: Windows 10/11 (64-bit)

Dependencies:

**Node.js**
   Version 24 or later is required.

   .. code-block:: bash

      # Check Node.js version
      node --version

   Download from `nodejs.org <https://nodejs.org/>`_ if needed.

**pnpm**
   Version 10 or later is required.

   .. code-block:: bash

      # Check pnpm version
      pnpm --version

      # Install pnpm if not present
      npm install -g pnpm

   See `pnpm.io <https://pnpm.io/installation>`_ for alternative installation methods.

Client requirements
------------------------

Client servers (primary/secondary) must meet these requirements:

**Operating system must be a Linux distro**

- **Linux** with kernel 4.14+ (for stable btrfs support)
- Recommended distributions: Ubuntu 20.04+, Debian 11+, RHEL/Rocky/Alma 8+, Fedora 35+, SUSE Linux Enterprise 15+

**Filesystem**

- Btrfs filesystem with existing subvolumes
- Sufficient free space for snapshots

dist-btrfs does not create or configure btrfs filesystems. Subvolumes must already exist on the remote servers.

.. note::

   To check if a filesystem is btrfs:

   .. code-block:: bash

      df -T /mnt/data
      # Should show "btrfs" in type column

In case btrfs is not installed, you can do the following:

.. code-block:: bash

   # Ubuntu/Debian
   sudo apt install btrfs-progs

   # Fedora/RHEL
   sudo dnf install btrfs-progs

   # SUSE
   sudo zypper install btrfsprogs

To verify installation:

.. code-block:: bash

   btrfs --version


**Network requirements**

- Must have SSH installed
- Firewall rules must allow SSH connections
- Stable internet connection

.. code-block:: bash

   # Check if SSH is running
   sudo systemctl status sshd

   # Enable SSH if not running (Ubuntu/Debian)
   sudo systemctl enable --now ssh

   # Enable SSH if not running (Fedora/RHEL)
   sudo systemctl enable --now sshd

**User account and permissions**

The remote server must have an user with these permissions.

- ``/usr/bin/btrfs``
- ``/usr/bin/mkdir``
- ``/usr/bin/mv``

Configuration is done via ``visudo``:

.. code-block:: bash

   username ALL=(root) NOPASSWD:/usr/bin/btrfs
   username ALL=(root) NOPASSWD:/usr/bin/mkdir
   username ALL=(root) NOPASSWD:/usr/bin/mv

Please replace username with the users actual username.

.. warning::

   These sudo permissions are required for dist-btrfs to work. Without them, dist-btrfs will not work correctly.

Conclusion
----------------

Please make sure the following:

- ✓ Machine where dist-btrfs is running has node 24+ and pnpm 10+
- ✓ Remote servers are running linux with btrfs
- ✓ ``btrfs-progs`` is installed on all remote servers
- ✓ SSH server is running on all remote servers
- ✓ User accounts have required sudo permissions
- ✓ Network connectivity between management server and remote servers
- ✓ Sufficient storage space for snapshots and replication