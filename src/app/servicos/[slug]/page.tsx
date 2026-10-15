import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { FC } from "react";
import { Check, ChevronRight } from "lucide-react";
import { RevelarEmSequencia } from "@/components/animacao/revelar-em-sequencia";
import { IconeWhatsApp } from "@/components/marca/icone-whatsapp";
import { JsonLd } from "@/components/seo/json-ld";
import { ChamadaFinal } from "@/components/site/chamada-final";
import { FundoHexagonos } from "@/components/site/fundo-hexagonos";
import { WordsStagger } from "@/components/spell/words-stagger";
import { Button } from "@/components/ui/button";
import { linkWhatsApp, loja } from "@/lib/loja";
import { IMAGEM_DE_COMPARTILHAMENTO, dadosDoServico, trilhaDoServico } from "@/lib/seo";
import { caminhoDoServico, mensagemDoServico, servicos } from "@/lib/servicos";
import { ComoFunciona } from "./como-funciona";
import { OutrosServicos } from "./outros-servicos";
import { VisualDoServico } from "./visual-do-servico";

type PaginaServicoProps = PageProps<"/servicos/[slug]">;

// Site estático: só existem as páginas dos serviços da lista; outro endereço é 404.
export const dynamicParams = false;

export const generateStaticParams = () => {
  return servicos.map(({ slug }) => ({ slug }));
};

const encontrarServico = (slug: string) => {
  return servicos.find((servico) => servico.slug === slug);
};

export const generateMetadata = async ({ params }: PaginaServicoProps): Promise<Metadata> => {
  const { slug } = await params;
  const servico = encontrarServico(slug);
  if (!servico) notFound();

  return {
    title: servico.pagina.tituloMeta,
    description: servico.pagina.descricao,
    alternates: { canonical: caminhoDoServico(servico.slug) },
    openGraph: {
      title: `${servico.pagina.titulo} | ${loja.nome}`,
      description: servico.pagina.descricao,
      images: [IMAGEM_DE_COMPARTILHAMENTO],
    },
  };
};

const PaginaServico: FC<PaginaServicoProps> = async ({ params }) => {
  const { slug } = await params;
  const servico = encontrarServico(slug);
  if (!servico) notFound();

  return (
    <main id="conteudo" className="flex-1">
      <JsonLd dados={dadosDoServico(servico)} />
      <JsonLd dados={trilhaDoServico(servico)} />

      <section aria-labelledby="servico-titulo" className="palco relative isolate overflow-hidden">
        <FundoHexagonos />
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pt-28 pb-16 lg:grid-cols-2 lg:gap-12 lg:pt-32 lg:pb-20">
          <div>
            <nav aria-label="Trilha de navegação">
              <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-foreground">
                    Início
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="size-4" />
                </li>
                <li>
                  <Link href="/#servicos" className="hover:text-foreground">
                    Serviços
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="size-4" />
                </li>
                <li aria-current="page" className="text-foreground">
                  {servico.titulo}
                </li>
              </ol>
            </nav>

            <h1 id="servico-titulo" className="mt-8 flex flex-col gap-4">
              <RevelarEmSequencia as="span" className="block">
                <span className="block text-sm font-semibold tracking-widest text-link uppercase">
                  {loja.nome} · desde {loja.desde}
                </span>
              </RevelarEmSequencia>{" "}
              <WordsStagger
                as="span"
                delay={0.1}
                className="block text-4xl leading-tight font-extrabold tracking-tight md:text-6xl"
              >
                {servico.pagina.titulo}
              </WordsStagger>
            </h1>

            <RevelarEmSequencia atraso={0.5} className="mt-6 flex flex-col gap-8">
              <p className="max-w-xl text-lg text-muted-foreground md:text-xl">
                {servico.resumo} Diagnóstico antes do serviço e orçamento grátis pelo WhatsApp.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <a href={linkWhatsApp(mensagemDoServico(servico.assunto))} target="_blank" rel="noopener">
                    <IconeWhatsApp />
                    Pedir orçamento grátis
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/#servicos">Ver todos os serviços</Link>
                </Button>
              </div>
            </RevelarEmSequencia>
          </div>

          <VisualDoServico icone={servico.icone} />
        </div>
      </section>

      <section aria-labelledby="itens-titulo" className="bg-background py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold tracking-widest text-link uppercase">O que a gente faz</p>
            <h2 id="itens-titulo" className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
              {servico.titulo}
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Não achou o problema do seu aparelho na lista? Pergunte no WhatsApp: o orçamento é grátis.
            </p>
          </div>

          <div className="flex flex-col gap-10">
            <ul className="flex flex-col divide-y divide-border border-y border-border">
              {servico.itens.map((item) => (
                <li key={item} className="flex items-center gap-3 py-4 text-lg">
                  <Check aria-hidden="true" className="size-5 shrink-0 text-link" />
                  {item}
                </li>
              ))}
            </ul>

            {"marcas" in servico && (
              <div>
                <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">Marcas atendidas</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {servico.marcas.map((marca) => (
                    <li key={marca} className="rounded-full border border-border px-4 py-2 text-sm font-medium">
                      {marca}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <ComoFunciona />
      <OutrosServicos atual={servico.slug} />
      <ChamadaFinal />
    </main>
  );
};

export default PaginaServico;
