import { useSyncExternalStore } from "react";

const CONSULTA = "(prefers-reduced-motion: reduce)";

const assinar = (avisar: () => void) => {
  const consulta = window.matchMedia(CONSULTA);
  consulta.addEventListener("change", avisar);
  return () => consulta.removeEventListener("change", avisar);
};

const lerNoNavegador = () => window.matchMedia(CONSULTA).matches;
// No servidor não há preferência a ler; o navegador corrige na hidratação.
const lerNoServidor = () => false;

export const usePrefereMovimentoReduzido = () => {
  return useSyncExternalStore(assinar, lerNoNavegador, lerNoServidor);
};
