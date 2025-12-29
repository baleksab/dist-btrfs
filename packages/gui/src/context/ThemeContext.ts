import { createContext } from "react";
import { noop } from "@mantine/core";
import type { Theme } from "../providers";

export const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (loc: Theme) => void;
}>({
  theme: "light",
  setTheme: noop
});
