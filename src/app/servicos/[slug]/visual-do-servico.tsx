import type { FC } from "react";
import { PalcoDrone } from "@/components/3d/drone/palco-drone";
import { PalcoPlaca } from "@/components/3d/placa/palco-placa";
import { IconeServico } from "@/components/marca/icone-servico";
import type { Servico } from "@/lib/servicos";

type VisualDoServicoProps = {
  icone: Servico["icone"];
};

// Placa e drone têm cena 3D própria; os outros serviços mostram o ícone em
// destaque, no mesmo brilho azul dos palcos.
export const VisualDoServico: FC<VisualDoServicoProps> = ({ icone }) => {
  switch (icone) {
    case "placa":
      return <PalcoPlaca animacao="entrada" />;
    case "drone":
      return <PalcoDrone animacao="entrada" />;
    default:
      return <IconeEmDestaque icone={icone} />;
  }
};

const IconeEmDestaque: FC<VisualDoServicoProps> = ({ icone }) => {
  return (
    <div aria-hidden="true" className="relative grid h-72 place-items-center lg:h-96">
      <div className="absolute size-72 rounded-full bg-primary/35 blur-3xl" />
      <div className="relative grid size-40 place-items-center rounded-4xl border border-border bg-card shadow-2xl shadow-black/40 lg:size-48">
        <IconeServico icone={icone} className="size-20 text-link lg:size-24" />
      </div>
    </div>
  );
};
