import { useId, type FC } from "react";

// Colmeia de hexágonos, o motivo das artes da loja, bem sutil e apagando para as
// bordas. Embaixo, o brilho azul onde o notebook 3D vai ficar (passo 3).
const LADO = 34;
const LARGURA = Math.sqrt(3) * LADO;
const ALTURA = 3 * LADO;

// Um hexágono de ponta para cima e a aresta que o liga à fileira de baixo.
const CELULA = [
  `M${LARGURA / 2},0`,
  `L${LARGURA},${LADO / 2}`,
  `L${LARGURA},${1.5 * LADO}`,
  `L${LARGURA / 2},${2 * LADO}`,
  `L0,${1.5 * LADO}`,
  `L0,${LADO / 2}`,
  "Z",
  `M${LARGURA / 2},${2 * LADO}`,
  `L${LARGURA / 2},${ALTURA}`,
].join(" ");

export const FundoHexagonos: FC = () => {
  const idPadrao = useId();

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <svg className="absolute inset-0 size-full mask-radial-from-0% mask-radial-to-70% mask-radial-at-bottom">
        <defs>
          <pattern id={idPadrao} width={LARGURA} height={ALTURA} patternUnits="userSpaceOnUse">
            <path d={CELULA} fill="none" strokeWidth={1} className="stroke-foreground/8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${idPadrao})`} />
      </svg>
      <div className="absolute bottom-0 left-1/2 h-96 w-4xl -translate-x-1/2 translate-y-1/2 rounded-full bg-primary/40 blur-3xl" />
    </div>
  );
};
