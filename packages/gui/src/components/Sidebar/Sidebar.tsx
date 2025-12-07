import { AppShell, NavLink, ThemeIcon, Text, Stack, Box } from "@mantine/core";
import {
  IconBook,
  IconChartBar,
  IconManualGearbox,
  IconRefresh,
  IconReport,
  IconServer
} from "@tabler/icons-react";
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
            active={matches.some((match) => match.routeId === "/")}
            onClick={() => navigate({ to: "/" })}
          />
          <NavLink
            label={formatMessage(translations.snapshotsNavItem)}
            leftSection={
              <ThemeIcon variant="light" size="sm">
                <IconBook size={16} />
              </ThemeIcon>
            }
            active={matches.some((match) => match.routeId === "/snapshots")}
            onClick={() => navigate({ to: "/snapshots" })}
          />
          <NavLink
            label={formatMessage(translations.configurationNavItem)}
            leftSection={
              <ThemeIcon variant="light" size="sm">
                <IconManualGearbox size={16} />
              </ThemeIcon>
            }
            active={matches.some((match) => match.routeId === "/configuration")}
            onClick={() => navigate({ to: "/configuration" })}
          />
          <NavLink
            label={formatMessage(translations.remoteReplicationNavItem)}
            leftSection={
              <ThemeIcon variant="light" size="sm">
                <IconRefresh size={16} />
              </ThemeIcon>
            }
          />
          <NavLink
            label={formatMessage(translations.reportsNavItem)}
            leftSection={
              <ThemeIcon variant="light" size="sm">
                <IconReport size={16} />
              </ThemeIcon>
            }
          />
          <NavLink
            label={formatMessage(translations.metricsAndAnalysisNavItem)}
            leftSection={
              <ThemeIcon variant="light" size="sm">
                <IconChartBar size={16} />
              </ThemeIcon>
            }
          />
        </Stack>
        <Box mt="lg">
          <LocaleSelector />
        </Box>
      </Stack>
    </AppShell.Navbar>
  );
};
