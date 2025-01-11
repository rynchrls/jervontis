import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@mui/material";
import theme from "../theme.js";
import axios from "axios";

axios.defaults.baseURL =
  import.meta.env.VITE_SOCKET_HOST || "https://jervontis.onrender.com";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
