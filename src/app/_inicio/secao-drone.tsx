import type { FC } from "react";
import { IconeWhatsApp } from "@/components/marca/icone-whatsapp";
import { CabecalhoSecao } from "@/components/site/cabecalho-secao";
import { Button } from "@/components/ui/button";
import { linkWhatsApp } from "@/lib/loja";
import { mensagemDoServico } from "@/lib/servicos";
import { FundoHexagonos } from "@/components/site/fundo-hexagonos";
import { PalcoDrone } from "@/components/3d/drone/palco-drone";

// O título vem do reel da loja ("Então não sabe onde levar o seu drone?").
// "Conserto de drone em Maceió" é uma das buscas em que a loja hoje não aparece.
export const SecaoDrone: FC = () => {
  return (
    <section aria-labelledby="drone-titulo" className="palco relative isolate overflow-hidden py-24 md:py-32">
      <FundoHexagonos />
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 lg:grid-cols-2 lg:gap-12">
        <PalcoDrone />

        <div className="lg:order-first">
          <CabecalhoSecao
            id="drone-titulo"
            sobretitulo="Conserto de drone em Maceió"
            titulo="Não sabe onde levar o seu drone?"
            descricao="DJI e outras marcas, com laboratório próprio para diagnóstico e reparo, aqui na Jatiúca."
          />
          <Button asChild size="lg" className="mt-10">
            <a href={linkWhatsApp(mensagemDoServico("conserto de drone"))} target="_blank" rel="noopener">
              <IconeWhatsApp />
              Pedir orçamento do drone
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
