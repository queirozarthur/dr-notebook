"use client";

import { useCallback, useRef, type FC, type ReactNode } from "react";
import { ENTRADA, SEM_MOVIMENTO_REDUZIDO, gsap, useGSAP } from "@/lib/gsap";

type RevelarEmSequenciaProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "span";
  atraso?: number;
};

// Cada filho direto entra em sequência (skill ui-motion). O elemento nasce
// escondido pelo CSS de [data-animacao="entrada"] e só aparece quando o GSAP
// assume; com movimento reduzido, nada é escondido nem animado.
export const RevelarEmSequencia: FC<RevelarEmSequenciaProps> = ({
  children,
  className,
  as: Elemento = "div",
  atraso = 0,
}) => {
  const raiz = useRef<HTMLElement | null>(null);
  const atribuirRaiz = useCallback((elemento: HTMLElement | null) => {
    raiz.current = elemento;
  }, []);

  useGSAP(
    () => {
      const elemento = raiz.current;
      if (!elemento) return;

      gsap.matchMedia().add(SEM_MOVIMENTO_REDUZIDO, () => {
        gsap.set(elemento, { visibility: "visible" });
        gsap.from(elemento.children, {
          autoAlpha: 0,
          y: ENTRADA.deslocamento,
          filter: ENTRADA.desfoque,
          duration: ENTRADA.duracao,
          ease: ENTRADA.curva,
          stagger: ENTRADA.intervalo,
          delay: atraso,
          clearProps: "filter,transform",
        });
      });
    },
    { scope: raiz },
  );

  return (
    <Elemento ref={atribuirRaiz} data-animacao="entrada" className={className}>
      {children}
    </Elemento>
  );
};
