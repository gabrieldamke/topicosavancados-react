import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "./store";
import { enqueueSnackbar } from "notistack";
import { Client, Pessoa } from "../api/ApiProvider";

const AuthenticationStore = createSlice({
  name: "authenticationState",
  initialState: {
    pessoa: {} as Pessoa,
  },
  reducers: {
    setPessoa(state, action: PayloadAction<Pessoa>) {
      state.pessoa = action.payload;
    },
  },
});

export const { setPessoa } = AuthenticationStore.actions;
/* 
export function GetUsuarioAutenticado(): AppThunk {
  return async function (dispatch: any) {
    try {
      const client = new Client();
      const res = await client.authenticatedUser();
      dispatch(setPessoa(res));
    } catch (error) {
      console.error("Ocorreu um erro: " + error);
      enqueueSnackbar("Usuário não autenticado", {
        variant: "error",
      });
    }
  };
}
export function Signup(
  pessoaRegisterDTO: PessoaRegisterDTO,
  login?: boolean
): AppThunk {
  return async function (dispatch: any) {
    try {
      const client = new Client();
      const res = await client.register(pessoaRegisterDTO);
      dispatch(setPessoa(res));
      if (login) {
        const token = await client.authenticate({
          email: pessoaRegisterDTO.email,
          password: pessoaRegisterDTO.password,
        } as PessoaLoginDto);
      }
    } catch (error) {
      console.error("Ocorreu um erro: " + error);
      enqueueSnackbar("Erro ao registrar o usuário", {
        variant: "error",
      });
    }
  };
}

export function Signin(pessoaLoginDto: PessoaLoginDto): AppThunk {
  return async function (dispatch: any) {
    try {
      const client = new Client();
      const res = await client.authenticate(pessoaLoginDto);
      dispatch(setPessoa(res));
    } catch (error) {
      console.error("Ocorreu um erro: " + error);
      enqueueSnackbar("Erro ao registrar o usuário", {
        variant: "error",
      });
    }
  };
}
*/
export default AuthenticationStore.reducer;
