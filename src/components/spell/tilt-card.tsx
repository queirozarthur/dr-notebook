"use client";

import { useRef, type FC, type PointerEvent, type ReactNode } from "react";
import { usePrefereMovimentoReduzido } from "@/hooks/use-prefere-movimento-reduzido";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  // Inclinação máxima, em graus, e o zoom enquanto o mouse está em cima.
  limite?: number;
  escala?: number;
  perspectiva?: number;
};

// Porte do tilt-card do Spell UI (https://spell.sh/docs/tilt-card): o cartão
// inclina para longe do mouse e um holofote segue o cursor. O original guarda o
// transform em estado React (um render por movimento do mouse); aqui ele vai
// direto no estilo do elemento. Só com mouse: no toque, inclinar atrapalharia a
// rolagem. Com movimento reduzido, o cartão fica parado.
const HOLOFOTE = "radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgb(255 255 255 / 0.14), transparent 45%)";

export const TiltCard: FC<TiltCardProps> = ({ children, className, limite = 8, escala = 1.02, perspectiva = 1200 }) => {
  const cartao = useRef<HTMLDivElement>(null);
  const holofote = useRef<HTMLDivElement>(null);
  // Medida ao entrar, não a cada movimento: ler o layout no pointermove custa caro.
  const caixa = useRef<DOMRect | null>(null);
  const movimentoReduzido = usePrefereMovimentoReduzido();

  const aoEntrar = (evento: PointerEvent<HTMLDivElement>) => {
    if (evento.pointerType !== "mouse" || movimentoReduzido) return;
    caixa.current = evento.currentTarget.getBoundingClientRect();
    holofote.current?.style.setProperty("opacity", "1");
  };

  const aoMover = (evento: PointerEvent<HTMLDivElement>) => {
    const [elemento, medida] = [cartao.current, caixa.current];
    if (!elemento || !medida) return;

    const x = (evento.clientX - medida.left) / medida.width;
    const y = (evento.clientY - medida.top) / medida.height;
    const giroX = (0.5 - y) * limite * 2;
    const giroY = (x - 0.5) * limite * 2;
    elemento.style.transform = `perspective(${perspectiva}px) rotateX(${giroX}deg) rotateY(${giroY}deg) scale3d(${escala}, ${escala}, 1)`;
    holofote.current?.style.setProperty("--x", `${x * 100}%`);
    holofote.current?.style.setProperty("--y", `${y * 100}%`);
  };

  const aoSair = () => {
    caixa.current = null;
    cartao.current?.style.removeProperty("transform");
    holofote.current?.style.setProperty("opacity", "0");
  };

  return (
    <div
      ref={cartao}
      onPointerEnter={aoEntrar}
      onPointerMove={aoMover}
      onPointerLeave={aoSair}
      className={cn("relative overflow-hidden transition-transform duration-200 ease-out", className)}
    >
      {children}
      <div
        ref={holofote}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{ backgroundImage: HOLOFOTE }}
      />
    </div>
  );
};
