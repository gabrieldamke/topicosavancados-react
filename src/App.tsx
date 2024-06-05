import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/routes";
import Header from "./components/Header";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <BrowserRouter>
          <Header />
          <Routes />
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
