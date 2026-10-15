import { useId, type FC } from "react";
import { cn } from "@/lib/utils";
import { logoGeometria } from "./logo-geometria";

type LogoProps = {
  className?: string;
};

// A logo é decorativa: quem a usa dá o nome acessível no contexto (o link do
// cabeçalho, por exemplo). As cores vêm dos tokens --logo-*, que o .palco
// reaponta, então a mesma logo serve no fundo branco e no azul-marinho.
export const Logo: FC<LogoProps> = ({ className }) => {
  // Cada instância precisa do próprio degradê: as cores do <stop> resolvem os
  // tokens no lugar onde o degradê está, não onde ele é usado.
  const idDegrade = useId();
  const degrade = `url(#${idDegrade})`;

  return (
    <svg
      viewBox={logoGeometria.viewBox}
      aria-hidden="true"
      focusable="false"
      className={cn("w-auto overflow-visible", className)}
    >
      <defs>
        <linearGradient
          id={idDegrade}
          gradientUnits="userSpaceOnUse"
          x1={logoGeometria.degrade.x1}
          x2={logoGeometria.degrade.x2}
          y1={0}
          y2={0}
        >
          <stop offset={0} style={{ stopColor: "var(--logo-inicio)" }} />
          <stop offset={1} style={{ stopColor: "var(--logo-fim)" }} />
        </linearGradient>
      </defs>

      <g
        fill="none"
        strokeWidth={logoGeometria.traco}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={logoGeometria.estetoscopio} className="stroke-logo-estetoscopio" />
        <path d={logoGeometria.tela} className="stroke-logo-aparelho" />
        <path d={logoGeometria.base} className="stroke-logo-aparelho" />
        <path d={logoGeometria.batimento} stroke={degrade} />
      </g>

      <g fill={degrade}>
        <path d={logoGeometria.moldura} />
        <path d={logoGeometria.letras.dr} />
        <path d={logoGeometria.letras.noteb} />
        <path d={logoGeometria.letras.k} />
      </g>

      {logoGeometria.olivas.map((oliva) => (
        <circle key={oliva.cx} {...oliva} className="fill-logo-estetoscopio" />
      ))}
    </svg>
  );
};
