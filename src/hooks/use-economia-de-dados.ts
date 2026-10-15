import { useSyncExternalStore } from "react";

// O modo de economia de dados do navegador (navigator.connection.saveData) só
// existe nos navegadores do Chromium e não está nos tipos do TypeScript: a leitura
// valida o formato em vez de supor.
const lerNoNavegador = () => {
  const conexao: unknown = Reflect.get(navigator, "connection");
  return typeof conexao === "object" && conexao !== null && "saveData" in conexao && conexao.saveData === true;
};

const lerNoServidor = () => false;
const semAvisos = () => () => {};

export const useEconomiaDeDados = () => {
  return useSyncExternalStore(semAvisos, lerNoNavegador, lerNoServidor);
};
