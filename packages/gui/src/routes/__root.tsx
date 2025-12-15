import { AppShell, Burger, Group, Text } from "@mantine/core";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "../components";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const RootLayout = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 48em)"); // sm breakpoint

  return (
    <AppShell
      header={isMobile ? { height: 48 } : undefined}
      navbar={{
        width: 240,
        breakpoint: "sm",
        collapsed: { mobile: !opened }
      }}
      padding="md"
    >
      <AppShell.Header hiddenFrom="sm">
        <Group h="100%" px="md" gap="sm" flex="flex" align="center">
          <Burger opened={opened} onClick={toggle} size="sm" />
          <Text size="xl" fw={700} opacity={0.6} tt="uppercase">
            dist-btrfs
          </Text>
        </Group>
      </AppShell.Header>
      <Sidebar onNavigate={close} />
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export const Route = createRootRoute({
  component: RootLayout
});
