import { Accordion, Badge, Group, Skeleton, Stack, Text } from "@mantine/core";
import { useIntl } from "react-intl";
import { useSnapshotsHealth } from "../../hooks";
import { translations } from "./translations";
import type {
  BtrfsSnapshotReplicationHealthResponseOverallEnum,
  BtrfsSnapshotReplicationHealthResponseReplicasInnerStatusEnum
} from "../../generated-types";

const statusColor = (
  status:
    | BtrfsSnapshotReplicationHealthResponseOverallEnum
    | BtrfsSnapshotReplicationHealthResponseReplicasInnerStatusEnum
) => {
  switch (status) {
    case "ok":
      return "green";
    case "degraded":
      return "yellow";
    case "missing":
    case "failed":
    case "error":
      return "red";
    default:
      return "gray";
  }
};

const formatDuration = (seconds?: number) => {
  if (seconds === undefined) {
    return "";
  }

  const s = Math.abs(seconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return `${h}h ${m}m`;
};

const formatSize = (size?: { total?: string; exclusive?: string }) => {
  if (!size?.total) {
    return "";
  }

  return size.exclusive ? `${size.total} (exclusive: ${size.exclusive})` : size.total;
};

type SnapshotsHealthReportProps = {
  subvolume?: string | null;
  snapshot?: string | null;
};

export const SnapshotsHealthReport = ({ subvolume, snapshot }: SnapshotsHealthReportProps) => {
  const { formatMessage } = useIntl();

  const { snapshotsHealth, isCheckingSnapshotsHealth } = useSnapshotsHealth(
    subvolume || "",
    snapshot || ""
  );

  if (isCheckingSnapshotsHealth) {
    return <Skeleton height={32} />;
  }

  if (!snapshotsHealth) {
    return null;
  }

  return (
    <Stack>
      <Group justify="space-between">
        <Text size="sm">{formatMessage(translations.overallStatus)}</Text>
        <Badge color={statusColor(snapshotsHealth.overall)} size="lg">
          {snapshotsHealth.overall.toUpperCase()}
        </Badge>
      </Group>
      <Accordion>
        <Accordion.Item value="primary">
          <Accordion.Control>
            <Group justify="space-between" w="100%">
              <Text size="sm">
                <strong>{formatMessage(translations.primaryServer)}</strong>
              </Text>
              <Badge color={statusColor(snapshotsHealth.primary.status)} mr={8}>
                {snapshotsHealth.primary.status}
              </Badge>
            </Group>
          </Accordion.Control>
          <Accordion.Panel>
            <Stack gap="xs">
              {snapshotsHealth.primary.meta?.uuid && (
                <Text size="sm">
                  <strong>{formatMessage(translations.uidLabel)}:</strong>&nbsp;
                  {snapshotsHealth.primary.meta.uuid}
                </Text>
              )}
              {snapshotsHealth.primary.meta?.creationTime && (
                <Text size="sm">
                  <strong>{formatMessage(translations.createdLabel)}:</strong>&nbsp;
                  {snapshotsHealth.primary.meta.creationTime}
                </Text>
              )}
              {snapshotsHealth.primary.meta?.ageSeconds !== undefined && (
                <Text size="sm">
                  <strong>{formatMessage(translations.ageLabel)}:</strong>&nbsp;
                  {formatDuration(snapshotsHealth.primary.meta.ageSeconds)}
                </Text>
              )}
              {snapshotsHealth.primary.meta?.size && (
                <Text size="sm">
                  <strong>{formatMessage(translations.sizeLabel)}:</strong>&nbsp;
                  {formatSize(snapshotsHealth.primary.meta.size)}
                </Text>
              )}
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
        {snapshotsHealth.replicas.map((replica) => (
          <Accordion.Item key={replica.serverUid} value={replica.serverUid}>
            <Accordion.Control>
              <Group justify="space-between" w="100%">
                <Text size="sm">
                  {formatMessage(translations.secondaryServer, {
                    strong: (text) => <strong>{text}</strong>,
                    ipAddress: `${replica.address}:${replica.port}`
                  })}
                </Text>
                <Badge color={statusColor(replica.status)} mr={8}>
                  {replica.status}
                </Badge>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack gap="xs">
                <Text size="sm">
                  <strong>{formatMessage(translations.serverUidLabel)}:</strong> {replica.serverUid}
                </Text>
                {replica.meta?.uuid && (
                  <Text size="sm">
                    <strong>{formatMessage(translations.uidLabel)}:</strong> {replica.meta.uuid}
                  </Text>
                )}
                {replica.meta?.receivedUuid && (
                  <Text size="sm">
                    <strong>{formatMessage(translations.receivedUidLabel)}:</strong>&nbsp;
                    {replica.meta.receivedUuid}
                  </Text>
                )}
                {replica.meta?.creationTime && (
                  <Text size="sm">
                    <strong>{formatMessage(translations.replicatedLabel)}:</strong>&nbsp;
                    {replica.meta.creationTime}
                  </Text>
                )}
                {replica.meta?.ageSeconds !== undefined && (
                  <Text size="sm">
                    <strong>{formatMessage(translations.ageLabel)}:</strong>&nbsp;
                    {formatDuration(replica.meta.ageSeconds)}
                  </Text>
                )}
                {replica.meta?.lagSeconds !== undefined && (
                  <Text size="sm">
                    <strong>{formatMessage(translations.lagLabel)}:</strong>&nbsp;
                    {formatDuration(replica.meta.lagSeconds)}
                  </Text>
                )}
                {replica.meta?.size && (
                  <Text size="sm">
                    <strong>{formatMessage(translations.sizeLabel)}:</strong>&nbsp;
                    {formatSize(replica.meta.size)}
                  </Text>
                )}
                {replica.foundPath && (
                  <Text size="sm">
                    <strong>{formatMessage(translations.pathLabel)}:</strong> {replica.foundPath}
                  </Text>
                )}
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Stack>
  );
};
