import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect } from "react";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { GetPessoas } from "../../store/pessoa.store";
import { saveCurrentPessoa } from "../../helper/helpers";
import MapaDispositivos from "../../components/MapaDispositivos";


export default function Dashboard() {
  const dispositivos = useSelector(
    (root: RootState) => root.dispositivo.dispositivos
  );
  const sensores = useSelector((root: RootState) => root.sensor.sensores);
  const gateways = useSelector((root: RootState) => root.gateway.gateways);

  return (
    <div className="flex h-screen">
      <div className="flex-1">
        <MapaDispositivos dispositivos={dispositivos} />
      </div>
      <div className="w-80 bg-gray-100 p-4 space-y-4">
        <div className="card bg-white p-3 shadow rounded">
          <p>Dispositivos</p>
          <p>{dispositivos.length}</p>
        </div>
        <div className="card bg-white p-3 shadow rounded">
          <p>Sensores</p>
          <p>{sensores.length}</p>
        </div>
        <div className="card bg-white p-3 shadow rounded">
          <p>Gateways</p>
          <p>{gateways.length}</p>
        </div>
      </div>
    </div>
  );
}
