import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

const queryclient = new QueryClient();

createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryclient}>
      <App /> 
    </QueryClientProvider>
  </StrictMode>
);
