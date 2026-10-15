import type { Metadata } from "next";
import type { FC } from "react";
import { Hero } from "./_inicio/hero";

export const metadata: Metadata = {
  title: { absolute: "Dr. Notebook Maceió | Assistência técnica de informática" },
  description:
    "Assistência técnica em Maceió desde 2005. Reparo em placa de notebooks, MacBooks, PCs gamer, PS5, drones e celulares. Orçamento grátis pelo WhatsApp.",
};

const Inicio: FC = () => {
  return (
    <main id="conteudo" className="flex flex-1 flex-col">
      <Hero />
    </main>
  );
};

export default Inicio;
