import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "./store";
import { AppDispatch } from "./store";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import {
  Client,
  Pessoa,
  PessoaDTO,
  PessoaRegisterDTO,
} from "../api/ApiProvider";
import { saveCurrentPessoa } from "../helper/helpers";
const PessoaStore = createSlice({
  name: "pessoaState",
  initialState: {
    pessoa: {} as Pessoa,
    pessoas: {} as Pessoa[],
  },
  reducers: {
    setPessoa(state, action: PayloadAction<Pessoa>) {
      state.pessoa = action.payload;
    },
    setPessoas(state, action: PayloadAction<Pessoa[]>) {
      state.pessoas = action.payload;
    },
  },
});

export const { setPessoas, setPessoa } = PessoaStore.actions;

export function GetPessoas(): AppThunk {
  return async function (dispatch: AppDispatch | any) {
    try {
      const client = new Client();
      const res = await client.getAllPessoas();
      dispatch(setPessoas(res));
    } catch (error) {
      console.error("Ocorreu um erro: " + error);
      enqueueSnackbar("Ocorreu um erro ao obter as pessoas", {
        variant: "error",
      });
    }
  };
}

export function GetPessoaById(id: number): AppThunk {
  return async function (dispatch: AppDispatch | any) {
    try {
      const client = new Client();
      dispatch(setPessoa(await client.getPessoaById(id)));
    } catch (error) {
      console.error("Ocorreu um erro: " + error);
      enqueueSnackbar("Ocorreu um erro a obter a pessoa", {
        variant: "error",
      });
    }
  };
}

export function login(email: string, password: string): AppThunk {
  return async function (dispatch: AppDispatch | any) {
    try {
      const client = new Client();
      const pessoas = await client.getAllPessoas();
      const foundPessoa = pessoas.find((pessoa) => pessoa.email === email);

      if (foundPessoa && foundPessoa.password === password) {
        dispatch(setPessoa(foundPessoa));
        saveCurrentPessoa(foundPessoa);
      } else {
        enqueueSnackbar("Usuário ou senha incorretos", { variant: "error" });
      }
    } catch (error) {
      console.error("Ocorreu um erro: " + error);
      enqueueSnackbar("Ocorreu um erro ao tentar obter a pessoa", {
        variant: "error",
      });
    }
  };
}

export function register(
  email: string,
  password: string,
  nome: string
): AppThunk {
  return async function (dispatch: AppDispatch | any) {
    try {
      const client = new Client();
      const pessoas = await client.getAllPessoas();
      const foundPessoa = pessoas.find((pessoa) => pessoa.email === email);

      if (foundPessoa) {
        enqueueSnackbar("Email já está em uso", { variant: "error" });
      } else {
        const newPessoa = {
          email,
          password,
          nome,
        } as PessoaDTO;

        const savedPessoa = await client.createPessoa(newPessoa);
        dispatch(setPessoa(savedPessoa));
        localStorage.setItem("email", email);
        enqueueSnackbar("Usuário registrado com sucesso!", {
          variant: "success",
        });
      }
    } catch (error) {
      console.error("Ocorreu um erro: " + error);
      enqueueSnackbar("Ocorreu um erro durante o registro", {
        variant: "error",
      });
    }
  };
}

export function UpdatePessoa(pessoa: Pessoa): AppThunk {
  return async function (dispatch: AppDispatch | any) {
    try {
      if (!pessoa) throw new Error("Pessoa não informada");
      if (!pessoa.id) throw new Error("Id da pessoa não informada");
      const client = new Client();
      dispatch(
        setPessoa(
          await client.updatePessoa(pessoa.id, {
            nome: pessoa.nome,
            password: pessoa.password,
            email: pessoa.email,
          } as PessoaDTO)
        )
      );
    } catch (error) {
      console.error("Ocorreu um erro: " + error);
      enqueueSnackbar("Ocorreu um erro ao editar a pessoa", {
        variant: "error",
      });
    }
  };
}

export function DeletarPessoa(pessoa: Pessoa): AppThunk {
  return async function (dispatch: AppDispatch | any) {
    try {
      throw new Error("Função não implementada no backend");
    } catch (error) {
      console.error("Ocorreu um erro: " + error);
      enqueueSnackbar("Ocorreu um erro ao deletar a pessoa", {
        variant: "error",
      });
    }
  };
}

export default PessoaStore.reducer;
