import { Button, Group, Skeleton, Stack, Table } from "@mantine/core";
import {
  useCreateSnapshot,
  useSnapshots,
  useDeleteSnapshot,
  useRestoreSnapshot
} from "../../hooks";
import { PageHeader, SnapshotCleanupModal } from "../../components";
import { useIntl } from "react-intl";
import { translations } from "./translations";
import { useState } from "react";
import { SubvolumeSelector } from "../../components";

export const SnapshotsPage = () => {
  const { formatMessage, formatDate, formatTime } = useIntl();
  const [selectedSubvolume, setSelectedSubvolume] = useState<string | null>(null);
  const [isCleanupModalOpen, setCleanupModalOpen] = useState(false);
  const { snapshots, isLoadingSnapshots } = useSnapshots(selectedSubvolume || "");
  const { createSnapshotAsync, isCreatingSnapshot } = useCreateSnapshot(selectedSubvolume || "");
  const { deleteSnapshotAsync, isDeletingSnapshot } = useDeleteSnapshot(selectedSubvolume || "");
  const { restoreSnapshotAsync, isRestoringSnapshot } = useRestoreSnapshot();

  return (
    <Stack>
      <PageHeader
        title={formatMessage(translations.title)}
        actions={
          <Group>
            <Button
              color="red"
              disabled={!selectedSubvolume || isDeletingSnapshot || isRestoringSnapshot}
              onClick={() => setCleanupModalOpen(true)}
            >
              {formatMessage(translations.cleanup)}
            </Button>
            <Button
              onClick={() => createSnapshotAsync(selectedSubvolume || "")}
              loading={isCreatingSnapshot}
              disabled={!selectedSubvolume || isDeletingSnapshot || isRestoringSnapshot}
            >
              {formatMessage(translations.createSnapshot)}
            </Button>
          </Group>
        }
      />
      <SubvolumeSelector
        value={selectedSubvolume}
        onChange={(option) => setSelectedSubvolume(option)}
      />
      <Table highlightOnHover striped withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>{formatMessage(translations.columnName)}</Table.Th>
            <Table.Th>{formatMessage(translations.columnCreatedAt)}</Table.Th>
            <Table.Th>{formatMessage(translations.columnSize)}</Table.Th>
            <Table.Th>{formatMessage(translations.columnPath)}</Table.Th>
            <Table.Th>{formatMessage(translations.columnActions)}</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {isLoadingSnapshots ? (
            [...Array(5)].map((_, index) => (
              <Table.Tr key={`sk-${index}`}>
                <Table.Td>
                  <Skeleton height={12} />
                </Table.Td>
                <Table.Td>
                  <Skeleton height={12} />
                </Table.Td>
                <Table.Td>
                  <Skeleton height={12} />
                </Table.Td>
                <Table.Td>
                  <Skeleton height={12} />
                </Table.Td>
                <Table.Td>
                  <Skeleton height={12} />
                </Table.Td>
              </Table.Tr>
            ))
          ) : snapshots?.length ? (
            snapshots.map((snapshot) => (
              <Table.Tr key={snapshot.name}>
                <Table.Td>{snapshot.name}</Table.Td>
                <Table.Td>
                  {formatDate(snapshot.createdAt, {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                  })}
                  &nbsp;
                  {formatTime(snapshot.createdAt, {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                  })}
                </Table.Td>
                <Table.Td>{((snapshot.sizeBytes || 0) / 1024 / 1024).toFixed(2)} MB</Table.Td>
                <Table.Td>{snapshot.path}</Table.Td>
                <Table.Td>
                  <Group justify="center">
                    <Button
                      size="xs"
                      variant="light"
                      color="blue"
                      disabled={isDeletingSnapshot || isCreatingSnapshot}
                      loading={isRestoringSnapshot}
                      onClick={() =>
                        restoreSnapshotAsync({
                          subvolume: selectedSubvolume || "",
                          snapshot: snapshot.name
                        })
                      }
                    >
                      {formatMessage(translations.actionRestore)}
                    </Button>
                    <Button
                      size="xs"
                      variant="light"
                      color="red"
                      onClick={() =>
                        deleteSnapshotAsync({
                          subvolume: selectedSubvolume || "",
                          snapshot: snapshot.name
                        })
                      }
                      loading={isDeletingSnapshot}
                      disabled={isRestoringSnapshot || isCreatingSnapshot}
                    >
                      {formatMessage(translations.actionDelete)}
                    </Button>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))
          ) : (
            <Table.Tr>
              <Table.Td colSpan={5} ta="center" p="lg">
                {formatMessage(translations.noSnapshots)}
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
      <SnapshotCleanupModal
        key={isCleanupModalOpen ? "opened" : "closed"}
        opened={isCleanupModalOpen}
        onClose={() => setCleanupModalOpen(false)}
        subvolume={selectedSubvolume || ""}
      />
    </Stack>
  );
};
