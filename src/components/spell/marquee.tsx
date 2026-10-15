import type { FC } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  itens: readonly string[];
  // Nome da lista para leitores de tela.
  rotulo: string;
  className?: string;
};

// Porte do marquee do Spell UI (https://spell.sh/docs/marquee): a faixa corre em
// CSS puro (animate-marquee, em globals.css), pausa sob o mouse e some nas bordas.
// A segunda cópia da lista existe só para fechar o ciclo e fica escondida dos
// leitores de tela. Com movimento reduzido, vira uma lista parada que quebra linha.
export const Marquee: FC<MarqueeProps> = ({ itens, rotulo, className }) => {
  return (
    <div
      className={cn(
        "group flex overflow-hidden mask-x-from-85% motion-reduce:justify-center motion-reduce:mask-none",
        className,
      )}
    >
      <div className="flex shrink-0 animate-marquee group-hover:pausar-animacao motion-reduce:shrink motion-reduce:animate-none">
        <ul aria-label={rotulo} className="flex shrink-0 motion-reduce:flex-wrap motion-reduce:justify-center">
          {itens.map((item) => (
            <ItemMarquee key={item} texto={item} />
          ))}
        </ul>
        <ul aria-hidden="true" className="flex shrink-0 motion-reduce:hidden">
          {itens.map((item) => (
            <ItemMarquee key={item} texto={item} />
          ))}
        </ul>
      </div>
    </div>
  );
};

type ItemMarqueeProps = {
  texto: string;
};

const ItemMarquee: FC<ItemMarqueeProps> = ({ texto }) => {
  return (
    <li className="flex items-center gap-8 px-4 text-2xl font-bold tracking-tight whitespace-nowrap text-muted-foreground md:text-3xl">
      {texto}
      <span aria-hidden="true" className="size-1.5 rounded-full bg-link" />
    </li>
  );
};
