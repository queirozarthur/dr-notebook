"use client";

import dynamic from "next/dynamic";
import { useRef, type FC } from "react";
import { Camada3D } from "@/components/3d/camada-3d";
import type { ProgressoDrone } from "@/components/3d/drone/drone";
import { usePalco3D } from "@/hooks/use-palco-3d";
import { PREFERENCIA_DE_MOVIMENTO, gsap, useGSAP } from "@/lib/gsap";

const CenaDrone = dynamic(() => import("@/components/3d/drone/cena-drone").then((modulo) => modulo.CenaDrone), {
  ssr: false,
});

// O drone sobe enquanto o palco entra na tela. Com movimento reduzido, já aparece
// no lugar, parado.
const ROLAGEM = { start: "top 90%", end: "center 55%", scrub: 1 } as const;

export const PalcoDrone: FC = () => {
  const { palco, ativa, movimentoReduzido, economizarDados, ponteiro, pronta, aoFicarPronta } = usePalco3D();
  const progresso = useRef<ProgressoDrone>({ valor: 0 });

  useGSAP(
    () => {
      const elemento = palco.current;
      if (!elemento) return;
      const animacao = progresso.current;

      gsap.matchMedia().add(PREFERENCIA_DE_MOVIMENTO, (contexto) => {
        if (!contexto.conditions?.comMovimento) {
          gsap.set(animacao, { valor: 1 });
          return;
        }
        gsap.fromTo(animacao, { valor: 0 }, { valor: 1, ease: "none", scrollTrigger: { trigger: elemento, ...ROLAGEM } });
      });
    },
    { scope: palco },
  );

  return (
    <div ref={palco} aria-hidden="true" className="relative h-72 w-full sm:h-96 lg:h-128">
      <div className="absolute inset-x-0 top-1/2 mx-auto h-56 w-xl max-w-full -translate-y-1/3 rounded-full bg-primary/30 blur-3xl" />
      {!economizarDados && (
        <Camada3D pronta={pronta}>
          <CenaDrone
            progresso={progresso}
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
