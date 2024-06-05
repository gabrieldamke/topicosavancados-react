import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "./store";
import { enqueueSnackbar } from "notistack";
import { Client, Medicao, MedicaoDTO } from "../api/ApiProvider";

const MedicaoStore = createSlice({
  name: "medicaoState",
  initialState: {
    medicao: {} as Medicao,
    medicoes: [] as Medicao[],
  },
  reducers: {
    setMedicao(state, action: PayloadAction<Medicao>) {
      state.medicao = action.payload;
    },
    setMedicoes(state, action: PayloadAction<Medicao[]>) {
      state.medicoes = action.payload;
    },
  },
});

export const { setMedicao, setMedicoes } = MedicaoStore.actions;

export function GetMedicoes(): AppThunk {
  return async function (dispatch: any) {
    try {
      const client = new Client();
      const res = await client.getAllMedicoes();
      dispatch(setMedicoes(res));
    } catch (error) {
      console.error("Ocorreu um erro: " + error);
      enqueueSnackbar("Ocorreu um erro ao obter as medições", {
        variant: "error",
      });
    }
  };
}

export function GetMedicaoById(id: number): AppThunk {
  return async function (dispatch: any) {
    try {
      const client = new Client();
      const medicao = await client.getMedicaoById(id);
      dispatch(setMedicao(medicao));
    } catch (error) {
      console.error("Ocorreu um erro: " + error);
      enqueueSnackbar("Ocorreu um erro ao obter a medição", {
        variant: "error",
      });
    }
  };
}

export function AdicionarMedicao(medicao: MedicaoDTO): AppThunk {
  return async function (dispatch: any) {
    try {
      const client = new Client();
      const newMedicao = await client.createMedicao(medicao);
      dispatch(setMedicao(newMedicao));
      enqueueSnackbar("Medição adicionada com sucesso", { variant: "success" });
      dispatch(GetMedicoes()); // Optionally refresh list after adding
    } catch (error) {
      console.error("Ocorreu um erro: " + error);
      enqueueSnackbar("Ocorreu um erro ao adicionar a medição", {
        variant: "error",
      });
    }
  };
}

export function UpdateMedicao(medicao: MedicaoDTO): AppThunk {
  return async function (dispatch: any) {
    try {
      const client = new Client();
      const updatedMedicao = await client.updateMedicao(medicao.id, medicao);
      dispatch(setMedicao(updatedMedicao));
      enqueueSnackbar("Medição atualizada com sucesso", { variant: "success" });
      dispatch(GetMedicoes()); // Refresh the list
    } catch (error) {
      console.error("Ocorreu um erro: " + error);
      enqueueSnackbar("Ocorreu um erro ao atualizar a medição", {
        variant: "error",
      });
    }
  };
}

export function DeletarMedicao(id: number): AppThunk {
  return async function (dispatch: any) {
    try {
      const client = new Client();
      await client.deleteMedicao(id);
      enqueueSnackbar("Medição deletada com sucesso", { variant: "success" });
      dispatch(GetMedicoes()); // Refresh the list
    } catch (error) {
      console.error("Ocorreu um erro: " + error);
      enqueueSnackbar("Ocorreu um erro ao deletar a medição", {
        variant: "error",
      });
    }
  };
}

export default MedicaoStore.reducer;
