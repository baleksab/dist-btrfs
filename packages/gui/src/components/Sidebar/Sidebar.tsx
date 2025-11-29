import {
  AppShell,
  NavLink,
  ThemeIcon,
  Text,
  Stack,
} from "@mantine/core";
import { IconServer } from "@tabler/icons-react";
import { useIntl } from "react-intl";
import { translations } from "./translations";

export const Sidebar = () => {
  const { formatMessage } = useIntl();

  return (
    <AppShell.Navbar p="md">
      <Text size="xs" fw={700} opacity={0.6} mb="sm" tt="uppercase">
        {formatMessage(translations.sidebarTitle)}
      </Text>

      <Stack gap={2}>
        <NavLink
          label={formatMessage(translations.serversNavItem)}
          leftSection={
            <ThemeIcon variant="light" size="sm">
              <IconServer size={16} />
            </ThemeIcon>
          }
        />
      </Stack>
    </AppShell.Navbar>
  );
};
