import { defineMessages } from "react-intl";

export const translations = defineMessages({
  subvolumeHealth: {
    id: "components.incrementalReplicationForm.subvolumeHealth",
    defaultMessage: "Checking if {subvolume} exists on the primary server"
  },
  subvolumeHealthFail: {
    id: "components.incrementalReplicationForm.subvolumeHealthFail",
    defaultMessage: "{subvolume} does not exist on  the primary server!"
  },
  noSnapshots: {
    id: "components.incrementalReplicationForm.noSnapshots",
    defaultMessage:
      "This subvolume has no snapshots. Please do a <nav>full replication</nav> first."
  },
  noSubvolumes: {
    id: "components.incrementalReplicationForm.noSubvolumes",
    defaultMessage: "This secondary server either has no subvolumes or it is not reachable."
  }
});
