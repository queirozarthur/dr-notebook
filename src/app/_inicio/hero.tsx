import Link from "next/link";
import type { FC } from "react";
import { Star } from "lucide-react";
import { RevelarEmSequencia } from "@/components/animacao/revelar-em-sequencia";
import { IconeWhatsApp } from "@/components/marca/icone-whatsapp";
import { WordsStagger } from "@/components/spell/words-stagger";
import { Button } from "@/components/ui/button";
import { MENSAGEM_ORCAMENTO, linkWhatsApp, loja } from "@/lib/loja";
import { FundoHexagonos } from "@/components/site/fundo-hexagonos";
import { LinhaBatimento } from "./linha-batimento";
import { NotebookHero } from "./notebook-hero";

// Palco azul-marinho (referência Refero: Apple "Midnight hardware gallery").
// Celular e tablet: texto em cima, notebook embaixo. Desktop: duas colunas numa
// tela inteira, que fica fixa enquanto a tampa abre (ver notebook-hero.tsx).
// Ordem de entrada: chamada, título palavra por palavra, texto, botões, nota.
export const Hero: FC = () => {
  return (
    <section
      aria-labelledby="hero-titulo"
      className="palco relative isolate overflow-hidden lg:flex lg:min-h-svh lg:items-center"
    >
      <FundoHexagonos />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-x-12 px-4 pt-28 lg:grid-cols-2 lg:py-24">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <h1 id="hero-titulo" className="flex flex-col items-center gap-5 lg:items-start">
            <RevelarEmSequencia as="span" className="block">
              <span className="block text-sm font-semibold tracking-widest text-link uppercase">
                Assistência técnica em {loja.cidade} · desde {loja.desde}
              </span>
            </RevelarEmSequencia>{" "}
            <WordsStagger
              as="span"
              delay={0.15}
              className="block max-w-4xl text-5xl leading-none font-extrabold tracking-tight md:text-6xl xl:text-7xl"
            >
              Não resolve no martelo. Resolve na técnica.
            </WordsStagger>
          </h1>

          <RevelarEmSequencia atraso={0.6} className="mt-8 flex flex-col items-center gap-8 lg:items-start">
            <p className="max-w-2xl text-lg text-muted-foreground md:text-xl lg:max-w-lg">
              Reparo em placa de notebooks, MacBooks, PCs gamer, PS5, drones e celulares, com diagnóstico
              antes do serviço e orçamento grátis pelo WhatsApp.
            </p>

            <div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row lg:justify-start">
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

        <NotebookHero>
          <LinhaBatimento className="absolute inset-x-0 top-1/2 w-full -translate-y-1/2" />
        </NotebookHero>
      </div>
    </section>
  );
};
