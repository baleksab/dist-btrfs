import { Fieldset, Stack, SimpleGrid, Card, Text, Group, Loader, Divider } from "@mantine/core";
import { useIntl } from "react-intl";
import { translations } from "./translations";
import { useState, type ReactNode } from "react";
import { SecondaryServerSelector, SubvolumeSelector } from "../../../../components";
import { useSubvolumeStorageMetrics } from "../../../../hooks";
import { formatBytes } from "../../../../utils";

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
  metrics: any;
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
                <strong>{formatMessage(translations.snapshotOverhead)}:</strong>&nbsp;
                {formatBytes(metrics.subvolume?.totalSnapshotExclusiveBytes || 0)}
              </Text>
            </Group>
            <Card withBorder p="sm" bg="gray.0">
              <Text size="xs" c="dimmed">
                {formatMessage(translations.chartPlaceholder)}
              </Text>
            </Card>

            <Card withBorder p="sm" bg="gray.0">
              <Text size="xs" c="dimmed">
                {formatMessage(translations.tablePlaceholder)}
              </Text>
            </Card>
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
