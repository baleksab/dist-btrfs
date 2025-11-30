import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import { I18nProvider, RoutesProvider, type Locale } from "./providers";
import "@mantine/core/styles.css";
import { LocaleContext } from "./context";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

const queryclient = new QueryClient();

const App = () => {
  const [locale, setLocale] = useState<Locale>(
    (localStorage.getItem("locale") as Locale) || "en"
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <I18nProvider locale={locale}>
        <RoutesProvider />
      </I18nProvider>
    </LocaleContext.Provider>
  );
};

createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryclient}>
      <MantineProvider>
        <I18nProvider locale="en">
          <App />
        </I18nProvider>
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>
);
