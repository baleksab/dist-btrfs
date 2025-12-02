import { Group, Title, Button, Divider, Stack } from "@mantine/core";

interface PageHeaderProps {
  title: string;
  buttonLabel: string;
  onClick?: () => void;
}

export const PageHeader = ({ title, buttonLabel, onClick }: PageHeaderProps) => {
  return (
    <Stack>
      <Group justify="space-between">
        <Title order={2}>{title}</Title>
        <Button onClick={onClick}>{buttonLabel}</Button>
      </Group>
      <Divider />
    </Stack>
  );
};
