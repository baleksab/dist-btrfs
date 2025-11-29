import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import { I18nProvider, RoutesProvider } from "./providers";
import "@mantine/core/styles.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

const queryclient = new QueryClient();

createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryclient}>
      <MantineProvider>
        <I18nProvider locale="en">
          <RoutesProvider />
        </I18nProvider>
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>
);
