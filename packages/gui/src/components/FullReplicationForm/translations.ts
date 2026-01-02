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
  replicateButton: {
    id: "components.fullReplicationForm.replicateButton",
    defaultMessage: "Replicate"
  },
  replicationRunning: {
    id: "components.fullReplicationForm.replicationRunning",
    defaultMessage: "Running full replication…"
  },
  replicationCompleted: {
    id: "components.fullReplicationForm.replicationCompleted",
    defaultMessage: "Replication completed"
  },
  serverPortLabel: {
    id: "components.fullReplicationForm.serverPortLabel",
    defaultMessage: "Port"
  },
  replicationErrorLabel: {
    id: "components.fullReplicationForm.replicationErrorLabel",
    defaultMessage: "Error"
  },
  noSecondaryServers: {
    id: "components.fullReplicationForm.noSecondaryServers",
    defaultMessage: "There are no secondary servers added. Please add one before proceeding."
  }
});
