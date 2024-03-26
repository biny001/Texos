import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IconContext } from "react-icons";
import { Toaster } from "react-hot-toast";
import "./index.css";
import AuthProvider from "./Context/AuthProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const query = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster position="top-center" />
    <QueryClientProvider client={query}>
      <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </IconContext.Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
