import type { FC } from "react";
import { WordsStagger } from "@/components/spell/words-stagger";
import { cn } from "@/lib/utils";

type CabecalhoSecaoProps = {
  // id do <h2>, para a seção apontar para ele com aria-labelledby.
  id: string;
  sobretitulo: string;
  titulo: string;
  descricao?: string;
  centralizado?: boolean;
  className?: string;
};

// Chamada, título que entra palavra por palavra ao aparecer na tela, e descrição.
export const CabecalhoSecao: FC<CabecalhoSecaoProps> = ({
  id,
  sobretitulo,
  titulo,
  descricao,
  centralizado = false,
  className,
}) => {
  return (
    <div className={cn("flex max-w-2xl flex-col gap-4", centralizado && "mx-auto items-center text-center", className)}>
      <p className="text-sm font-semibold tracking-widest text-link uppercase">{sobretitulo}</p>
      <h2 id={id} className="text-4xl font-extrabold tracking-tight md:text-5xl">
        <WordsStagger as="span" inView className="block">
          {titulo}
        </WordsStagger>
      </h2>
      {descricao && <p className="text-lg text-muted-foreground md:text-xl">{descricao}</p>}
    </div>
  );
};
