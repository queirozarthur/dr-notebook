import type { Metadata } from "next";
import type { FC } from "react";
import { ChamadaFinal } from "@/components/site/chamada-final";
import { Hero } from "./_inicio/hero";
import { SecaoAvaliacoes } from "./_inicio/secao-avaliacoes";
import { SecaoDrone } from "./_inicio/secao-drone";
import { SecaoMac } from "./_inicio/secao-mac";
import { SecaoOndeEstamos } from "./_inicio/secao-onde-estamos";
import { SecaoPlaca } from "./_inicio/secao-placa";
import { SecaoServicos } from "./_inicio/secao-servicos";
import { Sintomas } from "./_inicio/sintomas";

export const metadata: Metadata = {
  title: { absolute: "Dr. Notebook Maceió | Assistência técnica de informática" },
  description:
    "Assistência técnica em Maceió desde 2005. Reparo em placa de notebooks, MacBooks, PCs gamer, PS5, drones e celulares. Orçamento grátis pelo WhatsApp.",
};

// As seções alternam fundo claro e o palco azul-marinho, como nas referências da
// Apple: claro para ler, escuro para o 3D.
const Inicio: FC = () => {
  return (
    <main id="conteudo" className="flex-1">
      <Hero />
      <Sintomas />
      <SecaoServicos />
      <SecaoPlaca />
      <SecaoMac />
      <SecaoDrone />
      <SecaoAvaliacoes />
      <SecaoOndeEstamos />
      <ChamadaFinal />
    </main>
  );
};

export default Inicio;
