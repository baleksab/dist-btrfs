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

  if (isCheckingSnapshotsHealth) return <Skeleton height={32} />;

  if (!snapshotsHealth) return null;

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
              <Text size="sm">{formatMessage(translations.primaryServer)}</Text>
              <Badge color={statusColor(snapshotsHealth.primary.status)} mr={8}>
                {snapshotsHealth.primary.status}
              </Badge>
            </Group>
          </Accordion.Control>
          <Accordion.Panel>
            <Stack>
              {snapshotsHealth.primary.uuid && (
                <Text size="sm">
                  {formatMessage(translations.uidLabel)}: {snapshotsHealth.primary.uuid}
                </Text>
              )}
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
        {snapshotsHealth.replicas.map((r) => (
          <Accordion.Item key={r.serverUid} value={r.serverUid}>
            <Accordion.Control>
              <Group justify="space-between" w="100%">
                <Text size="sm">
                  {r.address}:{r.port}
                </Text>
                <Badge color={statusColor(r.status)} mr={8}>
                  {r.status}
                </Badge>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack gap={4}>
                <Text size="sm">
                  {formatMessage(translations.uidLabel)}: {r.serverUid}
                </Text>

                {r.foundPath ? (
                  <Text size="sm">
                    {formatMessage(translations.pathLabel)}: {r.foundPath}
                  </Text>
                ) : (
                  <Text size="sm" c="red">
                    {formatMessage(translations.snapshotNotFound)}
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
