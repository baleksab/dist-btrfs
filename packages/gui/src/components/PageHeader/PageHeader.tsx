import { Group, Title, Button, Divider, Stack } from "@mantine/core";

interface PageHeaderProps {
  title: string;
  buttonLabel: string;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  withButton?: boolean;
}

export const PageHeader = ({
  title,
  buttonLabel,
  isLoading,
  disabled,
  withButton = true,
  onClick
}: PageHeaderProps) => {
  return (
    <Stack>
      <Group justify="space-between">
        <Title order={2}>{title}</Title>
        {withButton && (
          <Button onClick={onClick} loading={isLoading} disabled={disabled}>
            {buttonLabel}
          </Button>
        )}
      </Group>
      <Divider />
    </Stack>
  );
};
