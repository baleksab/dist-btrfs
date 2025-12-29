import { AppShell, NavLink, ThemeIcon, Text, Stack } from "@mantine/core";
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
import { ThemeSeLector } from "../ThemeSelector";

type SidebarProps = {
  onNavigate?: () => void;
};

export const Sidebar = ({ onNavigate }: SidebarProps) => {
  const { formatMessage } = useIntl();
  const { navigate } = useRouter();
  const { matches } = useRouterState({ select: (s) => s });

  const handleNavigate = (to: string) => {
    navigate({ to });
    onNavigate?.();
  };

  return (
    <AppShell.Navbar p="md">
      <Stack h="100%" justify="space-between">
        <Stack gap={2}>
          <Text size="xs" fw={700} opacity={0.6} mb="sm" tt="uppercase" visibleFrom="sm">
            {formatMessage(translations.sidebarTitle)}
          </Text>
          <NavLink
            label={formatMessage(translations.serversNavItem)}
            leftSection={
              <ThemeIcon variant="light" size="sm">
                <IconServer size={16} />
              </ThemeIcon>
            }
            active={matches.some((m) => m.routeId === "/")}
            onClick={() => handleNavigate("/")}
          />
          <NavLink
            label={formatMessage(translations.snapshotsNavItem)}
            leftSection={
              <ThemeIcon variant="light" size="sm">
                <IconBook size={16} />
              </ThemeIcon>
            }
            active={matches.some((m) => m.routeId === "/snapshots")}
            onClick={() => handleNavigate("/snapshots")}
          />
          <NavLink
            label={formatMessage(translations.configurationNavItem)}
            leftSection={
              <ThemeIcon variant="light" size="sm">
                <IconRefresh size={16} />
              </ThemeIcon>
            }
            active={matches.some((m) => m.routeId === "/configuration")}
            onClick={() => handleNavigate("/configuration")}
          />
          <NavLink
            label={formatMessage(translations.remoteReplicationNavItem)}
            leftSection={
              <ThemeIcon variant="light" size="sm">
                <IconManualGearbox size={16} />
              </ThemeIcon>
            }
            active={matches.some((m) => m.routeId === "/remoteReplication")}
            onClick={() => handleNavigate("/remoteReplication")}
          />
          <NavLink
            label={formatMessage(translations.reportsNavItem)}
            leftSection={
              <ThemeIcon variant="light" size="sm">
                <IconReport size={16} />
              </ThemeIcon>
            }
            onClick={() => onNavigate?.()}
          />
          <NavLink
            label={formatMessage(translations.metricsAndAnalysisNavItem)}
            leftSection={
              <ThemeIcon variant="light" size="sm">
                <IconChartBar size={16} />
              </ThemeIcon>
            }
            onClick={() => onNavigate?.()}
          />
        </Stack>
        <Stack>
          <ThemeSeLector />
          <LocaleSelector />
        </Stack>
      </Stack>
    </AppShell.Navbar>
  );
};
