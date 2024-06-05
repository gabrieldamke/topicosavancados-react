import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#d32f2f",
    },
    background: {
      default: "#e3f2fd",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          border: "1px solid #1976d2",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#1976d2",
        },
      },
    },
  },
});

export default theme;
