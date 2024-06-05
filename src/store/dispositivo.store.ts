import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk, AppDispatch } from "./store";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { Client, Dispositivo, DispositivoDTO } from "../api/ApiProvider";

const DispositivoStore = createSlice({
  name: "dispositivoState",
  initialState: {
    dispositivo: {} as Dispositivo,
    dispositivos: [] as Dispositivo[],
  },
  reducers: {
    setDispositivo(state, action: PayloadAction<Dispositivo>) {
      state.dispositivo = action.payload;
    },
    setDispositivos(state, action: PayloadAction<Dispositivo[]>) {
      state.dispositivos = action.payload;
    },
  },
});

export const { setDispositivos, setDispositivo } = DispositivoStore.actions;

export function GetDispositivos(): AppThunk {
  return async function (dispatch: any) {
    try {
      const client = new Client();
      const res = await client.getAllDispositivos();
      dispatch(setDispositivos(res));
    } catch (error) {
      console.error("Ocorreu um erro: " + error);
      enqueueSnackbar("Ocorreu um erro ao obter os dispositivos", {
        variant: "error",
      });
    }
  };
}

export function GetDispositivoById(id: number): AppThunk {
  return async function (dispatch: any) {
    try {
      const client = new Client();
      dispatch(setDispositivo(await client.getDispositivo(id)));
    } catch (error) {
      console.error("Ocorreu um erro: " + error);
      enqueueSnackbar("Ocorreu um erro ao obter o dispositivo", {
        variant: "error",
      });
    }
  };
}

export function AdicionarDispositivo(
  dispositivo: DispositivoDTO,
  update?: boolean
): AppThunk {
  return async function (dispatch: any) {
    try {
      if (!dispositivo) throw new Error("Dispositivo não informado");
      const client = new Client();
      dispatch(
        setDispositivo(
          await client.createDispositivo({
            nome: dispositivo.nome,
            descricao: dispositivo.descricao,
            longitude: dispositivo.longitude,
            latitude: dispositivo.latitude,
            gatewayId: dispositivo.gatewayId,
            sensoresIds: dispositivo.sensoresIds,
            atuadoresIds: dispositivo.atuadoresIds,
          } as DispositivoDTO)
        )
      );
      if (update) {
        const updated = await client.getAllDispositivos();
        dispatch(setDispositivos(updated));
      }
      enqueueSnackbar("Dispositivo adicionado com sucesso", {
        variant: "success",
      });
    } catch (error) {
      console.error("Ocorreu um erro: " + error);
      enqueueSnackbar("Ocorreu um erro ao adicionar o dispositivo", {
        variant: "error",
      });
    }
  };
}

export function UpdateDispositivo(
  dispositivo: DispositivoDTO,
  update: boolean
): AppThunk {
  return async function (dispatch: any) {
    try {
      if (!dispositivo) throw new Error("Dispositivo não informado");
      if (!dispositivo.id) throw new Error("Id do dispositivo não informado");
      const client = new Client();
      const res = await client.updateDispositivo(
        dispositivo.id,
        dispositivo as DispositivoDTO
      );
      dispatch(setDispositivo(res));
      if (update) {
        const update = await client.getAllDispositivos();
        dispatch(setDispositivos(update));
      }
      enqueueSnackbar("Dispositivo atualizado com sucesso", {
        variant: "success",
      });
    } catch (error) {
      console.error("Ocorreu um erro: " + error);
      enqueueSnackbar("Ocorreu um erro ao atualizar o dispositivo", {
        variant: "error",
      });
    }
  };
}

export function DeletarDispositivo(id: number | undefined): AppThunk {
  return async function (dispatch: any) {
    if (!id) throw new Error(`Informe o id do Dispositivo`);
    try {
      const client = new Client();
      await client.deletedisposiitvo(id);
      enqueueSnackbar("Dispositivo deletado com sucesso", {
        variant: "success",
      });
      dispatch(GetDispositivos());
    } catch (error) {
      console.error("Ocorreu um erro: " + error);
      enqueueSnackbar("Ocorreu um erro ao deletar o dispositivo", {
        variant: "error",
      });
    }
  };
}

export default DispositivoStore.reducer;
