import type { FC } from "react";
import { CircuitBoard, Cpu, DatabaseBackup, Microchip } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { IconeWhatsApp } from "@/components/marca/icone-whatsapp";
import { CabecalhoSecao } from "@/components/site/cabecalho-secao";
import { Button } from "@/components/ui/button";
import { linkWhatsApp } from "@/lib/loja";
import { mensagemDoServico } from "@/lib/servicos";
import { FundoHexagonos } from "./fundo-hexagonos";
import { PalcoPlaca } from "./palco-placa";

type Tecnica = {
  titulo: string;
  explicacao: string;
  icone: LucideIcon;
};

// As técnicas são as do briefing; as explicações dizem o que cada uma é, sem
// prometer prazo nem resultado.
const TECNICAS: readonly Tecnica[] = [
  {
    titulo: "Placa-mãe e placa de vídeo",
    explicacao: "Conserto dos componentes na própria placa.",
    icone: CircuitBoard,
  },
  {
    titulo: "Reballing",
    explicacao: "Refaz as esferas de solda que ligam o chip à placa.",
    icone: Microchip,
  },
  {
    titulo: "Regravação de BIOS",
    explicacao: "Reprograma o chip da BIOS quando o firmware corrompe.",
    icone: Cpu,
  },
  {
    titulo: "Recuperação de dados",
    explicacao: "Resgate de arquivos de aparelhos que pararam de funcionar.",
    icone: DatabaseBackup,
  },
];

export const SecaoPlaca: FC = () => {
  return (
    <section
      id="reparo-em-placa"
      aria-labelledby="placa-titulo"
      className="palco relative isolate scroll-mt-14 overflow-hidden py-24 md:py-32"
    >
      <FundoHexagonos />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2">
        <div>
          <CabecalhoSecao
            id="placa-titulo"
            sobretitulo="Reparo em placa"
            titulo="O conserto que vai até o chip."
            descricao="É o diferencial técnico da Dr. Notebook: o reparo é feito nos componentes da placa. E o diagnóstico vem antes, para você saber o que o aparelho tem antes de decidir."
          />

          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {TECNICAS.map(({ titulo, explicacao, icone: Icone }) => (
              <li key={titulo} className="flex flex-col gap-2">
                <Icone aria-hidden="true" className="size-6 text-link" />
                <h3 className="font-bold">{titulo}</h3>
                <p className="text-muted-foreground">{explicacao}</p>
              </li>
            ))}
          </ul>

          <Button asChild size="lg" className="mt-10">
            <a href={linkWhatsApp(mensagemDoServico("reparo em placa"))} target="_blank" rel="noopener">
              <IconeWhatsApp />
              Pedir orçamento grátis
            </a>
          </Button>
        </div>

        <PalcoPlaca />
      </div>
    </section>
  );
};
