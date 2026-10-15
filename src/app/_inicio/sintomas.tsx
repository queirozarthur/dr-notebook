import type { FC } from "react";
import { PalavraRotativa } from "@/components/animacao/palavra-rotativa";
import { IconeWhatsApp } from "@/components/marca/icone-whatsapp";
import { Marquee } from "@/components/spell/marquee";
import { Button } from "@/components/ui/button";
import { linkWhatsApp } from "@/lib/loja";
import { marcas, sintomas } from "@/lib/servicos";

const MENSAGEM_PROBLEMA = "Olá! Vim pelo site. Meu aparelho está com um problema e quero um orçamento.";

// Seção clara (referência Refero: Apple "white room with a single blue switch").
// Os sintomas são os que a loja usa nas artes; as marcas, as citadas no briefing.
export const Sintomas: FC = () => {
  return (
    <section aria-labelledby="sintomas-titulo" className="overflow-hidden bg-background py-24 md:py-32">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center">
        <p className="text-sm font-semibold tracking-widest text-link uppercase">Que problema a gente resolve</p>
        <h2 id="sintomas-titulo" className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-6xl">
          <span className="sr-only">{sintomas.join(" ")}</span>
          <PalavraRotativa itens={sintomas} className="text-primary" />
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Seja qual for o sintoma, a gente descobre o motivo antes de mexer: o diagnóstico vem antes do serviço, e
          o orçamento é grátis.
        </p>
        <Button asChild size="lg" className="mt-10">
          <a href={linkWhatsApp(MENSAGEM_PROBLEMA)} target="_blank" rel="noopener">
            <IconeWhatsApp />
            {/* Um só item no flex do botão: com dois, o gap viraria um espaço a mais. */}
            <span>
              Contar o problema<span className="hidden sm:inline"> no WhatsApp</span>
            </span>
          </a>
        </Button>
      </div>

      <div className="mt-20 flex flex-col gap-6">
        <p className="text-center text-sm font-semibold tracking-widest text-muted-foreground uppercase">
          Marcas atendidas
        </p>
        <Marquee itens={marcas} rotulo="Marcas atendidas" />
      </div>
    </section>
  );
};
