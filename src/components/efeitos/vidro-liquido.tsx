"use client";

import { useId, useRef, type FC, type PointerEvent, type ReactNode } from "react";
import { useRefracao } from "@/hooks/use-refracao";
import { cn } from "@/lib/utils";

type VidroLiquidoProps = {
  children: ReactNode;
  className?: string;
};

// Efeito "liquid glass" (o material de vidro da Apple): fundo desfocado e mais
// saturado, contorno claro no alto, brilho que segue o mouse e, no Chromium,
// refração nas bordas. O vidro é uma camada atrás do conteúdo (-z-10): quem usa
// precisa estar num contexto de empilhamento (o cabeçalho tem z-40).
// O material está em globals.css (.vidro-liquido); o mapa de refração, em
// src/lib/mapa-de-refracao.ts.
const DESLOCAMENTO_MAXIMO = 36;
const DESFOQUE = "blur(10px) saturate(170%)";

export const VidroLiquido: FC<VidroLiquidoProps> = ({ children, className }) => {
  const camada = useRef<HTMLDivElement>(null);
  const idFiltro = `refracao-${useId().replace(/[^a-zA-Z0-9-]/g, "")}`;
  const refracao = useRefracao(camada);

  // Só com mouse: o brilho especular desliza para perto do cursor.
  const seguirMouse = (evento: PointerEvent<HTMLDivElement>) => {
    const elemento = camada.current;
    if (evento.pointerType !== "mouse" || !elemento) return;
    const caixa = elemento.getBoundingClientRect();
    elemento.style.setProperty("--brilho-x", `${((evento.clientX - caixa.left) / caixa.width) * 100}%`);
    elemento.style.setProperty("--brilho-y", `${((evento.clientY - caixa.top) / caixa.height) * 100 - 60}%`);
  };

  const soltarMouse = () => {
    camada.current?.style.removeProperty("--brilho-x");
    camada.current?.style.removeProperty("--brilho-y");
  };

  return (
    <div className={cn("relative", className)} onPointerMove={seguirMouse} onPointerLeave={soltarMouse}>
      <div
        ref={camada}
        aria-hidden="true"
        className="vidro-liquido pointer-events-none absolute inset-0 -z-10"
        style={refracao.tipo === "pronta" ? { backdropFilter: `url(#${idFiltro}) ${DESFOQUE}` } : undefined}
      />
      {refracao.tipo === "pronta" && (
        <svg aria-hidden="true" width="0" height="0" className="absolute">
          <filter
            id={idFiltro}
            x="0"
            y="0"
            width={refracao.largura}
            height={refracao.altura}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feImage
              href={refracao.mapa}
              x="0"
              y="0"
              width={refracao.largura}
              height={refracao.altura}
              preserveAspectRatio="none"
              result="mapa"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="mapa"
              scale={DESLOCAMENTO_MAXIMO}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>
      )}
      {children}
    </div>
  );
};
