"use client";

import { useCallback, useRef, type FC } from "react";
import { SEM_MOVIMENTO_REDUZIDO, SplitText, gsap, useGSAP } from "@/lib/gsap";

type WordsStaggerProps = {
  children: string;
  className?: string;
  as?: "div" | "span" | "p" | "h2" | "h3";
  delay?: number;
  stagger?: number;
  speed?: number;
  inView?: boolean;
};

// Porte do words-stagger do Spell UI (https://spell.sh/docs/words-stagger), de
// motion para GSAP + SplitText. O visual é o original: cada palavra sobe 10 px,
// ganha opacidade e sai de um desfoque de 10 px. O intervalo padrão é o da skill
// ui-motion para títulos (80 ms). Ao fim, o SplitText devolve o texto original.
const DESLOCAMENTO = 10;
const DESFOQUE = "blur(10px)";
const CURVA = "power1.out";
const INICIO_NA_TELA = "top 85%";

export const WordsStagger: FC<WordsStaggerProps> = ({
  children,
  className,
  as: Elemento = "div",
  delay = 0,
  stagger = 0.08,
  speed = 0.5,
  inView = false,
}) => {
  const raiz = useRef<HTMLElement | null>(null);
  const atribuirRaiz = useCallback((elemento: HTMLElement | null) => {
    raiz.current = elemento;
  }, []);

  useGSAP(
    (_contexto, contextSafe) => {
      if (!contextSafe) return;

      // Divide só depois das fontes carregarem, para medir o texto na fonte certa.
      const animar = contextSafe(() => {
        const elemento = raiz.current;
        if (!elemento) return;

        gsap.matchMedia().add(SEM_MOVIMENTO_REDUZIDO, () => {
          gsap.set(elemento, { visibility: "visible" });
          const divisao = SplitText.create(elemento, { type: "words", tag: "span", aria: "none" });

          gsap.from(divisao.words, {
            autoAlpha: 0,
            y: DESLOCAMENTO,
            filter: DESFOQUE,
            duration: speed,
            ease: CURVA,
            stagger,
            delay,
            ...(inView && { scrollTrigger: { trigger: elemento, start: INICIO_NA_TELA, once: true } }),
            onComplete: () => divisao.revert(),
          });
        });
      });

      document.fonts.ready.then(animar);
    },
    { scope: raiz },
  );

  return (
    <Elemento ref={atribuirRaiz} data-animacao="entrada" className={className}>
      {children}
    </Elemento>
  );
};
