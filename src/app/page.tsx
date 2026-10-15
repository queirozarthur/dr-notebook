import type { Metadata } from "next";
import type { FC } from "react";
import { Hero } from "./_inicio/hero";
import { SecaoPlaca } from "./_inicio/secao-placa";
import { SecaoServicos } from "./_inicio/secao-servicos";
import { Sintomas } from "./_inicio/sintomas";

export const metadata: Metadata = {
  title: { absolute: "Dr. Notebook Maceió | Assistência técnica de informática" },
  description:
    "Assistência técnica em Maceió desde 2005. Reparo em placa de notebooks, MacBooks, PCs gamer, PS5, drones e celulares. Orçamento grátis pelo WhatsApp.",
};

const Inicio: FC = () => {
  return (
    <main id="conteudo" className="flex-1">
      <Hero />
      <Sintomas />
      <SecaoServicos />
      <SecaoPlaca />
    </main>
  );
};

export default Inicio;
