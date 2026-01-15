import {
  Fieldset,
  Stack,
  SimpleGrid,
  Card,
  Text,
  Group,
  Loader,
  Divider,
  Table
} from "@mantine/core";
import { useIntl } from "react-intl";
import { translations } from "./translations";
import { useState, type ReactNode } from "react";
import { SecondaryServerSelector, SubvolumeSelector } from "../../../../components";
import { useSubvolumeStorageMetrics } from "../../../../hooks";
import { formatBytes } from "../../../../utils";
import type { BtrfsSubvolumeDetailedMetricsResponse } from "../../../../generated-types";
import { BarChart } from "@mantine/charts";

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
              <Text size="sm">
                <strong>{formatMessage(translations.subvolume)}</strong>:&nbsp;
                {metrics.subvolume?.path || subvolume}
              </Text>
              <Text size="sm">
                <strong>{formatMessage(translations.snapshots)}:</strong>&nbsp;
                {metrics.subvolume?.snapshotCount || 0}
              </Text>
            </Group>
            <Group justify="space-between">
              <Text size="sm">
                <strong>{formatMessage(translations.exclusive)}</strong>:&nbsp;
                {formatBytes(metrics.subvolume?.exclusiveBytes || 0)}
              </Text>
              <Text size="sm">
                <strong>{formatMessage(translations.referenced)}:</strong>&nbsp;
                {formatBytes(metrics.subvolume?.referencedBytes || 0)}
              </Text>
            </Group>
            <Group justify="space-between">
              <Text size="sm">
                <strong>{formatMessage(translations.snapshotOverhead)}:</strong>&nbsp;
                {formatBytes(metrics.subvolume?.totalSnapshotExclusiveBytes || 0)}
              </Text>

              <Text size="sm">
                <strong>{formatMessage(translations.efficiency)}:</strong>&nbsp;
                {metrics.subvolume?.referencedBytes
                  ? `${Math.round(
                      (1 - metrics.subvolume.exclusiveBytes / metrics.subvolume.referencedBytes) *
                        100
                    )}%`
                  : "/"}
              </Text>
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
  console.log(selectedPrimarySubvolume);
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
