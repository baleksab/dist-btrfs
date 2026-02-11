Installation steps
==============================

On this page you will find out how to install dist-btrfs on your local machine.

Requirements
----------------

Before starting, please make sure that you meet all of the :doc:`requirements`

Development mode
----------------

**Step 1: Cloning the repository**

Clone the dist-btrfs repository to your local machine:

.. code-block:: bash

   git clone https://github.com/baleksab/dist-btrfs.git
   cd dist-btrfs

**Step 2: Installing the dependencies**

Install all of dist-btrfs dependencies:

.. code-block:: bash

   pnpm install

This will set up the dependencies for both workspaces, the server and gui workspace.

**Step 3: Generate the database**

The server part uses sqlite for storing persistance.
First step would be initializing the database by running these commands.

.. code-block:: bash

   cd packages/server
   pnpm db:generate
   pnpm db:migrate

Expected output for ``db:generate``

.. code-block:: none

   ✔ Generated Drizzle ORM client

Expected output for ``db:migrate``

.. code-block:: none

   ✔ Applied migrations:
     - 0001_create_remote_servers.sql
     - 0002_create_subvolume_configs.sql
     - 0003_create_retention_configs.sql

Your current working directory changed so please be sure to return the project root dir.

.. code-block:: bash

   cd ../..

**Step 4: Configure environment variables**

The server can be configured by setting certain environment variables. You can look at .env.local for an example.
If you wish to proceed with customizing, you can do this:

.. code-block:: bash

   cd packages/server
   cp .env.example .env
   # Edit .env with your preferred settings

**Step 5: Verify installation**

You can verify that everthing works fine by running these two commands

.. code-block:: bash

   pnpm --filter @dist-btrfs/server --help
   pnpm --filter @dist-btrfs/gui --help

**Step 6: Starting dist-btrfs in dev mode**

You should open two terminals. In the first terminal run this command:

.. code-block:: bash

   pnpm dev:server

After the server starts, and if you see these two commands, then it means that the server started successfully.

.. code-block:: none

   [INFO] Server ready at http://localhost:3001
   [INFO] Swagger UI available at http://localhost:3001/swagger

Open the second terminal. Now we are going to start the GUI, so we need to run this command:

.. code-block:: bash

   pnpm dev:gui

If the following things happen, then it means that everything got set up correctly.

- Electron window opens with the dist-btrfs interface
- The GUI automatically connects to the server at ``http://localhost:3001``
- You can also access the web interface at ``http://localhost:5173`` (default Vite port)

.. note::

   GUI is functionally useless without the server running. Make sure that the server is running before starting the GUI.

Testing the installation
--------------------------------

**Testing if the server is running correctly**

You can simply run a curl towards the health endpoint and see if anything is being returned.

.. code-block:: bash

  curl http://localhost:3001/health

If the server is up and running,  you should expect this as the response:

.. code-block:: json

   {
     "status": "ok",
   }

Alternative way would be to open the swagger and see if its up and running. If the page loads and you see all of the endpoints, you are good to go.

You would need to open your browser and go to:

.. code-block:: none

   http://localhost:3000/swagger

**Testing if the GUI is running correctly**

Simply see if the electron app opened and if you see the navigation items on the sidebar.

Alternative would be to check if you can open the UI on your browser.

You would need to open your browser and go to:

.. code-block:: none

   http://localhost:5173/

Conclusion
----------------

By reading this page and following the steps you should have set up the development mode of dist-btrfs and should be able to use it.

Next steps would be to read the quick start, which would be the next page.