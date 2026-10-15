"use client";

import dynamic from "next/dynamic";
import { useRef, type FC, type ReactNode } from "react";
import { Camada3D } from "@/components/3d/camada-3d";
import type { EstadoAnimacao } from "@/components/3d/notebook/pose";
import { usePalco3D } from "@/hooks/use-palco-3d";
import { PREFERENCIA_DE_MOVIMENTO, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

// O Three.js só é baixado depois que a página já apareceu: o título do hero não
// espera pelo 3D.
const CenaNotebook = dynamic(
  () => import("@/components/3d/notebook/cena-notebook").then((modulo) => modulo.CenaNotebook),
  { ssr: false },
);

type NotebookHeroProps = {
  // O que fica atrás do notebook (o batimento do palco).
  children?: ReactNode;
};

const DESKTOP = "(min-width: 64rem)";
const ENTRADA = { duracao: 1.6, atraso: 0.3, curva: "power3.out" } as const;

// Desktop: o hero inteiro (texto, botões e notebook) fica fixo enquanto a tampa
// abre, por 80% de uma tela de rolagem; o botão do WhatsApp não sai de vista.
// Celular e tablet: sem fixar; a tampa abre enquanto o palco passa pela tela.
const fixarHero = (hero: HTMLElement): ScrollTrigger.Vars => {
  return {
    trigger: hero,
    start: "top top",
    end: "+=80%",
    pin: true,
    // Explícito: o ScrollTrigger desliga o espaçamento quando o pai é flex.
    pinSpacing: true,
    scrub: 1,
    anticipatePin: 1,
    fastScrollEnd: true,
    invalidateOnRefresh: true,
  };
};

const acompanharRolagem = (palco: HTMLElement): ScrollTrigger.Vars => {
  return { trigger: palco, start: "top 75%", end: "bottom 35%", scrub: 1 };
};

export const NotebookHero: FC<NotebookHeroProps> = ({ children }) => {
  const { palco, ativa, movimentoReduzido, economizarDados, ponteiro, pronta, aoFicarPronta } = usePalco3D();
  const estado = useRef<EstadoAnimacao>({ entrada: 0, rolagem: 0 });

  useGSAP(
    () => {
      const elemento = palco.current;
      // O palco mora dentro da <section> do hero, que é o que fica fixo no desktop.
      const hero = elemento?.closest("section");
      if (!elemento || !hero) return;
      const animacao = estado.current;

      gsap.matchMedia().add({ ...PREFERENCIA_DE_MOVIMENTO, desktop: DESKTOP }, (contexto) => {
        const condicoes = contexto.conditions;

        // Movimento reduzido: o notebook já aparece aberto e de frente, parado.
        if (!condicoes?.comMovimento) {
          gsap.set(animacao, { entrada: 1, rolagem: 1 });
          return;
        }

        gsap.fromTo(
          animacao,
          { entrada: 0 },
          { entrada: 1, duration: ENTRADA.duracao, delay: ENTRADA.atraso, ease: ENTRADA.curva },
        );
        gsap.fromTo(
          animacao,
          { rolagem: 0 },
          {
            rolagem: 1,
            ease: "none",
            scrollTrigger: condicoes.desktop ? fixarHero(hero) : acompanharRolagem(elemento),
          },
        );
      });

      // A troca para a fonte da marca pode mexer na altura do texto acima do palco.
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    },
    { scope: palco },
  );

  return (
    <div ref={palco} aria-hidden="true" className="relative mt-4 h-72 w-full sm:h-96 lg:mt-0 lg:h-136">
      <div className="absolute inset-x-0 bottom-0 mx-auto h-72 w-3xl max-w-full translate-y-1/4 rounded-full bg-primary/35 blur-3xl" />
      {children}
      {/* Com economia de dados ligada, o 3D (uns 900 KB) não é baixado; fica o batimento. */}
      {!economizarDados && (
        <Camada3D pronta={pronta}>
          <CenaNotebook
            estado={estado}
            ponteiro={ponteiro}
            ativa={ativa}
            movimentoReduzido={movimentoReduzido}
            aoFicarPronta={aoFicarPronta}
          />
        </Camada3D>
      )}
    </div>
  );
};
