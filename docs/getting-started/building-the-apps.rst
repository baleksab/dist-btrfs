Building dist-btrfs
==============================

On this section, you will learn how to build the GUI and the server and how easy it is.

Prerequisites
----------------

This section makes the assumption that you have passed all the reqirements and all of the steps listed in installation steps.

If you haven't please, go back and do everything as told.

Building the GUI
----------------

Run the following command

.. code-block:: bash

  pnpm build:gui

This will build the react code, embed it into electron and then build the electron app using the electron-builder package.

The built application should be available under

``packages/gui/dist``

Really easy and simple.

Depending on your platform, you might get exe/appimage/dmg file.

Building the server
-----------------------

Run the following command

.. code-block:: bash

  pnpm build:server

This will build the server.

The built server should be available under 

``packages/server/dist``

Really easy and simple.

To run the server, you simply ruin the following command

.. code-block:: bash

  node server.mjs