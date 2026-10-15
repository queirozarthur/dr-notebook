import type { FC } from "react";
import { IconeWhatsApp } from "@/components/marca/icone-whatsapp";
import { WordsStagger } from "@/components/spell/words-stagger";
import { Button } from "@/components/ui/button";
import { MENSAGEM_ORCAMENTO, linkWhatsApp, loja } from "@/lib/loja";
import { FundoHexagonos } from "./fundo-hexagonos";

// Último convite antes do rodapé, igual em todas as páginas: o botão mostra o
// número, para quem prefere ligar ou salvar o contato.
export const ChamadaFinal: FC = () => {
  return (
    <section aria-labelledby="chamada-titulo" className="palco relative isolate overflow-hidden py-24 md:py-32">
      <FundoHexagonos />
      <div className="absolute inset-x-0 bottom-0 -z-10 mx-auto h-64 w-3xl max-w-full translate-y-1/2 rounded-full bg-primary/40 blur-3xl" />
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center">
        <h2 id="chamada-titulo" className="text-4xl font-extrabold tracking-tight md:text-6xl">
          <WordsStagger as="span" inView className="block">
            Fala com a gente no WhatsApp.
          </WordsStagger>
        </h2>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
          Orçamento grátis e diagnóstico antes do serviço. Na {loja.endereco.local}, em {loja.endereco.bairro},{" "}
          {loja.cidade}.
        </p>
        <Button asChild size="lg" className="mt-10">
          <a href={linkWhatsApp(MENSAGEM_ORCAMENTO)} target="_blank" rel="noopener">
            <IconeWhatsApp />
            <span className="sr-only">Conversar no WhatsApp: </span>
            <span className="tabular-nums">{loja.whatsapp.exibicao}</span>
          </a>
        </Button>
      </div>
    </section>
  );
};
