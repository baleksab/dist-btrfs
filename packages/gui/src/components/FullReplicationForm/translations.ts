import { defineMessages } from "react-intl";

export const translations = defineMessages({
  noSnapshots: {
    id: "components.fullReplicationForm.noSnapshots",
    defaultMessage: "This subvolume has no snapshots, please create some before proceeding."
  },
  snapshotInfoTitle: {
    id: "components.fullReplicationForm.snapshotInfoTitle",
    defaultMessage: "Snapshot info"
  },
  snapshotSelectedBadge: {
    id: "components.fullReplicationForm.snapshotSelectedBadge",
    defaultMessage: "Selected"
  },
  snapshotNameLabel: {
    id: "components.fullReplicationForm.snapshotNameLabel",
    defaultMessage: "Name"
  },
  snapshotPathLabel: {
    id: "components.fullReplicationForm.snapshotPathLabel",
    defaultMessage: "Path"
  },
  snapshotCreatedAtLabel: {
    id: "components.fullReplicationForm.snapshotCreatedAtLabel",
    defaultMessage: "Created at"
  },
  snapshotSizeLabel: {
    id: "components.fullReplicationForm.snapshotSizeLabel",
    defaultMessage: "Size (referenced)"
  },
  willReplicateToTitle: {
    id: "components.fullReplicationForm.willReplicateToTitle",
    defaultMessage: "Will be replicated to"
  },
  noSecondaryServers: {
    id: "components.fullReplicationForm.noSecondaryServers",
    defaultMessage: "No secondary servers selected."
  },
  replicateButton: {
    id: "components.fullReplicationForm.replicateButton",
    defaultMessage: "Replicate"
  },
  replicationProgressTitle: {
    id: "components.fullReplicationForm.replicationProgressTitle",
    defaultMessage: "Replication progress"
  },
  replicationRunning: {
    id: "components.fullReplicationForm.replicationRunning",
    defaultMessage: "Running full replication…"
  },
  replicationCompleted: {
    id: "components.fullReplicationForm.replicationCompleted",
    defaultMessage: "Replication completed"
  }
});
