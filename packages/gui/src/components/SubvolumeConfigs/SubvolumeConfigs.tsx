import { Table, Badge, Skeleton, Text } from "@mantine/core";
import { useIntl } from "react-intl";
import { translations } from "./translations";
import type { BtrfsSubvolumeConfigResponse } from "../../generated-types";

type SubvolumeConfigsProps = {
  configs?: BtrfsSubvolumeConfigResponse[];
  isLoading: boolean;
};

export const SubvolumeConfigs = ({ configs, isLoading }: SubvolumeConfigsProps) => {
  const { formatMessage } = useIntl();

  return (
    <Skeleton visible={isLoading}>
      {configs && configs.length > 0 ? (
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>{formatMessage(translations.subvolPathLabel)}</Table.Th>
              <Table.Th>{formatMessage(translations.snapshotIntervalLabel)}</Table.Th>
              <Table.Th>{formatMessage(translations.status)}</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {configs.map((config) => (
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
      ) : (
        <Text>{formatMessage(translations.noConfiguredSubvolumes)}</Text>
      )}
    </Skeleton>
  );
};
