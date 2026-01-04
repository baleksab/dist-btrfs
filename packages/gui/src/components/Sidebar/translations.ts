import { defineMessages } from "react-intl";

export const translations = defineMessages({
  sidebarTitle: {
    id: "components.sidebar.title",
    defaultMessage: "dist-btrfs"
  },
  serversNavItem: {
    id: "components.sidebar.navItem.servers",
    defaultMessage: "Servers"
  },
  snapshotsNavItem: {
    id: "components.sidebar.navItem.snapshots",
    defaultMessage: "Snapshots"
  },
  configurationNavItem: {
    id: "components.sidebar.navItem.configuration",
    defaultMessage: "Automation"
  },
  remoteReplicationNavItem: {
    id: "components.sidebar.navItem.remoteReplication",
    defaultMessage: "Remote Replication"
  },
  reportsNavItem: {
    id: "components.sidebar.navItem.reportsAndMetrics",
    defaultMessage: "Monitoring & Reporting"
  }
});
