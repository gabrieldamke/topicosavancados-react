import React from "react";
import { AppBar, Toolbar, Typography, Button, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const theme = useTheme();

  const location = useLocation();

  if (["/", "/logar", "/registrar"].includes(location.pathname)) {
    return null;
  }
  return (
    <AppBar
      position="static"
      style={{ backgroundColor: theme.palette.primary.dark }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: theme.palette.info.contrastText }}
        >
          Trevisan IoT
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to="/dashboard"
          style={{ color: theme.palette.secondary.contrastText }}
        >
          Dashboard
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/gateway"
          style={{ color: theme.palette.secondary.contrastText }}
        >
          Gateways
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/dispositivo"
          style={{ color: theme.palette.secondary.contrastText }}
        >
          Dispositivos
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/sensores"
          style={{ color: theme.palette.secondary.contrastText }}
        >
          Sensores
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/medicao"
          style={{ color: theme.palette.secondary.contrastText }}
        >
          Medições
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
