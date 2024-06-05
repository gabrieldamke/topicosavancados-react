import { Pessoa } from "../api/ApiProvider";

export const saveToLocalStorage = (pessoas: Pessoa[]) => {
  localStorage.setItem("usuarios", JSON.stringify(pessoas));
};

export const loadFromLocalStorage = (): Pessoa[] => {
  const data = localStorage.getItem("usuarios");
  return data ? JSON.parse(data) : [];
};

export const saveCurrentPessoa = (pessoa: Pessoa) => {
  localStorage.setItem("currentUser", JSON.stringify(pessoa));
};

export const loadCurrentPessoa = (): Pessoa | null => {
  const data = localStorage.getItem("currentUser");
  return data ? JSON.parse(data) : null;
};

export const clearCurrentPessoa = () => {
  localStorage.removeItem("currentUser");
};
