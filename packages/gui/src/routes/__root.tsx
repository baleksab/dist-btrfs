import { AppShell } from "@mantine/core";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "../components";

const RootLayout = () => {
  return (
    <AppShell navbar={{ width: 240, breakpoint: "xs" }} padding="md">
      <Sidebar />
      <AppShell.Main pos="relative">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export const Route = createRootRoute({
  component: RootLayout
});
