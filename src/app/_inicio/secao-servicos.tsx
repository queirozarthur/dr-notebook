import Link from "next/link";
import type { FC, ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Keyboard } from "lucide-react";
import { RevelarAoRolar } from "@/components/animacao/revelar-ao-rolar";
import { IconeServico } from "@/components/marca/icone-servico";
import { CabecalhoSecao } from "@/components/site/cabecalho-secao";
import { TiltCard } from "@/components/spell/tilt-card";
import { linkWhatsApp } from "@/lib/loja";
import { caminhoDoServico, mensagemDoServico, servicos, type Servico, type SlugServico } from "@/lib/servicos";
import { cn } from "@/lib/utils";

const MENSAGEM_LOJA = "Olá! Vim pelo site e quero saber sobre periféricos e kits de upgrade.";

// Grade em 4 colunas no desktop: o reparo em placa (o diferencial) ocupa duas,
// no palco azul-marinho; Software e TI e a Loja fecham a última linha com duas
// cada. Os cartões usam o tilt-card do Spell UI.
const LARGOS: readonly SlugServico[] = ["reparo-em-placa", "software-e-ti"];

export const SecaoServicos: FC = () => {
  return (
    <section id="servicos" aria-labelledby="servicos-titulo" className="scroll-mt-14 bg-muted py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <CabecalhoSecao
          id="servicos-titulo"
          sobretitulo="Serviços"
          titulo="Do notebook ao drone."
          descricao="Técnicos especializados e laboratório próprio para diagnóstico e reparo."
        />

        <RevelarAoRolar className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {servicos.map((servico) => (
            <CartaoServico key={servico.slug} servico={servico} largo={LARGOS.includes(servico.slug)} />
          ))}
          <CartaoLoja />
        </RevelarAoRolar>
      </div>
    </section>
  );
};

type CartaoServicoProps = {
  servico: Servico & { slug: SlugServico };
  largo: boolean;
};

const CartaoServico: FC<CartaoServicoProps> = ({ servico, largo }) => {
  return (
    <Cartao largo={largo} destaque={servico.destaque === true}>
      <IconeServico icone={servico.icone} className="size-8 text-link" />
      <h3 className="mt-8 text-xl font-bold tracking-tight">{servico.titulo}</h3>
      <p className="mt-2 text-muted-foreground">{servico.resumo}</p>
      <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-6">
        <Link
          href={caminhoDoServico(servico.slug)}
          className="inline-flex items-center gap-1 rounded-full font-semibold text-link outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
        >
          Ver detalhes<span className="sr-only"> de {servico.titulo}</span>
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
        <LinkOrcamento href={linkWhatsApp(mensagemDoServico(servico.assunto))} assunto={servico.titulo} />
      </div>
    </Cartao>
  );
};

const CartaoLoja: FC = () => {
  return (
    <Cartao largo destaque={false}>
      <Keyboard aria-hidden="true" className="size-8 text-link" />
      <h3 className="mt-8 text-xl font-bold tracking-tight">Loja de informática</h3>
      <p className="mt-2 text-muted-foreground">Periféricos para notebook e desktop e kits de upgrade.</p>
      <div className="mt-auto pt-6">
        <LinkOrcamento href={linkWhatsApp(MENSAGEM_LOJA)} assunto="Loja de informática" texto="Perguntar" />
      </div>
    </Cartao>
  );
};

type CartaoProps = {
  children: ReactNode;
  largo: boolean;
  destaque: boolean;
};

const Cartao: FC<CartaoProps> = ({ children, largo, destaque }) => {
  return (
    <div data-revelar className={cn(largo && "sm:col-span-2")}>
      <TiltCard
        className={cn(
          "flex h-full flex-col rounded-3xl border border-border p-6 md:p-8",
          destaque ? "palco" : "bg-background",
        )}
      >
        {children}
      </TiltCard>
    </div>
  );
};

type LinkOrcamentoProps = {
  href: string;
  // Completa o nome do link para leitores de tela ("Pedir orçamento de Drones").
  assunto: string;
  texto?: string;
};

const LinkOrcamento: FC<LinkOrcamentoProps> = ({ href, assunto, texto = "Pedir orçamento" }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="inline-flex items-center gap-1 rounded-full font-semibold text-link outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
    >
      {texto}
      <span className="sr-only"> de {assunto}</span>
      <ArrowUpRight aria-hidden="true" className="size-4" />
    </a>
  );
};
