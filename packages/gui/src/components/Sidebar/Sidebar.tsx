import {
  AppShell,
  NavLink,
  ThemeIcon,
  Text,
  Stack,
  Box,
} from "@mantine/core";
import { IconServer } from "@tabler/icons-react";
import { useIntl } from "react-intl";
import { translations } from "./translations";
import { LocaleSelector } from "../LocaleSelector";
import { useRouter, useRouterState } from "@tanstack/react-router";

export const Sidebar = () => {
  const { formatMessage } = useIntl();
  const { navigate } = useRouter();
  const { matches } = useRouterState({ select: (s) => s });

  return (
    <AppShell.Navbar p="md">
      <Stack h="100%" justify="space-between">
        <Stack gap={2}>
          <Text size="xs" fw={700} opacity={0.6} mb="sm" tt="uppercase">
            {formatMessage(translations.sidebarTitle)}
          </Text>
          <NavLink
            label={formatMessage(translations.serversNavItem)}
            leftSection={
              <ThemeIcon variant="light" size="sm">
                <IconServer size={16} />
              </ThemeIcon>
            }
            active={matches.some(match => match.routeId === "/")}
            onClick={() => navigate({to: "/"})}
          />
        </Stack>
        <Box mt="lg">
          <LocaleSelector />
        </Box>
      </Stack>
    </AppShell.Navbar>
  );
};
