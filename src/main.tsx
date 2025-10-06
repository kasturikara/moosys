import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import RootLayout from "./components/layout/RootLayout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootLayout>
      <BrowserRouter>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </RootLayout>
  </StrictMode>
);
