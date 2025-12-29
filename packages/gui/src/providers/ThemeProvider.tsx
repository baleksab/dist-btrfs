import type { ReactNode } from "react";
import { ThemeContext } from "../context";

export type Theme = "light" | "dark";

export type ThemeProviderProps = {
  theme: Theme;
  setTheme: (loc: Theme) => void;
  children: ReactNode;
};

export const ThemeProvider = ({ children, theme, setTheme }: ThemeProviderProps) => {
  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
};
