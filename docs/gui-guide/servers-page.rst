Servers page
===============

The servers page is the page where you can add your remote servers, manage them and see their status.

The look of the page
--------------------------------

This is how the page would look like when it is empty.

.. image:: /_static/gui-guide/pic1.png

Adding your first remote server
--------------------------------

To add your first remote server, you need to click on the add server button in the upper right corner.

After clicking it, you should see a modal open where you need to add the details of the server. By default the ip address is set as localhost.

.. image:: /_static/gui-guide/pic4.png

There is a verify button where after you enter the ip address, port, username and password that gets enabled and allows you to check if a connection could be established to the server. Even if the connection does not get established, you could add the server.

**Example of verifying connection to a remote server**

.. image:: /_static/gui-guide/pic5.png

You can also chose if a server is gonna be primary or not. If its not primary, then its gonna be secondary. Primary is the one where you create snapshots and set auto snapshot and retention policies.

Now, let me add a primary remote server and show you the state of the page.

.. image:: /_static/gui-guide/pic6.png

You can notice that it appears on the servers page. We see its details, such as ip address,  port, its status (online/offline) and if its primary or secondary. There is also the ability to edit the details of a server or delete them. You can not delete the primary server, but you can switch a secondary to become a primary.

**Example of editing a server**

.. image:: /_static/gui-guide/pic7.png

Adding a secondary server
--------------------------------

The setup is the same as the primary server, you just dont check the primary button in the modal.

**Example of servers page with one primary and one secondary server**

.. image:: /_static/gui-guide/pic8.png

**Example of servers page with one primary and one secondary and one invalid server**

.. image:: /_static/gui-guide/pic9.png

Overview
--------------------------------

As you can see, this page is primarily set to have an overview and have the ability to manage your servers, which is much easier than using the API directly.