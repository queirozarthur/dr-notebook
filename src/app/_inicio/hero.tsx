import Link from "next/link";
import type { FC } from "react";
import { Star } from "lucide-react";
import { RevelarEmSequencia } from "@/components/animacao/revelar-em-sequencia";
import { IconeWhatsApp } from "@/components/marca/icone-whatsapp";
import { WordsStagger } from "@/components/spell/words-stagger";
import { Button } from "@/components/ui/button";
import { MENSAGEM_ORCAMENTO, linkWhatsApp, loja } from "@/lib/loja";
import { FundoHexagonos } from "./fundo-hexagonos";
import { LinhaBatimento } from "./linha-batimento";

// Palco azul-marinho (referência Refero: Apple "Midnight hardware gallery").
// Ordem de entrada: chamada, título palavra por palavra, texto, botões, nota.
export const Hero: FC = () => {
  return (
    <section aria-labelledby="hero-titulo" className="palco relative isolate overflow-hidden">
      <FundoHexagonos />

      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 pt-16 text-center md:pt-24">
        <h1 id="hero-titulo" className="flex flex-col items-center gap-5">
          <RevelarEmSequencia as="span" className="block">
            <span className="block text-sm font-semibold tracking-widest text-link uppercase">
              Assistência técnica em {loja.cidade} · desde {loja.desde}
            </span>
          </RevelarEmSequencia>{" "}
          <WordsStagger
            as="span"
            delay={0.15}
            className="block max-w-5xl text-5xl leading-none font-extrabold tracking-tight md:text-7xl xl:text-8xl"
          >
            Não resolve no martelo. Resolve na técnica.
          </WordsStagger>
        </h1>

        <RevelarEmSequencia atraso={0.6} className="mt-8 flex flex-col items-center gap-8">
          <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
            Reparo em placa de notebooks, MacBooks, PCs gamer, PS5, drones e celulares, com diagnóstico
            antes do serviço e orçamento grátis pelo WhatsApp.
          </p>

          <div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href={linkWhatsApp(MENSAGEM_ORCAMENTO)} target="_blank" rel="noopener">
                <IconeWhatsApp />
                Pedir orçamento grátis
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link href="/#servicos">Ver serviços</Link>
            </Button>
          </div>

          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Star aria-hidden="true" className="size-4 fill-current text-link" />
            <span>
              <strong className="font-semibold text-foreground">{loja.avaliacoes.nota}</strong> no Google ·{" "}
              {loja.avaliacoes.total} avaliações
            </span>
          </p>
        </RevelarEmSequencia>
      </div>

      <div className="relative mx-auto mt-6 h-48 max-w-6xl md:h-64">
        <LinhaBatimento className="absolute inset-x-0 top-1/2 w-full -translate-y-1/2" />
      </div>
    </section>
  );
};
