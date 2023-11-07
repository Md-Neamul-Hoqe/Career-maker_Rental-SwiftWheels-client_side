import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Routes from "./Routes/Routes.jsx";
import { RouterProvider } from "react-router-dom";
import AuthProviders from "./Auth/AuthProviders.jsx";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProviders>
        <HelmetProvider>
          <RouterProvider router={Routes} />
        </HelmetProvider>
      </AuthProviders>
    </QueryClientProvider>
  </React.StrictMode>
);
