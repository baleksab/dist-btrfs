import { Card, Group, Stack, Skeleton } from "@mantine/core";

export const ServerCardSkeleton = () => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="sm" wrap="nowrap">
        <Skeleton height={22} width="40%" />

        <Skeleton height={16} width={70} />
      </Group>
      <Stack gap={8}>
        <Group gap={6}>
          <Skeleton height={14} width={80} />
          <Skeleton height={14} width={140} />
        </Group>
        <Group gap={6}>
          <Skeleton height={14} width={80} />
          <Skeleton height={14} width={60} />
        </Group>
      </Stack>

      <Group justify="space-between" mt="lg">
        <Skeleton height={16} width={90} />
        <Group gap={6}>
          <Skeleton height={28} width={28} radius="sm" />
          <Skeleton height={28} width={28} radius="sm" />
        </Group>
      </Group>
    </Card>
  );
};
