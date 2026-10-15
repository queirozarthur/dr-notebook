import { useId, type FC } from "react";
import { cn } from "@/lib/utils";

type LinhaBatimentoProps = {
  className?: string;
};

// O batimento da logo atravessando o palco: o traço se desenha uma vez e um pulso
// de luz corre por ele. Só CSS (animate-tracar, animate-pulso em globals.css);
// com movimento reduzido, a linha aparece inteira e parada.
const BATIMENTO = [
  "M0,150 H488",
  "Q503,134 518,150",
  "H548 L556,162 L574,28 L594,204 L610,150",
  "H654 Q687,118 720,150",
  "H1200",
].join(" ");

export const LinhaBatimento: FC<LinhaBatimentoProps> = ({ className }) => {
  const idDegrade = useId();
  const traco = `url(#${idDegrade})`;

  return (
    <svg
      viewBox="0 0 1200 240"
      fill="none"
      aria-hidden="true"
      className={cn("drop-shadow-lg drop-shadow-link/40", className)}
    >
      <defs>
        <linearGradient id={idDegrade} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopOpacity="0" style={{ stopColor: "var(--link)" }} />
          <stop offset="0.5" style={{ stopColor: "var(--link)" }} />
          <stop offset="1" stopOpacity="0" style={{ stopColor: "var(--link)" }} />
        </linearGradient>
      </defs>
      <path
        d={BATIMENTO}
        pathLength={1}
        stroke={traco}
        strokeWidth={3}
        strokeDasharray={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-tracar motion-reduce:animate-none"
      />
      <path
        d={BATIMENTO}
        pathLength={1}
        strokeWidth={4}
        strokeDasharray="0.12 1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-pulso stroke-foreground motion-reduce:hidden"
      />
    </svg>
  );
};
