import { defineMessages } from "react-intl";

export const translations = defineMessages({
  subvolumeHealth: {
    id: "components.incrementalReplicationForm.subvolumeHealth",
    defaultMessage: "Checking if {subvolume} exists on the primary server"
  },
  snapshotHealth: {
    id: "components.incrementalReplicationForm.snapshotHealth",
    defaultMessage: "Checking if {snapshot} exists on the primary server"
  },
  subvolumeHealthFail: {
    id: "components.incrementalReplicationForm.subvolumeHealthFail",
    defaultMessage: "{subvolume} does not exist on  the primary server!"
  },
  snapshotHealthFail: {
    id: "components.incrementalReplicationForm.snapshotHealthFail",
    defaultMessage: "{snapshot} does not exist on  the primary server!"
  },
  noSnapshots: {
    id: "components.incrementalReplicationForm.noSnapshots",
    defaultMessage:
      "This subvolume has no snapshots. Please do a <nav>full replication</nav> first."
  },
  noSubvolumes: {
    id: "components.incrementalReplicationForm.noSubvolumes",
    defaultMessage: "This secondary server either has no subvolumes or it is not reachable."
  },
  noNewerSnapshots: {
    id: "components.incrementalReplicationForm.noNewerSnapshots",
    defaultMessage:
      "The primary server has no newer snapshots than the selected one on the secondary server. Consider an earlier snapshot or create newer ones <nav>here</nav>."
  },
  secondaryServerSnapshot: {
    id: "components.icnrementalReplicationForm.secondaryServerSnapshot",
    defaultMessage: "Selected snapshot from secondary server"
  },
  primaryServerSnapshot: {
    id: "components.incrementalReplicationForm.primaryServerSnapshot",
    defaultMessage: "Selected snapshot from primary server"
  },
  incrementalDetails: {
    id: "components.incrementalReplicationForm.incrementalDetails",
    defaultMessage: "Incremental replication details"
  },
  secondarySnapshot: {
    id: "components.incrementalReplicationForm.secondarySnapshot",
    defaultMessage: "Snapshot on secondary server"
  },
  primarySnapshot: {
    id: "components.incrementalReplicationForm.primarySnapshot",
    defaultMessage: "Snapshot on primary server"
  },
  snapshotName: {
    id: "components.incrementalReplicationForm.snapshotName",
    defaultMessage: "Name"
  },
  snapshotCreated: {
    id: "components.incrementalReplicationForm.snapshotCreated",
    defaultMessage: "Created"
  },
  snapshotSize: {
    id: "components.incrementalReplicationForm.snapshotSize",
    defaultMessage: "Referenced size"
  },
  deltaTitle: {
    id: "components.incrementalReplicationForm.deltaTitle",
    defaultMessage: "Incremental delta"
  },
  deltaTimeGap: {
    id: "components.incrementalReplicationForm.deltaTimeGap",
    defaultMessage: "Time gap"
  },
  deltaTransferEstimate: {
    id: "components.incrementalReplicationForm.deltaTransferEstimate",
    defaultMessage: "Estimated transferred size"
  },
  deltaDepends: {
    id: "components.incrementalReplicationForm.deltaDepends",
    defaultMessage: "Depends on changed blocks"
  },
  incrementalExplanation: {
    id: "components.incrementalReplicationForm.incrementalExplanation",
    defaultMessage:
      "Only data changed between these snapshots will be transferred using incremental mode."
  },
  replicate: {
    id: "components.incrementalReplicationForm.replicate",
    defaultMessage: "Replicate"
  }
});
