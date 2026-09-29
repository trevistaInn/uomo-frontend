import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CardProvider from "./contexts/StylesContext.jsx";
import App from "./App.jsx";
import "./index.css";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <CardProvider>
        <App />
      </CardProvider>
    </QueryClientProvider>
  </StrictMode>
);
