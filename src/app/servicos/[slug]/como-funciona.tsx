import type { FC } from "react";
import { RevelarAoRolar } from "@/components/animacao/revelar-ao-rolar";
import { CabecalhoSecao } from "@/components/site/cabecalho-secao";

// Os três argumentos que a loja repete (briefing, "Tom de voz"): orçamento grátis
// e diagnóstico antes do serviço, atendimento rápido e transparente, garantia nos
// serviços. Sem prazo de garantia nem de reparo: o briefing não informa.
const PASSOS = [
  { titulo: "Chame no WhatsApp", texto: "Conte o que está acontecendo com o aparelho." },
  {
    titulo: "Diagnóstico e orçamento grátis",
    texto: "Antes de qualquer serviço, a loja descobre o que o aparelho tem e passa o orçamento.",
  },
  { titulo: "Conserto com transparência", texto: "Atendimento rápido e transparente, com garantia nos serviços." },
] as const;

export const ComoFunciona: FC = () => {
  return (
    <section aria-labelledby="como-funciona-titulo" className="bg-muted py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <CabecalhoSecao id="como-funciona-titulo" sobretitulo="Como funciona" titulo="Do primeiro contato ao conserto." />
        <RevelarAoRolar className="mt-12 grid gap-4 md:grid-cols-3">
          {PASSOS.map(({ titulo, texto }, indice) => (
            <div key={titulo} data-revelar className="flex flex-col gap-3 rounded-3xl bg-background p-8">
              <span className="text-sm font-semibold text-link tabular-nums">{String(indice + 1).padStart(2, "0")}</span>
              <h3 className="text-xl font-bold tracking-tight">{titulo}</h3>
              <p className="text-muted-foreground">{texto}</p>
            </div>
          ))}
        </RevelarAoRolar>
      </div>
    </section>
  );
};
