import { Card, Text, Group, Badge, Stack } from "@mantine/core";
import { useIntl } from "react-intl";
import { translations } from "./translations";

export interface ServerCardProps {
  name: string;
  ipAddress: string;
  port?: number;
  isPrimary?: boolean;
  onClick?: () => void;
}

export const ServerCard = ({ name, ipAddress, port, isPrimary, onClick }: ServerCardProps) => {
  const { formatMessage } = useIntl();

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
    </Card>
  );
};
