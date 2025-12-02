import { defineMessages } from "react-intl";

export const translations = defineMessages({
  title: {
    id: "pages.snapshotsPage.title",
    defaultMessage: "Primary server - snapshots"
  },
  createSnapshot: {
    id: "pages.snapshotsPage.createSnapshot",
    defaultMessage: "Create snapshot"
  },
  subvolumesLabel: {
    id: "pages.snapshotsPage.subvolumesLabel",
    defaultMessage: "Selected subvolume"
  },
  loadingSubvolumes: {
    id: "pages.snapshotsPage.loadingSubvolumes",
    defaultMessage: "Loading subvolumes..."
  },
  loadingSnapshots: {
    id: "pages.snapshotsPage.loadingSnapshots",
    defaultMessage: "Loading snapshots..."
  },
  loading: {
    id: "pages.snapshotsPage.loading",
    defaultMessage: "Loading..."
  },
  noSnapshots: {
    id: "pages.snapshotsPage.noSnapshots",
    defaultMessage: "No snapshots found for this subvolume."
  },
  columnName: {
    id: "pages.snapshotsPage.column.name",
    defaultMessage: "Name"
  },
  columnCreatedAt: {
    id: "pages.snapshotsPage.column.createdAt",
    defaultMessage: "Created at"
  },
  columnSize: {
    id: "pages.snapshotsPage.column.size",
    defaultMessage: "Size"
  },
  columnPath: {
    id: "pages.snapshotsPage.column.path",
    defaultMessage: "Path"
  },
  columnActions: {
    id: "pages.snapshotsPage.column.actions",
    defaultMessage: "Actions"
  },
  actionRestore: {
    id: "pages.snapshotsPage.action.restore",
    defaultMessage: "Restore"
  },
  actionDelete: {
    id: "pages.snapshotsPage.action.delete",
    defaultMessage: "Delete"
  }
});
