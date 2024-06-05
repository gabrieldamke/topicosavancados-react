import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Client } from "./ApiProvider";

export default class ApiFactory {
  private static handleResponse = (response: AxiosResponse) => {
    return response;
  };

  public static GetClient(
    update?: boolean,
    email?: string,
    senha?: string
  ): Client {
    const axiosInstance = axios.create();

    axiosInstance.interceptors.response.use(this.handleResponse);

    if (update && email && senha) {
      const credentials = window.btoa(email + ":" + senha);
      axiosInstance.defaults.headers.common["Authorization"] =
        "Basic " + credentials;
    }
    console.log(axiosInstance.defaults.headers.common["Authorization"]);
    const client = new Client("https://localhost:7239", axiosInstance);
    return client;
  }

  public static updateClient(email: string, senha: string) {
    this.GetClient(true, email, senha);
  }
}
