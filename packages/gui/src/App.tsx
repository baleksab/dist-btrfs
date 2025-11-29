import { AppShell } from "@mantine/core";
import { IconHome, IconUsers, IconSettings } from "@tabler/icons-react";
import { Sidebar } from "./components";

const App = () => {
  const menuItems = [
    { label: "Home", icon: <IconHome size={18} /> },
    { label: "Users", icon: <IconUsers size={18} /> },
    { label: "Settings", icon: <IconSettings size={18} /> },
    { label: "Reports" },
    { label: "Analytics" },
  ];

  return (
    <AppShell navbar={{ width: 260, breakpoint: "sm" }} padding="md">
      <Sidebar items={menuItems}/>
      <div>test</div>
    </AppShell>
  );
};

export default App;
