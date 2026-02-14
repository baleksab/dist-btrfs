GUI guide
===============

On this section you will learn how to use the graphical user interface of dist-btrfs in detail.

Page structure
--------------------------------

The GUI is structed this way:

* Servers page - add, manage and delete remote servers.
* Snapshots page - manage snapshots under a subvolume, create, restore, and delete them or do cleanup in general
* Automation page - split into two tabs, snapshots tab where u set policies for automatic snapshoting and retention tab where u set retention policies for automatic cleanups
* Remote replication page - split into two tabs, full tab where u can do full replication and incremental tab where u can send incremental snapshots to secondary servers
* Monitoring and reporting page - provides monitoring on snapshot statuses, metrics on system and subvolume levels 

Quality of life features
--------------------------------

dist-btrfs supports different locales (English, Serbian, Chinese and Russian) and has a light and dark theme.


Both the locale and theme selector can be found in the bottom left corner inside of the navbar.

**Light theme**

.. image:: /_static/gui-guide/pic1.png

**Dark theme**

.. image:: /_static/gui-guide/pic2.png

**Chinese localization**

.. image:: /_static/gui-guide/pic3.png


Pages
--------------------------------

.. toctree::
  :maxdepth: 2

  servers-page
  snapshots-page
  automation-page
  remote-replication-page