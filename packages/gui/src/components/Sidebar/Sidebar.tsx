import { AppShell, ScrollArea, Text, UnstyledButton, Group, rem } from "@mantine/core";
import { useState } from "react";
import type { ReactNode } from "react";
import { useIntl } from "react-intl";
import { translations } from "./translations";

export type SidebarItem = {
  label: string;
  icon?: ReactNode;
  value?: string;
};

export type SidebarProps = {
  items: SidebarItem[];
  width?: number;
  onItemClick?: (item: SidebarItem) => void;
};

export const Sidebar = ({ items, width = 260, onItemClick }: SidebarProps) => {
  const { formatMessage } = useIntl();
  const [active, setActive] = useState<number | null>(null);

  const handleClick = (item: SidebarItem, index: number) => {
    setActive(index);
    onItemClick?.(item);
  };

  return (
    <AppShell.Navbar p="md" w={width}>
      <Text size="sm" fw={700} mb="md" opacity={0.6} tt="uppercase">
        {formatMessage(translations.sidebarTitle)}
      </Text>

      <ScrollArea style={{ flex: 1 }}>
        {items.map((item, index) => {
          const isActive = index === active;

          return (
            <UnstyledButton
              key={index}
              onClick={() => handleClick(item, index)}
              style={{
                width: "100%",
                padding: `${rem(10)} ${rem(14)}`,
                borderRadius: rem(8),
                display: "flex",
                alignItems: "center",
                gap: rem(10),
                backgroundColor: isActive ? "var(--mantine-color-blue-light)" : "transparent",
                color: isActive ? "var(--mantine-color-blue-filled)" : "var(--mantine-color-text)",
                fontWeight: isActive ? 600 : 500,
                borderLeft: isActive ? `${rem(3)} solid var(--mantine-color-blue-filled)` : `${rem(3)} solid transparent`,
                transition: "background-color 120ms ease, color 120ms ease"
              }}
            >
              <Group gap={10}>
                {item.icon}
                <Text size="sm">{item.label}</Text>
              </Group>
            </UnstyledButton>
          );
        })}
      </ScrollArea>
    </AppShell.Navbar>
  );
};
