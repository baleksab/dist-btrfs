import { AppShell } from "@mantine/core";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "../components";

const RootLayout = () => {
  return (
    <AppShell navbar={{ width: 240, breakpoint: "sm" }} padding="md">
      <Sidebar />
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export const Route = createRootRoute({
  component: RootLayout
});
