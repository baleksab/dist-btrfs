import { use } from "react";
import { ThemeContext } from "../../context";
import type { Theme } from "../../providers";
import { Select } from "@mantine/core";
import { useIntl } from "react-intl";
import { translations } from "./translations";

export const ThemeSeLector = () => {
  const { formatMessage } = useIntl();
  const { theme, setTheme } = use(ThemeContext);

  const data = [
    { value: "light", label: formatMessage(translations.light) },
    { value: "dark", label: formatMessage(translations.dark) }
  ];

  const handleChange = (newTheme: string | null) => {
    if (!newTheme) {
      return;
    }

    setTheme(newTheme as Theme);
    localStorage.setItem("theme", newTheme);
  };

  return <Select size="sm" radius="md" value={theme} onChange={handleChange} data={data} />;
};
