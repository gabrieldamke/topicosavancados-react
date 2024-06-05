import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk, AppDispatch } from "./store";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { Client, Gateway, GatewayDto } from "../api/ApiProvider";
import { loadCurrentPessoa } from "../helper/helpers";

const GatewayStore = createSlice({
  name: "gatewayState",
  initialState: {
    gateway: {} as Gateway,
    gateways: [] as Gateway[],
  },
  reducers: {
    setGateway(state, action: PayloadAction<Gateway>) {
      state.gateway = action.payload;
    },
    setGateways(state, action: PayloadAction<Gateway[]>) {
      state.gateways = action.payload;
    },
  },
});

export const { setGateways, setGateway } = GatewayStore.actions;

export function GetGateways(): AppThunk {
  return async function (dispatch: any) {
    try {
      const client = new Client();
      const res = await client.getAllGateways();
      dispatch(setGateways(res));
    } catch (error) {
      console.error("Ocorreu um erro: " + error);
      enqueueSnackbar("Ocorreu um erro ao obter os gateways", {
        variant: "error",
      });
    }
  };
}

export function GetGatewayById(id: number): AppThunk {
  return async function (dispatch: any) {
    try {
      const client = new Client();
      dispatch(setGateway(await client.getGatewayById(id)));
    } catch (error) {
      console.error("Ocorreu um erro: " + error);
      enqueueSnackbar("Ocorreu um erro ao obter o gateway", {
        variant: "error",
      });
    }
  };
}

export function AdicionarGateway(
  gateway: GatewayDto,
  update?: boolean
): AppThunk {
  return async function (dispatch: any) {
    try {
      const authenticatedUser = loadCurrentPessoa();
      if (!authenticatedUser) throw new Error("Não autenticado");

      if (!gateway) throw new Error("Gateway não informado");
      const client = new Client();
      dispatch(
        setGateway(
          await client.createGateway({
            nome: gateway.nome,
            descricao: gateway.descricao,
            endereco: gateway.endereco,
            dispositivosIds: gateway.dispositivosIds,
            pessoaId: authenticatedUser.id,
          } as GatewayDto)
        )
      );
      if (update) {
        const updated = await client.getAllGateways();
        dispatch(setGateways(updated));
      }
      enqueueSnackbar("Gateway adicionado com sucesso", {
        variant: "success",
      });
    } catch (error) {
      console.error("Ocorreu um erro: " + error);
      enqueueSnackbar("Ocorreu um erro ao editar o gateway", {
        variant: "error",
      });
    }
  };
}

export function UpdateGateway(gateway: GatewayDto, update: boolean): AppThunk {
  return async function (dispatch: any) {
    try {
      if (!gateway) throw new Error("Gateway não informado");
      if (!gateway.id) throw new Error("Id do gateway não informado");
      const client = new Client();
      const res = await client.updateGateway(gateway.id, {
        nome: gateway.nome,
        descricao: gateway.descricao,
        endereco: gateway.endereco,
        dispositivosIds: gateway.dispositivosIds,
        pessoaId: gateway.pessoaId,
      } as GatewayDto);
      dispatch(setGateway(res));
      if (update) {
        const update = await client.getAllGateways();
        dispatch(setGateways(update));
      }
      enqueueSnackbar("Gateway atualizado com sucesso", {
        variant: "success",
      });
    } catch (error) {
      console.error("Ocorreu um erro: " + error);
      enqueueSnackbar("Ocorreu um erro ao editar o gateway", {
        variant: "error",
      });
    }
  };
}

export function DeletarGateway(id: number | undefined): AppThunk {
  return async function (dispatch: any) {
    if (!id) throw new Error(`Informe o id do Gateway`);
    try {
      const client = new Client();
      await client.deleteGateway(id);
      enqueueSnackbar("Gateway deletado com sucesso", {
        variant: "success",
      });
      dispatch(GetGateways());
    } catch (error) {
      console.error("Ocorreu um erro: " + error);
      enqueueSnackbar("Ocorreu um erro ao deletar o gateway", {
        variant: "error",
      });
    }
  };
}

export default GatewayStore.reducer;
