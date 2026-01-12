import { Fieldset, Stack, SimpleGrid, Card, Text, Group, Loader, Divider } from "@mantine/core";
import { useIntl } from "react-intl";
import { translations } from "./translations";
import { useState, type ReactNode } from "react";
import { SecondaryServerSelector, SubvolumeSelector } from "../../../../components";
import { useSubvolumeStorageMetrics } from "../../../../hooks";

const MetricsPanel = ({
  title,
  loading,
  selector,
  metrics
}: {
  title: string;
  loading: boolean;
  selector: ReactNode;
  metrics: any;
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
                {formatMessage(translations.subvolume)}: <strong>{metrics.subvolume?.name}</strong>
              </Text>
              <Text size="sm">
                {formatMessage(translations.snapshots)}:&nbsp;
                <strong>{metrics.subvolume?.snapshotCount}</strong>
              </Text>
            </Group>

            <Group justify="space-between">
              <Text size="sm">
                {formatMessage(translations.exclusive)}:&nbsp;
                <strong>{metrics.subvolume?.exclusiveBytes}</strong>
              </Text>
              <Text size="sm">
                {formatMessage(translations.snapshotOverhead)}:&nbsp;
                <strong>{metrics.subvolume?.totalSnapshotExclusiveBytes}</strong>
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
