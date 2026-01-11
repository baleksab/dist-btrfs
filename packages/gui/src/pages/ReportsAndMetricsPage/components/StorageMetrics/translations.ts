import { defineMessages } from "react-intl";

export const translations = defineMessages({
  label: {
    id: "pages.reportsAndMetricsPage.components.storageMetrics.label",
    defaultMessage: "System-wide storage metrics"
  },
  primaryServer: {
    id: "pages.reportsAndMetricsPage.components.storageMetrics.primaryServer",
    defaultMessage: "Primary server"
  },
  secondaryServer: {
    id: "pages.reportsAndMetricsPage.components.storageMetrics.secondaryServer",
    defaultMessage: "Secondary server"
  },
  total: {
    id: "pages.reportsAndMetricsPage.components.storageMetrics.total",
    defaultMessage: "Total"
  },
  used: {
    id: "pages.reportsAndMetricsPage.components.storageMetrics.used",
    defaultMessage: "Used"
  },
  free: {
    id: "pages.reportsAndMetricsPage.components.storageMetrics.free",
    defaultMessage: "Free"
  },
  data: {
    id: "pages.reportsAndMetricsPage.components.storageMetrics.data",
    defaultMessage: "Data"
  },
  metadata: {
    id: "pages.reportsAndMetricsPage.components.storageMetrics.metadata",
    defaultMessage: "Metadata"
  },
  noData: {
    id: "pages.reportsAndMetricsPage.components.storageMetrics.noData",
    defaultMessage: "No data"
  },
  system: {
    id: "pages.reportsAndMetricsPage.components.storageMetrics.system",
    defaultMessage: "System"
  },
  dataHelp: {
    id: "pages.reportsAndMetricsPage.components.storageMetrics.dataHelp",
    defaultMessage: "Actual user data stored on disk (files, backups, databases, etc.)"
  },
  metadataHelp: {
    id: "pages.reportsAndMetricsPage.components.storageMetrics.metadataHelp",
    defaultMessage: "Filesystem metadata such as inodes, directories, and internal BTRFS structures"
  },
  systemHelp: {
    id: "pages.reportsAndMetricsPage.components.storageMetrics.systemHelp",
    defaultMessage: "Low-level filesystem structures required for BTRFS to operate"
  },
  freeHelp: {
    id: "pages.reportsAndMetricsPage.components.storageMetrics.freeHelp",
    defaultMessage: "Currently unused disk space available for new data"
  }
});
