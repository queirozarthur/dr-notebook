"use client";

import dynamic from "next/dynamic";
import { useRef, type FC } from "react";
import { Camada3D } from "@/components/3d/camada-3d";
import type { ProgressoPlaca } from "@/components/3d/placa/placa-explodida";
import { usePalco3D } from "@/hooks/use-palco-3d";
import { PREFERENCIA_DE_MOVIMENTO, gsap, useGSAP } from "@/lib/gsap";

const CenaPlaca = dynamic(() => import("@/components/3d/placa/cena-placa").then((modulo) => modulo.CenaPlaca), {
  ssr: false,
});

// A vista explode enquanto o palco atravessa a tela, sem fixar a página: o único
// pin do site é o do hero. Com movimento reduzido, já aparece explodida.
const ROLAGEM = { start: "top 85%", end: "bottom 45%", scrub: 1 } as const;

export const PalcoPlaca: FC = () => {
  const { palco, ativa, movimentoReduzido, economizarDados, ponteiro, pronta, aoFicarPronta } = usePalco3D();
  const progresso = useRef<ProgressoPlaca>({ valor: 0 });

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
    <div ref={palco} aria-hidden="true" className="relative h-80 w-full sm:h-104 lg:h-136">
      <div className="absolute inset-x-0 top-1/2 mx-auto h-64 w-2xl max-w-full -translate-y-1/2 rounded-full bg-primary/25 blur-3xl" />
      {!economizarDados && (
        <Camada3D pronta={pronta}>
          <CenaPlaca
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
