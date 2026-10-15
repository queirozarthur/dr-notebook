import type { FC } from "react";
import {
  CircuitBoard,
  Drone,
  Gamepad2,
  Laptop,
  LaptopMinimal,
  MonitorCog,
  PcCase,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import type { Servico } from "@/lib/servicos";

// Um ícone por tipo de serviço. O satisfies garante que nenhum tipo fica sem
// ícone: um serviço novo sem entrada aqui quebra o build.
const ICONES = {
  placa: CircuitBoard,
  notebook: Laptop,
  mac: LaptopMinimal,
  gamer: PcCase,
  videogame: Gamepad2,
  drone: Drone,
  celular: Smartphone,
  software: MonitorCog,
} as const satisfies Record<Servico["icone"], LucideIcon>;

type IconeServicoProps = {
  icone: Servico["icone"];
  className?: string;
};

export const IconeServico: FC<IconeServicoProps> = ({ icone, className }) => {
  const Icone = ICONES[icone];
  return <Icone aria-hidden="true" className={className} />;
};
