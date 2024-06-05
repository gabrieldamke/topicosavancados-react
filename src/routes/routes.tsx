import {
  BrowserRouter,
  Routes as RouterContext,
  Route,
} from "react-router-dom";

import React from "react";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import GatewayList from "../pages/gateway/GatewayList";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import DispositivoList from "../pages/dispositivo/DispositivoList";
import Dashboard from "../pages/Dashboard/Dashboard";
import SensorList from "../pages/sensores/SensoresList";

const Routes = () => {
  return (
    <RouterContext>
      <Route path="/" element={<Home />} index />
      <Route path="*" element={<NotFound />} />
      <Route path="/gateway" element={<GatewayList />} />
      <Route path="/logar" element={<LoginPage />} />
      <Route path="/registrar" element={<RegisterPage />} />
      <Route path="/dispositivo" element={<DispositivoList />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/sensores" element={<SensorList />} />
    </RouterContext>
  );
};
export default Routes;
