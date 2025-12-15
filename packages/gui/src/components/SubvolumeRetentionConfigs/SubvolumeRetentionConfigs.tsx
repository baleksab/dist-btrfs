import { Table, Badge, Skeleton, Text } from "@mantine/core";
import { useIntl } from "react-intl";
import { translations } from "./translations";
import { useSubvolumeRetentionConfigAll } from "../../hooks";
import { BtrfsSubvolumeSetRetentionConfigRequestTypeEnum } from "../../generated-types";

const retentionTypeMessageMap: Record<
  BtrfsSubvolumeSetRetentionConfigRequestTypeEnum,
  keyof typeof translations
> = {
  [BtrfsSubvolumeSetRetentionConfigRequestTypeEnum.Daily]: "retentionTypeDaily",
  [BtrfsSubvolumeSetRetentionConfigRequestTypeEnum.Weekly]: "retentionTypeWeekly",
  [BtrfsSubvolumeSetRetentionConfigRequestTypeEnum.Monthly]: "retentionTypeMonthly"
};

export const SubvolumeRetentionConfigs = () => {
  const { formatMessage } = useIntl();

  const { subvolumeRetentionConfigs: configs, isLoadingSubvolumeRetentionConfigs: isLoading } =
    useSubvolumeRetentionConfigAll();

  const renderSkeletonRows = (count = 3) =>
    Array.from({ length: count }).map((_, index) => (
      <Table.Tr key={index}>
        <Table.Td>
          <Skeleton height={16} width="60%" />
        </Table.Td>
        <Table.Td>
          <Skeleton height={16} width={100} />
        </Table.Td>
        <Table.Td>
          <Skeleton height={16} width={160} />
        </Table.Td>
        <Table.Td>
          <Skeleton height={16} width={90} />
        </Table.Td>
        <Table.Td>
          <Skeleton height={20} width={90} />
        </Table.Td>
      </Table.Tr>
    ));

  if (!isLoading && (!configs || configs.length === 0)) {
    return <Text>{formatMessage(translations.noRetentionConfigs)}</Text>;
  }

  return (
    <Table striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>{formatMessage(translations.subvolumePath)}</Table.Th>
          <Table.Th>{formatMessage(translations.retentionType)}</Table.Th>
          <Table.Th>{formatMessage(translations.retentionIntervalLabel)}</Table.Th>
          <Table.Th>{formatMessage(translations.keepLabel)}</Table.Th>
          <Table.Th>{formatMessage(translations.enabledLabel)}</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {isLoading
          ? renderSkeletonRows()
          : configs!.map((config) => (
              <Table.Tr key={config.id}>
                <Table.Td>{config.subvolPath}</Table.Td>
                <Table.Td>
                  {formatMessage(translations[retentionTypeMessageMap[config.type]])}
                </Table.Td>
                <Table.Td>{config.retentionIntervalSeconds}</Table.Td>
                <Table.Td>
                  {formatMessage(translations.snapshotCount, {
                    count: config.keep
                  })}
                </Table.Td>
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
