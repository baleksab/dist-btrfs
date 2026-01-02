import { Badge, Fieldset, Group, Stack, Text } from "@mantine/core";
import { useIntl } from "react-intl";
import type { BtrfsSnapshotFullReplicationResponseResultsInner } from "../../generated-types";
import { translations } from "./translations";

type ReplicationResultsProps = {
  results: BtrfsSnapshotFullReplicationResponseResultsInner[];
};

export const ReplicationResults = ({ results }: ReplicationResultsProps) => {
  const { formatMessage } = useIntl();

  return (
    <Fieldset legend={formatMessage(translations.replicationResults)}>
      <Stack gap="sm">
        {results.map((result) => (
          <Group key={result.serverUid} justify="space-between" wrap="nowrap" align="flex-start">
            <Stack gap={2}>
              <Text size="sm">
                <strong>{formatMessage(translations.serverUidLabel)}:</strong>&nbsp;
                {result.serverUid}
              </Text>
              <Text size="sm">
                <strong>{formatMessage(translations.serverAddressLabel)}:</strong>&nbsp;
                {result.address}/{result.port ?? 22}
              </Text>
            </Stack>
            <Stack gap={4} align="flex-end">
              <Badge size="sm" color={result.status === "ok" ? "green" : "red"} variant="filled">
                {result.status === "ok"
                  ? formatMessage(translations.replicationOk)
                  : formatMessage(translations.replicationFailed)}
              </Badge>
              {result.error && (
                <Text size="xs" c="dimmed" ta="right">
                  {result.error}
                </Text>
              )}
            </Stack>
          </Group>
        ))}
      </Stack>
    </Fieldset>
  );
};
