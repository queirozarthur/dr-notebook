"use client";

import { useRef, type FC } from "react";
import { SEM_MOVIMENTO_REDUZIDO, gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type PalavraRotativaProps = {
  itens: readonly [string, ...string[]];
  className?: string;
};

// Uma linha que troca de texto de baixo para cima, um item por vez, com pausa em
// cada um. Inspirada no text-marquee do Spell UI, que rola sem parar; aqui cada
// sintoma para para ser lido. É decorativa (aria-hidden): quem usa coloca o texto
// completo para leitores de tela. Com movimento reduzido, fica no primeiro item.
const TROCA = 0.6;
const PAUSA = 1.6;
const CURVA = "power3.inOut";

export const PalavraRotativa: FC<PalavraRotativaProps> = ({ itens, className }) => {
  const pilha = useRef<HTMLSpanElement>(null);
  // O mais longo, invisível, reserva a largura e a altura da linha.
  const maisLongo = itens.reduce((maior, item) => (item.length > maior.length ? item : maior));
  // O primeiro item se repete no fim: a volta ao começo acontece sem salto visível.
  const comRepeticao = [...itens, itens[0]];

  useGSAP(
    () => {
      const elemento = pilha.current;
      if (!elemento) return;

      gsap.matchMedia().add(SEM_MOVIMENTO_REDUZIDO, () => {
        const passo = 100 / comRepeticao.length;
        const linha = gsap.timeline({ repeat: -1 });
        itens.forEach((_, indice) => {
          linha.to(elemento, { yPercent: -passo * (indice + 1), duration: TROCA, ease: CURVA }, `+=${PAUSA}`);
        });
        linha.set(elemento, { yPercent: 0 });
      });
    },
    { scope: pilha, dependencies: [itens] },
  );

  return (
    <span aria-hidden="true" className={cn("relative inline-block whitespace-nowrap", className)}>
      <span className="invisible">{maisLongo}</span>
      <span className="absolute inset-0 overflow-hidden">
        <span ref={pilha} className="flex flex-col items-center">
          {comRepeticao.map((item, indice) => (
            <span key={`${indice}-${item}`} className="block">
              {item}
            </span>
          ))}
        </span>
      </span>
    </span>
  );
};
