"use client";

import { useRef, type FC, type ReactNode } from "react";
import { ENTRADA, SEM_MOVIMENTO_REDUZIDO, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

type RevelarAoRolarProps = {
  children: ReactNode;
  className?: string;
};

// Revela os itens marcados com data-revelar quando entram na tela, em lotes
// (ScrollTrigger.batch, como pede a skill de ScrollTrigger para listas: um
// gatilho para o grupo, não um por item). Com movimento reduzido, nada muda.
const INICIO = "top 88%";
const DESLOCAMENTO = 24;
const INTERVALO = 0.08;

export const RevelarAoRolar: FC<RevelarAoRolarProps> = ({ children, className }) => {
  const raiz = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const itens = raiz.current?.querySelectorAll<HTMLElement>("[data-revelar]");
      if (!itens?.length) return;

      gsap.matchMedia().add(SEM_MOVIMENTO_REDUZIDO, () => {
        gsap.set(itens, { autoAlpha: 0, y: DESLOCAMENTO });
        ScrollTrigger.batch(itens, {
          start: INICIO,
          once: true,
          onEnter: (lote) => {
            gsap.to(lote, {
              autoAlpha: 1,
              y: 0,
              duration: ENTRADA.duracao,
              ease: ENTRADA.curva,
              stagger: INTERVALO,
              overwrite: true,
            });
          },
        });
      });
    },
    { scope: raiz },
  );

  return (
    <div ref={raiz} className={className}>
      {children}
    </div>
  );
};
