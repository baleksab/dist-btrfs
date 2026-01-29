import {
  Fieldset,
  Stack,
  SimpleGrid,
  Card,
  Text,
  Group,
  Loader,
  Divider,
  Table,
  Tooltip
} from "@mantine/core";
import { useIntl } from "react-intl";
import { translations } from "./translations";
import { useState, type ReactNode } from "react";
import { SecondaryServerSelector, SubvolumeSelector } from "../../../../components";
import { useSubvolumeStorageMetrics } from "../../../../hooks";
import { formatBytes } from "../../../../utils";
import type { BtrfsSubvolumeDetailedMetricsResponse } from "../../../../generated-types";
import { BarChart } from "@mantine/charts";

const MetricLine = ({
  label,
  tooltip,
  value
}: {
  label: string;
  tooltip: string;
  value: ReactNode;
}) => (
  <Tooltip label={tooltip} withArrow>
    <Text size="sm" style={{ cursor: "help" }}>
      <strong>{label}:</strong>&nbsp;
      {value}
    </Text>
  </Tooltip>
);

const MetricsPanel = ({
  title,
  loading,
  selector,
  metrics,
  subvolume
}: {
  title: string;
  loading: boolean;
  selector: ReactNode;
  metrics?: BtrfsSubvolumeDetailedMetricsResponse;
  subvolume?: string;
}) => {
  const { formatMessage } = useIntl();

  return (
    <Card withBorder>
      <Stack>
        <Text fw={600}>{title}</Text>
        {selector}
        <Divider />
        {loading && (
          <Group justify="center" h={200}>
            <Loader />
          </Group>
        )}
        {!loading && !metrics && (
          <Stack>
            <Text c="dimmed">{formatMessage(translations.noData)}</Text>
          </Stack>
        )}
        {!loading && metrics && (
          <Stack gap="md">
            <Group justify="space-between">
              <MetricLine
                label={formatMessage(translations.subvolume)}
                tooltip={formatMessage(translations.subvolumeHelp)}
                value={metrics.subvolume?.path || subvolume}
              />
              <MetricLine
                label={formatMessage(translations.snapshots)}
                tooltip={formatMessage(translations.snapshotsHelp)}
                value={metrics.subvolume?.snapshotCount || 0}
              />
            </Group>
            <Group justify="space-between">
              <MetricLine
                label={formatMessage(translations.exclusive)}
                tooltip={formatMessage(translations.exclusiveHelp)}
                value={formatBytes(metrics.subvolume?.exclusiveBytes || 0)}
              />
              <MetricLine
                label={formatMessage(translations.referenced)}
                tooltip={formatMessage(translations.referencedHelp)}
                value={formatBytes(metrics.subvolume?.referencedBytes || 0)}
              />
            </Group>
            <Group justify="space-between">
              <MetricLine
                label={formatMessage(translations.snapshotOverhead)}
                tooltip={formatMessage(translations.snapshotOverheadHelp)}
                value={formatBytes(metrics.subvolume?.totalSnapshotExclusiveBytes || 0)}
              />
              <MetricLine
                label={formatMessage(translations.efficiency)}
                tooltip={formatMessage(translations.efficiencyHelp)}
                value={
                  metrics.subvolume?.referencedBytes
                    ? `${Math.round(
                        (metrics.subvolume.exclusiveBytes / metrics.subvolume.referencedBytes) * 100
                      )}%`
                    : "/"
                }
              />
            </Group>
            {metrics.snapshots.length > 0 && (
              <>
                <Card withBorder p="sm">
                  <BarChart
                    h={280}
                    data={metrics.snapshots.map((s) => ({
                      name: s.name.slice(0, 19),
                      exclusive: s.exclusiveBytes,
                      referenced: s.referencedBytes
                    }))}
                    dataKey="name"
                    series={[
                      {
                        name: "exclusive",
                        label: formatMessage(translations.exclusive),
                        color: "red"
                      },
                      {
                        name: "referenced",
                        label: formatMessage(translations.referenced),
                        color: "green"
                      }
                    ]}
                    withLegend
                    withTooltip
                    valueFormatter={(v) => formatBytes(v)}
                    tooltipProps={{
                      formatter: (value, name) => [
                        formatBytes(Number(value)),
                        formatMessage(translations[name as keyof typeof translations])
                      ]
                    }}
                  />
                </Card>
                <Table striped highlightOnHover withTableBorder>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>{formatMessage(translations.snapshot)}</Table.Th>
                      <Table.Th>{formatMessage(translations.referenced)}</Table.Th>
                      <Table.Th>{formatMessage(translations.exclusive)}</Table.Th>
                      <Table.Th>{formatMessage(translations.efficiency)}</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {metrics.snapshots.map((s) => (
                      <Table.Tr key={s.path}>
                        <Table.Td>{s.name}</Table.Td>
                        <Table.Td>{formatBytes(s.referencedBytes)}</Table.Td>
                        <Table.Td>{formatBytes(s.exclusiveBytes)}</Table.Td>
                        <Table.Td>{Math.round(s.efficiency * 100)}%</Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </>
            )}
          </Stack>
        )}
      </Stack>
    </Card>
  );
};

export const SubvolumeStorageMetrics = () => {
  const { formatMessage } = useIntl();

  const [selectedPrimarySubvolume, setSelectedPrimarySubvolume] = useState<string | null>();
  const [selectedSecondaryServer, setSelectedSecondaryServer] = useState<string | null>();
  const [selectedSecondarySubvolume, setSelectedSecondarySubvolume] = useState<string | null>();

  const {
    subvolumeStorageMetrics: primaryMetrics,
    isLoadingSubvolumeStorageMetrics: isLoadingPrimaryMetrics
  } = useSubvolumeStorageMetrics(selectedPrimarySubvolume || "");

  const {
    subvolumeStorageMetrics: secondaryMetrics,
    isLoadingSubvolumeStorageMetrics: isLoadingSecondaryMetrics
  } = useSubvolumeStorageMetrics(
    selectedSecondarySubvolume || "",
    selectedSecondaryServer || "",
    !selectedSecondaryServer
  );

  return (
    <Fieldset legend={formatMessage(translations.label)}>
      <SimpleGrid cols={{ base: 1, md: 2 }}>
        <MetricsPanel
          title={formatMessage(translations.primary)}
          loading={isLoadingPrimaryMetrics}
          metrics={primaryMetrics}
          subvolume={selectedPrimarySubvolume || ""}
          selector={
            <SubvolumeSelector
              value={selectedPrimarySubvolume}
              onChange={setSelectedPrimarySubvolume}
            />
          }
        />

        <MetricsPanel
          title={formatMessage(translations.secondary)}
          loading={isLoadingSecondaryMetrics}
          metrics={secondaryMetrics}
          subvolume={selectedSecondarySubvolume || ""}
          selector={
            <Stack>
              <SecondaryServerSelector
                type="single"
                onChange={(event) => setSelectedSecondaryServer(event?.[0])}
                value={selectedSecondaryServer ? [selectedSecondaryServer] : []}
              />
              <SubvolumeSelector
                value={selectedSecondarySubvolume}
                onChange={setSelectedSecondarySubvolume}
              />
            </Stack>
          }
        />
      </SimpleGrid>
    </Fieldset>
  );
};
