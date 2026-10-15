import Link from "next/link";
import type { FC } from "react";
import { ArrowRight } from "lucide-react";
import { IconeServico } from "@/components/marca/icone-servico";
import { CabecalhoSecao } from "@/components/site/cabecalho-secao";
import { caminhoDoServico, servicos, type SlugServico } from "@/lib/servicos";

type OutrosServicosProps = {
  atual: SlugServico;
};

// Links entre as páginas de serviço: ajudam quem chegou pela busca a ver o resto
// e ajudam o Google a encontrar todas as páginas.
export const OutrosServicos: FC<OutrosServicosProps> = ({ atual }) => {
  const outros = servicos.filter((servico) => servico.slug !== atual);

  return (
    <section aria-labelledby="outros-titulo" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <CabecalhoSecao id="outros-titulo" sobretitulo="Outros serviços" titulo="A gente também conserta." />
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {outros.map((servico) => (
            <li key={servico.slug}>
              <Link
                href={caminhoDoServico(servico.slug)}
                className="group flex h-full items-center gap-4 rounded-2xl border border-border p-5 transition-colors outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
              >
                <IconeServico icone={servico.icone} className="size-6 shrink-0 text-link" />
                <span className="flex-1 font-semibold">{servico.titulo}</span>
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
