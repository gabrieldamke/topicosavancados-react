import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pessoa } from "../api/ApiProvider";
import { AppThunk } from "./store";
import {
  clearCurrentPessoa,
  loadFromLocalStorage,
  saveCurrentPessoa,
  saveToLocalStorage,
} from "../helper/helpers";
import { redirect } from "react-router-dom";

interface AuthState {
  pessoa: Pessoa | null;
}

const initialState: AuthState = {
  pessoa: null,
};

const FakeAuthenticationStore = createSlice({
  name: "fakeAuthenticationState",
  initialState,
  reducers: {
    setPessoa(state, action: PayloadAction<Pessoa>) {
      state.pessoa = action.payload;
    },
    clearPessoa(state) {
      state.pessoa = null;
    },
  },
});

export const { setPessoa, clearPessoa } = FakeAuthenticationStore.actions;
/* 
export const register =
  (pessoa: Pessoa): AppThunk =>
  async (dispatch) => {
    const pessoas = loadFromLocalStorage();
    pessoa.id = new Date().getTime();
    pessoas.push(pessoa);
    saveToLocalStorage(pessoas);
    dispatch(setPessoa(pessoa));
    dispatch(login(String(pessoa.email), String(pessoa.password)));
  };

export const login =
  (email: string, password: string): AppThunk =>
  async (dispatch) => {
    const pessoas = loadFromLocalStorage();
    const foundPessoa = pessoas.find(
      (p) => p.email === email && p.password === password
    );
    if (foundPessoa) {
      dispatch(setPessoa(foundPessoa));
      saveCurrentPessoa(foundPessoa);
    } else {
      alert("Usuário ou senha incorretos!");
      throw new Error();
    }
  };
  */

export const logout = (): AppThunk => async (dispatch) => {
  dispatch(clearPessoa());
  clearCurrentPessoa();
};
export default FakeAuthenticationStore.reducer;
