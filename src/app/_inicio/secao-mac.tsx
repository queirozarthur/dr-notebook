import Link from "next/link";
import type { FC } from "react";
import { IconeWhatsApp } from "@/components/marca/icone-whatsapp";
import { WordsStagger } from "@/components/spell/words-stagger";
import { Button } from "@/components/ui/button";
import { linkWhatsApp } from "@/lib/loja";
import { mensagemDoServico } from "@/lib/servicos";

// Os textos são da arte da loja ("Seu Mac parou? A gente resolve. Especialistas
// em MacBook e iMac"), com os sintomas que ela lista. Bloco só de tipografia,
// como o "Typography-Only CTA Block" da referência da Apple no Refero.
const SINTOMAS_DO_MAC = ["Não liga", "Travou do nada", "Superaquecendo", "Desligando sozinho", "Tela preta ou não carrega"];

export const SecaoMac: FC = () => {
  return (
    <section aria-labelledby="mac-titulo" className="bg-background py-24 md:py-32">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center">
        <p className="text-sm font-semibold tracking-widest text-link uppercase">MacBook e iMac</p>
        <h2 id="mac-titulo" className="mt-4 text-5xl leading-none font-extrabold tracking-tight md:text-7xl">
          <WordsStagger as="span" inView className="block">
            Seu Mac parou?
          </WordsStagger>{" "}
          <WordsStagger as="span" inView delay={0.3} className="block text-primary">
            A gente resolve.
          </WordsStagger>
        </h2>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
          Especialistas em MacBook e iMac: reparo avançado de placa e troca de tela.
        </p>

        <ul aria-label="Sintomas comuns" className="mt-10 flex flex-wrap justify-center gap-2">
          {SINTOMAS_DO_MAC.map((sintoma) => (
            <li key={sintoma} className="rounded-full border border-border px-4 py-2 text-sm font-medium">
              {sintoma}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <a href={linkWhatsApp(mensagemDoServico("conserto de MacBook ou iMac"))} target="_blank" rel="noopener">
              <IconeWhatsApp />
              Pedir orçamento
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
            <Link href="/#servicos">Ver todos os serviços</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
