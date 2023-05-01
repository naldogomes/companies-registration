import axios from "axios";

export const DataCep = (cep: string) => {
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  const api = axios.get(url);
  return api;
};
