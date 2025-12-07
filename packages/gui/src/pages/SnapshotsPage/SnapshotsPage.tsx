import { Button, Group, Select, Skeleton, Stack, Table, type ComboboxItem } from "@mantine/core";
import { useCreateSnapshot, useSnapshots, useSubvolumes, useDeleteSnapshot } from "../../hooks";
import { PageHeader } from "../../components";
import { useIntl } from "react-intl";
import { translations } from "./translations";
import { useEffect, useRef, useState } from "react";

export const SnapshotsPage = () => {
  const { formatMessage, formatDate, formatTime } = useIntl();
  const [selectedSubvolume, setSelectedSubvolume] = useState<ComboboxItem | undefined>(undefined);
  const hasSetInitialSubvolume = useRef(false);

  const { subvolumes, isLoadingSubvolumes } = useSubvolumes();
  const { snapshots, isLoadingSnapshots } = useSnapshots(selectedSubvolume?.value || "");

  const { createSnapshotAsync, isCreatingSnapshot } = useCreateSnapshot(
    selectedSubvolume?.value || ""
  );

  const { deleteSnapshotAsync, isDeletingSnapshot } = useDeleteSnapshot(
    selectedSubvolume?.value || ""
  );

  const subvolumeOptions = subvolumes?.map((subvolume) => ({
    value: subvolume.path.toString(),
    label: subvolume.path
  }));

  useEffect(() => {
    if (hasSetInitialSubvolume.current || !subvolumeOptions?.length) {
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedSubvolume(subvolumeOptions[0]);
  }, [subvolumeOptions]);

  const handleSnapshotCreate = async () => {
    if (!selectedSubvolume?.value) return;
    await createSnapshotAsync(selectedSubvolume?.value);
  };

  if (isLoadingSubvolumes) {
    return (
      <Stack>
        <Skeleton height={32} />
        <Skeleton height={48} />
      </Stack>
    );
  }

  return (
    <Stack>
      <PageHeader
        buttonLabel={formatMessage(translations.createSnapshot)}
        title={formatMessage(translations.title)}
        onClick={handleSnapshotCreate}
        isLoading={isCreatingSnapshot}
        disabled={isDeletingSnapshot}
      />
      <Select
        data={subvolumeOptions}
        label={formatMessage(translations.subvolumesLabel)}
        value={selectedSubvolume?.value}
        onChange={(_, option) => setSelectedSubvolume(option)}
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
                  })}{" "}
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
                    <Button size="xs" variant="light" color="blue" disabled={isDeletingSnapshot}>
                      {formatMessage(translations.actionRestore)}
                    </Button>
                    <Button
                      size="xs"
                      variant="light"
                      color="red"
                      onClick={() =>
                        deleteSnapshotAsync({
                          subvolume: selectedSubvolume?.value || "",
                          snapshot: snapshot.name
                        })
                      }
                      loading={isDeletingSnapshot}
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
    </Stack>
  );
};
