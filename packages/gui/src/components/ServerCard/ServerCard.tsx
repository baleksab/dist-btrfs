import { Card, Text, Group, Badge, Stack, ActionIcon } from "@mantine/core";
import { useIntl } from "react-intl";
import { translations } from "./translations";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import type { MouseEvent } from "react";
import { useDeleteRemoteServer } from "../../hooks";
import type { GetAllServersResponse } from "../../generated-types";

export interface ServerCardProps {
  server: GetAllServersResponse;
  onEdit?: (server: GetAllServersResponse) => void;
  isOnline?: boolean;
}

export const ServerCard = ({ server, isOnline, onEdit }: ServerCardProps) => {
  const { formatMessage } = useIntl();

  const { mutateAsync: deleteServerAsync, isPending: isDeletingServer } = useDeleteRemoteServer();

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    await deleteServerAsync({ uid: server.uid });
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="sm" wrap="nowrap">
        <Text fw={600} size="lg">
          {server.name}
        </Text>
        {server.isPrimary && (
          <Badge color="blue" variant="light">
            {formatMessage(translations.serverCardPrimary)}
          </Badge>
        )}
      </Group>

      <Stack gap={4} flex="1">
        <Group gap={6}>
          <Text c="dimmed" size="sm" w={80}>
            {formatMessage(translations.serverCardIp)}:
          </Text>
          <Text size="sm">{server.ipAddress}</Text>
        </Group>

        <Group gap={6}>
          <Text c="dimmed" size="sm" w={80}>
            {formatMessage(translations.serverCardPort)}:
          </Text>
          <Text size="sm">{server.port ?? 22}</Text>
        </Group>
      </Stack>

      <Group gap={6} justify="space-between" mt="lg">
        <Badge color={isOnline ? "green" : "red"} variant="dot">
          {isOnline ? formatMessage(translations.online) : formatMessage(translations.offline)}
        </Badge>
        <Group gap={6} justify="flex-end">
          <ActionIcon variant="subtle" color="yellow" size="sm" onClick={() => onEdit?.(server)}>
            <IconPencil size={16} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="red"
            size="sm"
            onClick={handleDelete}
            disabled={server.isPrimary}
            loading={isDeletingServer}
          >
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );
};
