import { useIntl } from "react-intl";
import { useStorageMetrics } from "../../../../hooks";
import { useState } from "react";
import {
  Badge,
  Card,
  Fieldset,
  Group,
  Loader,
  SimpleGrid,
  Stack,
  Text,
  Tooltip
} from "@mantine/core";
import { PieChart } from "@mantine/charts";
import { translations } from "./translations";
import { SecondaryServerSelector } from "../../../../components";
import type { BtrfsStorageMetricsResponse } from "../../../../generated-types";

const formatBytes = (bytes: number, withLabel: boolean = true) => {
  if (bytes === 0) {
    return "0 B";
  }
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  if (!withLabel) {
    return (bytes / Math.pow(k, i)).toFixed(2);
  }

  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
};

const LegendItem = ({
  color,
  label,
  value,
  total,
  tooltip
}: {
  color: string;
  label: string;
  value: number;
  total: number;
  tooltip: string;
}) => (
  <Group gap="xs">
    <span
      style={{
        width: 10,
        height: 10,
        borderRadius: "50%",
        backgroundColor: `var(--mantine-color-${color}-6)`
      }}
    />
    <Tooltip label={tooltip} withArrow>
      <Text size="sm" style={{ cursor: "help" }}>
        <strong>{label}:</strong>&nbsp;
        {formatBytes(value)} / {formatBytes(total)}
      </Text>
    </Tooltip>
  </Group>
);

const MetricsCard = ({
  title,
  metrics,
  loading
}: {
  title: string;
  metrics?: BtrfsStorageMetricsResponse;
  loading: boolean;
}) => {
  const { formatMessage } = useIntl();

  if (loading) {
    return (
      <Card withBorder p="lg">
        <Group justify="center">
          <Loader />
        </Group>
      </Card>
    );
  }

  if (!metrics) {
    return (
      <Card withBorder p="lg">
        <Text c="dimmed">{formatMessage(translations.noData)}</Text>
      </Card>
    );
  }

  return (
    <Card withBorder p="lg">
      <Stack gap="md">
        <Group justify="space-between">
          <Text fw={600}>{title}</Text>
          <Badge variant="light">
            {formatMessage(translations.total)}:&nbsp;{formatBytes(metrics.totalBytes)}
          </Badge>
        </Group>
        <PieChart
          data={metrics.chart}
          withLabels
          labelsPosition="outside"
          labelsType="percent"
          withTooltip
        />
        <SimpleGrid cols={2} spacing="xs">
          <LegendItem
            color={metrics.chart.find((c) => c.name === "Data")?.color || "gray"}
            label={formatMessage(translations.data)}
            value={metrics.data.used}
            total={metrics.data.total}
            tooltip={formatMessage(translations.dataHelp)}
          />
          <LegendItem
            color={metrics.chart.find((c) => c.name === "Metadata")?.color || "gray"}
            label={formatMessage(translations.metadata)}
            value={metrics.metadata.used}
            total={metrics.metadata.total}
            tooltip={formatMessage(translations.metadataHelp)}
          />
          <LegendItem
            color={metrics.chart.find((c) => c.name === "System")?.color || "gray"}
            label={formatMessage(translations.system)}
            value={metrics.system.used}
            total={metrics.system.total}
            tooltip={formatMessage(translations.systemHelp)}
          />
          <LegendItem
            color={metrics.chart.find((c) => c.name === "Free")?.color || "gray"}
            label={formatMessage(translations.free)}
            value={metrics.freeBytes}
            total={metrics.totalBytes}
            tooltip={formatMessage(translations.freeHelp)}
          />
        </SimpleGrid>
      </Stack>
    </Card>
  );
};

export const StorageMetrics = () => {
  const { formatMessage } = useIntl();
  const [selectedSecondaryServer, setSelectedSecondaryServer] = useState<string | null>();

  const { storageMetrics, isLoadingStorageMetrics } = useStorageMetrics();

  const {
    storageMetrics: secondaryStorageMetrics,
    isLoadingStorageMetrics: isLoadingSecondaryStorageMetrics
  } = useStorageMetrics(selectedSecondaryServer || "", !selectedSecondaryServer);

  return (
    <Fieldset legend={formatMessage(translations.label)}>
      <Stack gap="md">
        <SecondaryServerSelector
          type="single"
          onChange={(event) => setSelectedSecondaryServer(event?.[0])}
          value={selectedSecondaryServer ? [selectedSecondaryServer] : []}
        />
        <SimpleGrid cols={{ base: 1, md: 2 }}>
          <MetricsCard
            title={formatMessage(translations.primaryServer)}
            metrics={storageMetrics}
            loading={isLoadingStorageMetrics}
          />
          <MetricsCard
            title={formatMessage(translations.secondaryServer)}
            metrics={secondaryStorageMetrics}
            loading={isLoadingSecondaryStorageMetrics}
          />
        </SimpleGrid>
      </Stack>
    </Fieldset>
  );
};
