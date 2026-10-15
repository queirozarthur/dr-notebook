import type { FC } from "react";
import { ArrowUpRight, Quote, Star } from "lucide-react";
import { NumeroAnimado } from "@/components/animacao/numero-animado";
import { RevelarAoRolar } from "@/components/animacao/revelar-ao-rolar";
import { CabecalhoSecao } from "@/components/site/cabecalho-secao";
import { assertNever } from "@/lib/assert-never";
import { temasMaisCitados, trechos, type Trecho } from "@/lib/avaliacoes";
import { loja } from "@/lib/loja";

const NOTA = Number(loja.avaliacoes.nota.replace(",", "."));
const NOTA_MAXIMA = 5;

export const SecaoAvaliacoes: FC = () => {
  return (
    <section id="avaliacoes" aria-labelledby="avaliacoes-titulo" className="scroll-mt-14 bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <CabecalhoSecao
          id="avaliacoes-titulo"
          sobretitulo="Avaliações"
          titulo="O que dizem os clientes."
          descricao="Todas as avaliações no Google têm resposta da loja."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          <div className="palco flex flex-col justify-between gap-8 rounded-3xl p-8">
            <div>
              <p className="text-7xl font-extrabold tracking-tight">
                <NumeroAnimado valor={NOTA} casasDecimais={1} />
              </p>
              <Estrelas nota={NOTA} />
              <p className="mt-3 text-muted-foreground">
                <NumeroAnimado valor={loja.avaliacoes.total} className="font-semibold text-foreground" /> avaliações
                no Google
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground">O que mais aparece nas avaliações</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {temasMaisCitados.map(({ tema, mencoes }) => (
                  <li key={tema} className="rounded-full bg-secondary px-3 py-1.5 text-sm">
                    {tema} <span className="text-muted-foreground tabular-nums">· {mencoes}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={loja.mapas.perfil}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1 self-start rounded-full font-semibold text-link outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
            >
              Ver as avaliações no Google
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>

          <RevelarAoRolar className="grid gap-4 lg:col-span-2 lg:grid-cols-2">
            {trechos.map((trecho) => (
              <CartaoTrecho key={trecho.texto} trecho={trecho} />
            ))}
          </RevelarAoRolar>
        </div>
      </div>
    </section>
  );
};

type EstrelasProps = {
  nota: number;
};

// Cinco estrelas cinza e, por cima, as azuis cortadas na proporção da nota.
const Estrelas: FC<EstrelasProps> = ({ nota }) => {
  const preenchimento = `${(nota / NOTA_MAXIMA) * 100}%`;
  const linha = Array.from({ length: NOTA_MAXIMA }, (_, indice) => (
    <Star key={indice} aria-hidden="true" className="size-6 shrink-0 fill-current" />
  ));

  return (
    <span role="img" aria-label={`Nota ${loja.avaliacoes.nota} de ${NOTA_MAXIMA}`} className="relative mt-2 inline-flex">
      <span className="flex text-muted">{linha}</span>
      <span className="absolute inset-y-0 left-0 flex overflow-hidden text-link" style={{ width: preenchimento }}>
        {linha}
      </span>
    </span>
  );
};

type CartaoTrechoProps = {
  trecho: Trecho;
};

const ESTILO_DO_TEXTO = "text-2xl font-bold tracking-tight";

// Citação vai entre aspas, num <blockquote>; relato é um resumo nosso, sem aspas.
const CartaoTrecho: FC<CartaoTrechoProps> = ({ trecho }) => {
  switch (trecho.tipo) {
    case "citacao":
      return (
        <figure data-revelar className="flex h-full flex-col gap-6 rounded-3xl bg-muted p-8">
          <Quote aria-hidden="true" className="size-8 text-link" />
          <blockquote className={ESTILO_DO_TEXTO}>“{trecho.texto}”</blockquote>
          <figcaption className="mt-auto text-sm text-muted-foreground">Avaliação no Google</figcaption>
        </figure>
      );
    case "relato":
      return (
        <div data-revelar className="flex h-full flex-col gap-6 rounded-3xl bg-muted p-8 lg:col-span-2">
          <p className={ESTILO_DO_TEXTO}>{trecho.texto}</p>
          <p className="mt-auto text-sm text-muted-foreground">Relato de uma cliente no Google</p>
        </div>
      );
    default:
      return assertNever(trecho);
  }
};
