import type { FC } from "react";
import { logoGeometria } from "./logo-geometria";

type LogoEstaticaProps = {
  largura: number;
};

// A logo com cores fixas (a versão para fundo azul-marinho), para imagens geradas
// no build (Open Graph). Lá não existem as variáveis CSS que a <Logo /> usa.
const CORES = {
  inicio: "#ffffff",
  fim: "#9cc2ff",
  aparelho: "#8597c2",
  estetoscopio: "#5cc6f2",
} as const;
const ID_DEGRADE = "logo-degrade";

export const LogoEstatica: FC<LogoEstaticaProps> = ({ largura }) => {
  const altura = (largura * logoGeometria.altura) / logoGeometria.largura;
  const degrade = `url(#${ID_DEGRADE})`;

  return (
    <svg width={largura} height={altura} viewBox={logoGeometria.viewBox}>
      <defs>
        <linearGradient
          id={ID_DEGRADE}
          gradientUnits="userSpaceOnUse"
          x1={logoGeometria.degrade.x1}
          x2={logoGeometria.degrade.x2}
          y1={0}
          y2={0}
        >
          <stop offset={0} stopColor={CORES.inicio} />
          <stop offset={1} stopColor={CORES.fim} />
        </linearGradient>
      </defs>
      <g fill="none" strokeWidth={logoGeometria.traco} strokeLinecap="round" strokeLinejoin="round">
        <path d={logoGeometria.estetoscopio} stroke={CORES.estetoscopio} />
        <path d={logoGeometria.tela} stroke={CORES.aparelho} />
        <path d={logoGeometria.base} stroke={CORES.aparelho} />
        <path d={logoGeometria.batimento} stroke={degrade} />
      </g>
      <g fill={degrade}>
        <path d={logoGeometria.moldura} />
        <path d={logoGeometria.letras.dr} />
        <path d={logoGeometria.letras.noteb} />
        <path d={logoGeometria.letras.k} />
      </g>
      {logoGeometria.olivas.map((oliva) => (
        <circle key={oliva.cx} {...oliva} fill={CORES.estetoscopio} />
      ))}
    </svg>
  );
};
