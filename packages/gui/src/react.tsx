import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import { I18nProvider, RoutesProvider, ThemeProvider, type Locale, type Theme } from "./providers";
import { LocaleContext } from "./context";
import "@mantine/core/styles.css";
import "@formatjs/intl-durationformat/polyfill.js";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

const queryclient = new QueryClient();

const App = () => {
  const [locale, setLocale] = useState<Locale>((localStorage.getItem("locale") as Locale) || "en");
  const [theme, setTheme] = useState<Theme>((localStorage.getItem("theme") as Theme) || "light");

  return (
    <QueryClientProvider client={queryclient}>
      <MantineProvider forceColorScheme={theme}>
        <ThemeProvider theme={theme} setTheme={setTheme}>
          <LocaleContext value={{ locale, setLocale }}>
            <I18nProvider locale={locale}>
              <RoutesProvider />
            </I18nProvider>
          </LocaleContext>
        </ThemeProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
