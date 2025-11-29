import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { I18nProvider } from "./providers/I18nProvider";

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
          <App /> 
        </I18nProvider>
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>
);
