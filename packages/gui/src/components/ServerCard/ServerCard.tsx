import { Card, Text, Group, Badge, Stack, ActionIcon } from "@mantine/core";
import { useIntl } from "react-intl";
import { translations } from "./translations";
import { IconTrash } from "@tabler/icons-react";
import type { MouseEvent } from "react";
import { useDeleteRemoteServer } from "../../hooks";

export interface ServerCardProps {
  uid: string;
  name: string;
  ipAddress: string;
  port?: number;
  isPrimary?: boolean;
  onClick?: () => void;
}

export const ServerCard = ({ uid, name, ipAddress, port, isPrimary, onClick }: ServerCardProps) => {
  const { formatMessage } = useIntl();

  const { mutateAsync: deleteServerAsync, isPending: isDeletingServer } = useDeleteRemoteServer();

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    await deleteServerAsync({ uid });
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <Group justify="space-between" mb="sm">
        <Text fw={600} size="lg">
          {name}
        </Text>

        {isPrimary && (
          <Badge color="blue" variant="light">
            {formatMessage(translations.serverCardPrimary)}
          </Badge>
        )}
      </Group>

      <Stack gap={4}>
        <Group gap={6}>
          <Text c="dimmed" size="sm" w={80}>
            {formatMessage(translations.serverCardIp)}:
          </Text>
          <Text size="sm">{ipAddress}</Text>
        </Group>

        <Group gap={6}>
          <Text c="dimmed" size="sm" w={80}>
            {formatMessage(translations.serverCardPort)}:
          </Text>
          <Text size="sm">{port ?? 22}</Text>
        </Group>
      </Stack>

      <Group gap={6} justify="flex-end">
        <ActionIcon
          variant="subtle"
          color="red"
          size="sm"
          onClick={handleDelete}
          disabled={isPrimary}
          loading={isDeletingServer}
        >
          <IconTrash size={16} />
        </ActionIcon>
      </Group>
    </Card>
  );
};
