import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif", // Set global font
    h1: {
      fontFamily: "Poppins, sans-serif",
      fontWeight: 600,
    },
    body1: {
      fontFamily: "Poppins, sans-serif",
      fontWeight: 400,
    },
  },
});

export default theme;
