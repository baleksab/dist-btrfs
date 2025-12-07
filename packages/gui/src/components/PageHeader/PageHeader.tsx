import { Group, Title, Divider, Stack } from "@mantine/core";
import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  actions?: ReactNode;
}

export const PageHeader = ({ title, actions }: PageHeaderProps) => {
  return (
    <Stack>
      <Group justify="space-between">
        <Title order={2}>{title}</Title>
        {actions}
      </Group>
      <Divider />
    </Stack>
  );
};
