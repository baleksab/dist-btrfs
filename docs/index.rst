dist-btrfs
========================

.. image:: https://img.shields.io/badge/version-1.0.0-blue
   :alt: Version 1.0.0

.. image:: https://img.shields.io/badge/license-MIT-green
   :alt: MIT License

Overview
--------

dist-btrfs is a typescript based system that provides centralized management of btrfs snapshots and replication across distributed networks. For the backend, express was used while for the frontend react was used wrapped with electron to provide a multi-platform application, enabling both manual and automated snapshot management with flexible retention policies.

**Key Features:**

- **Centralized management**: Add multiple remote servers and control them from one interface
- **Automated snapshots**: Schedule snapshots with customizable retention policies (daily, weekly, monthly)
- **Incremental replication**: Efficiently replicate only the changes between two snapshots to remote servers
- **Full replication**: Fully replicate snapshots to remote servers
- **Monitoring in real time**: Track storage usage, subvolume metrics, and system health
- **Secure connection**: All remote operations use SSH
- **Intuitive and user friendly interface**: Intuitive react based frontend wrapped by electron
- **RESTful API**: Complete API for integration and automation

Quick Start
-----------

Here is how to get started with dist-btrfs:

.. code-block:: bash

   # Install dependencies
   pnpm install

   # Set up the database
   pnpm --filter @dist-btrfs/server db:generate
   pnpm --filter @dist-btrfs/server db:migrate

   # Start the server
   pnpm dev:server

   # Start the GUI
   pnpm dev:gui


.. toctree::
   :maxdepth: 4
   :caption: Getting started

   introduction/index
   getting-started/index

.. toctree::
   :maxdepth: 4
   :caption: Guides

   gui-guide/index
   api-guide/index

.. toctree::
   :maxdepth: 4
   :caption: Technical documentation

   architecture/index
   api-specification/index
