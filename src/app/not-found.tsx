import Link from "next/link";
import type { Metadata } from "next";
import type { FC } from "react";
import { IconeWhatsApp } from "@/components/marca/icone-whatsapp";
import { FundoHexagonos } from "@/components/site/fundo-hexagonos";
import { Button } from "@/components/ui/button";
import { MENSAGEM_ORCAMENTO, linkWhatsApp } from "@/lib/loja";

export const metadata: Metadata = {
  title: "Página não encontrada",
  description: "O endereço não existe ou mudou. Volte para o início ou fale com a Dr. Notebook Maceió pelo WhatsApp.",
};

const NaoEncontrada: FC = () => {
  return (
    <main id="conteudo" className="palco relative isolate flex flex-1 items-center overflow-hidden py-24 md:py-32">
      <FundoHexagonos />
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 text-center">
        <p className="text-sm font-semibold tracking-widest text-link uppercase">Erro 404</p>
        <h1 className="mt-4 text-5xl font-extrabold tracking-tight md:text-7xl">Página não encontrada.</h1>
        <p className="mt-6 text-lg text-muted-foreground md:text-xl">
          O endereço não existe ou mudou. Volte para o início ou fale com a loja pelo WhatsApp.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">Voltar para o início</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={linkWhatsApp(MENSAGEM_ORCAMENTO)} target="_blank" rel="noopener">
              <IconeWhatsApp />
              Falar no WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NaoEncontrada;
