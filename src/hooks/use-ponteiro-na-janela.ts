import { useEffect, useRef } from "react";

export type Ponteiro = { x: number; y: number };

// Posição do mouse na janela, de -1 a 1, numa ref: atualizar não causa render.
// Só em aparelhos com mouse; no toque não há o que acompanhar.
export const usePonteiroNaJanela = () => {
  const ponteiro = useRef<Ponteiro>({ x: 0, y: 0 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const atualizar = (evento: PointerEvent) => {
      ponteiro.current.x = (evento.clientX / window.innerWidth) * 2 - 1;
      ponteiro.current.y = (evento.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("pointermove", atualizar, { passive: true });
    return () => window.removeEventListener("pointermove", atualizar);
  }, []);

  return ponteiro;
};
