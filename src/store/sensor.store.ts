import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "./store";
import { enqueueSnackbar } from "notistack";
import { Client, Sensor, SensorDTO } from "../api/ApiProvider";

const SensorStore = createSlice({
  name: "sensorState",
  initialState: {
    sensor: {} as Sensor,
    sensores: [] as Sensor[],
  },
  reducers: {
    setSensor(state, action: PayloadAction<Sensor>) {
      state.sensor = action.payload;
    },
    setSensores(state, action: PayloadAction<Sensor[]>) {
      state.sensores = action.payload;
    },
  },
});

export const { setSensores, setSensor } = SensorStore.actions;

export function GetSensores(): AppThunk {
  return async function (dispatch: any) {
    try {
      const client = new Client();
      const res = await client.getAllSensors();
      dispatch(setSensores(res));
    } catch (error) {
      console.error("Ocorreu um erro: " + error);
      enqueueSnackbar("Ocorreu um erro ao obter os sensores", {
        variant: "error",
      });
    }
  };
}

export function GetSensorById(id: number): AppThunk {
  return async function (dispatch: any) {
    try {
      const client = new Client();
      const sensor = await client.getSensorById(id);
      dispatch(setSensor(sensor));
    } catch (error) {
      console.error("Ocorreu um erro: " + error);
      enqueueSnackbar("Ocorreu um erro ao obter o sensor", {
        variant: "error",
      });
    }
  };
}

export function AdicionarSensor(
  sensor: Sensor,
  dispositivoId: number
): AppThunk {
  return async function (dispatch: any) {
    try {
      const client = new Client();
      if (!sensor) throw new Error();
      const newSensor = await client.createSensor({
        nome: String(sensor.nome),
        tipo: String(sensor.tipo),
        medicoesIds: [],
        dispositivoId: dispositivoId,
      });
      dispatch(setSensor(newSensor));
      enqueueSnackbar("Sensor adicionado com sucesso", { variant: "success" });
    } catch (error) {
      console.error("Ocorreu um erro: " + error);
      enqueueSnackbar("Ocorreu um erro ao adicionar o sensor", {
        variant: "error",
      });
    }
  };
}

export function UpdateSensor(sensor: SensorDTO): AppThunk {
  return async function (dispatch: any) {
    try {
      const client = new Client();
      const updatedSensor = await client.updateSensor(sensor.id, sensor);
      dispatch(setSensor(updatedSensor));
      enqueueSnackbar("Sensor atualizado com sucesso", { variant: "success" });
      dispatch(GetSensores());
    } catch (error) {
      console.error("Ocorreu um erro: " + error);
      enqueueSnackbar("Ocorreu um erro ao atualizar o sensor", {
        variant: "error",
      });
    }
  };
}

export function DeletarSensor(id: number): AppThunk {
  return async function (dispatch: any) {
    try {
      const client = new Client();
      await client.deletesensor(id);
      enqueueSnackbar("Sensor deletado com sucesso", { variant: "success" });
      dispatch(GetSensores());
    } catch (error) {
      console.error("Ocorreu um erro: " + error);
      enqueueSnackbar("Ocorreu um erro ao deletar o sensor", {
        variant: "error",
      });
    }
  };
}

export default SensorStore.reducer;
