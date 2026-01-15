// translations.ts
import { defineMessages } from "react-intl";

export const translations = defineMessages({
  label: {
    id: "pages.reportsAndMetricsPage.components.subvolumeStorageMetrics.label",
    defaultMessage: "Subvolume specific storage metrics"
  },
  primary: {
    id: "pages.reportsAndMetricsPage.components.subvolumeStorageMetrics.primary",
    defaultMessage: "Primary server"
  },
  secondary: {
    id: "pages.reportsAndMetricsPage.components.subvolumeStorageMetrics.secondary",
    defaultMessage: "Secondary server"
  },
  noData: {
    id: "pages.reportsAndMetricsPage.components.subvolumeStorageMetrics.noData",
    defaultMessage: "No data"
  },
  subvolume: {
    id: "pages.reportsAndMetricsPage.components.subvolumeStorageMetrics.subvolume",
    defaultMessage: "Subvolume"
  },
  snapshots: {
    id: "pages.reportsAndMetricsPage.components.subvolumeStorageMetrics.snapshots",
    defaultMessage: "Snapshots"
  },
  exclusive: {
    id: "pages.reportsAndMetricsPage.components.subvolumeStorageMetrics.exclusive",
    defaultMessage: "Exclusive"
  },
  snapshotOverhead: {
    id: "pages.reportsAndMetricsPage.components.subvolumeStorageMetrics.snapshotOverhead",
    defaultMessage: "Snapshot overhead"
  },
  chartPlaceholder: {
    id: "pages.reportsAndMetricsPage.components.subvolumeStorageMetrics.chartPlaceholder",
    defaultMessage: "Chart placeholder"
  },
  tablePlaceholder: {
    id: "pages.reportsAndMetricsPage.components.subvolumeStorageMetrics.tablePlaceholder",
    defaultMessage: "Table placeholder"
  },
  efficiency: {
    id: "pages.reportsAndMetricsPage.components.subvolumeStorageMetrics.efficiency",
    defaultMessage: "Efficiency (%)"
  },
  referenced: {
    id: "pages.reportsAndMetricsPage.components.subvolumeStorageMetrics.referenced",
    defaultMessage: "Referenced"
  },
  snapshot: {
    id: "pages.reportsAndMetricsPage.components.subvolumeStorageMetrics.snapshot",
    defaultMessage: "Snapshot"
  },
  subvolumeHelp: {
    id: "pages.reports.subvolume.help",
    defaultMessage: "The selected BTRFS subvolume."
  },
  snapshotsHelp: {
    id: "pages.reports.snapshots.help",
    defaultMessage: "Number of snapshots created from this subvolume."
  },
  exclusiveHelp: {
    id: "pages.reports.exclusive.help",
    defaultMessage: "Actual disk space used only by this subvolume (not shared with snapshots)."
  },
  referencedHelp: {
    id: "pages.reports.referenced.help",
    defaultMessage: "Logical size of all data visible inside the subvolume."
  },
  snapshotOverheadHelp: {
    id: "pages.reports.snapshotOverhead.help",
    defaultMessage: "Total additional disk space consumed by all snapshots of this subvolume."
  },
  efficiencyHelp: {
    id: "pages.reports.efficiency.help",
    defaultMessage:
      "How efficiently Copy-on-Write saves space. Higher percentage means better efficiency."
  }
});
