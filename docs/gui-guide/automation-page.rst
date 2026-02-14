Automation page
===============

The automation page is the page where you can set scheduled jobs to run. There are two types of schedules job, automatic snapshoting and automatic cleanups based on the retention policies.

The page itself is split into two tabs:

* Snapshots
* Retention

We will first look into the snapshots tab.

The look of the snapshots tab
--------------------------------

This is how the snapshots tab would look like when it is empty.

.. image:: /_static/gui-guide/pic19.png

You can see here that the tab is split into two parts. The first part shows the automatic snapshot policy section, where you can choose a subvolume from the primary server and set the snapshot interval and whether the policy should be enabled or not.

The other section shows the configured automatic snapshot policies. Here you can see in tabular view if a subvolume has a configured snapshot policy and its details.

Adding your first automatic snapshot policy
----------------------------------------------------------------

We just need to select a subvolume from the subvolume selector, then we need to choose the snapshot interval (in seconds) and then we can choose if we want it to be enabled or disabled.

The policy does not need to be enabled in order to get added.

.. image:: /_static/gui-guide/pic20.png

We will click save.

Viewing your snapshot policies
----------------------------------------------------------------

All of the listed snapshot policies should appear in the table at the bottom of the page.

.. image:: /_static/gui-guide/pic21.png

As you can see, there can only be one snapshot policy per subvolume.

The look of the retention tab
--------------------------------

This is how the retention tab looks like when it is empty.

.. image:: /_static/gui-guide/pic22.png

The layout of the retention tab is pretty much the same as of the snapshots tab.

In the first section of this tab you have options for configuring the retention policy for a specific subvolume of the primary server.

The next part looks really similar to the cleanup modal from the snapshots page. We need to choose the cleanup type. The cleanup type can be:

* **Daily** - would mean grouping snapshots on daily level, and keeping only n latest snapshots.
* **Weekly** - would mean grouping snapshots on weekly level, and keeping only n latest snapshots.
* **Monthly** - would mean grouping snapshots on monthly level, and keeping only n latest snapshots.

Then you need to choose the number of snapshots to keep, and the retention interval.

Adding your first retention policy
---------------------------------------

We just need to select a subvolume from the subvolume selector, then we need to choose the retention interval (in seconds), number of snapshots to keep and the cleanup type.

We do not need to turn on the retention policy instantly.

.. image:: /_static/gui-guide/pic23.png

We will click save.

Viewing your retention policies
----------------------------------------------------------------

All of the listed retention policies should appear in the table at the bottom of the page.

.. image:: /_static/gui-guide/pic24.png

As you can see, there can only be one retention policy per subvolume.

Overview
----------------------------------------------------------------

Configuring automatic snapshotting policies alongside the retention policies is pretty easy via the GUI. If you have followed this page closely, you shouldn't have any issues.