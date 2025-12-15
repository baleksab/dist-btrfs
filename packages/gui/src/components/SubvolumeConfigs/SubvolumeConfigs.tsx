import { Table, Badge, Skeleton, Text } from "@mantine/core";
import { useIntl } from "react-intl";
import { translations } from "./translations";
import { useSubvolumeConfigAll } from "../../hooks";

export const SubvolumeConfigs = () => {
  const { formatMessage } = useIntl();

  const { subvolumeConfigs: configs, isLoadingSubvolumeConfigs: isLoading } =
    useSubvolumeConfigAll();

  const renderSkeletonRows = (count = 3) =>
    Array.from({ length: count }).map((_, index) => (
      <Table.Tr key={index}>
        <Table.Td>
          <Skeleton height={16} width="80%" />
        </Table.Td>
        <Table.Td>
          <Skeleton height={16} width={140} />
        </Table.Td>
        <Table.Td>
          <Skeleton height={20} width={90} />
        </Table.Td>
      </Table.Tr>
    ));

  if (!isLoading && (!configs || configs.length === 0)) {
    return <Text>{formatMessage(translations.noConfiguredSubvolumes)}</Text>;
  }

  return (
    <Table striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>{formatMessage(translations.subvolPathLabel)}</Table.Th>
          <Table.Th>{formatMessage(translations.snapshotIntervalLabel)}</Table.Th>
          <Table.Th>{formatMessage(translations.status)}</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {isLoading
          ? renderSkeletonRows()
          : configs!.map((config) => (
              <Table.Tr key={config.id}>
                <Table.Td>{config.subvolPath}</Table.Td>
                <Table.Td>{config.snapshotIntervalSeconds}</Table.Td>
                <Table.Td>
                  <Badge color={config.isEnabled ? "green" : "gray"}>
                    {config.isEnabled
                      ? formatMessage(translations.enabled)
                      : formatMessage(translations.disabled)}
                  </Badge>
                </Table.Td>
              </Table.Tr>
            ))}
      </Table.Tbody>
    </Table>
  );
};
