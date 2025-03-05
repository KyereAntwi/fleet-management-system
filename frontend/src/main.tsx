import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router";
import Auth0ProviderWithHistory from "./auth/Auth0ProviderWithHistory";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Auth0ProviderWithHistory>
          <QueryClientProvider client={new QueryClient()}>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </Auth0ProviderWithHistory>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
