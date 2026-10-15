"use client";

import { useRef, type FC } from "react";
import { SEM_MOVIMENTO_REDUZIDO, gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type NumeroAnimadoProps = {
  valor: number;
  casasDecimais?: number;
  className?: string;
};

// Conta de zero até o valor quando o número entra na tela. O HTML já vem com o
// valor final (para buscadores, sem JS e com movimento reduzido); o zero só é
// escrito quando a animação vai rodar, ainda fora da tela.
const DURACAO = 1.4;
const CURVA = "power2.out";
const INICIO = "top 90%";

export const NumeroAnimado: FC<NumeroAnimadoProps> = ({ valor, casasDecimais = 0, className }) => {
  const elemento = useRef<HTMLSpanElement>(null);
  const formato = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: casasDecimais,
    maximumFractionDigits: casasDecimais,
  });

  useGSAP(
    () => {
      const alvo = elemento.current;
      if (!alvo) return;

      gsap.matchMedia().add(SEM_MOVIMENTO_REDUZIDO, () => {
        const contagem = { atual: 0 };
        alvo.textContent = formato.format(0);
        gsap.to(contagem, {
          atual: valor,
          duration: DURACAO,
          ease: CURVA,
          scrollTrigger: { trigger: alvo, start: INICIO, once: true },
          onUpdate: () => {
            alvo.textContent = formato.format(contagem.atual);
          },
        });
      });
    },
    { scope: elemento, dependencies: [valor, casasDecimais] },
  );

  return (
    <span ref={elemento} className={cn("tabular-nums", className)}>
      {formato.format(valor)}
    </span>
  );
};
