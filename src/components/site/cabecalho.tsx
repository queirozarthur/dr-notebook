import Link from "next/link";
import type { FC } from "react";
import { VidroLiquido } from "@/components/efeitos/vidro-liquido";
import { IconeWhatsApp } from "@/components/marca/icone-whatsapp";
import { Logo } from "@/components/marca/logo";
import { Button } from "@/components/ui/button";
import { MENSAGEM_ORCAMENTO, linkWhatsApp } from "@/lib/loja";
import { linksPrincipais } from "@/lib/navegacao";
import { MenuCelular } from "./menu-celular";

// Cápsula de vidro (liquid glass) flutuando sobre a página. No celular ela não
// fica fixa (lição do John Radio Web): numa tela pequena, moldura fixa rouba
// espaço. Do md para cima ela acompanha a rolagem. A faixa em volta da cápsula é
// transparente e não pega cliques; a primeira seção de cada página reserva o
// espaço de cima (pt-28 ou mais).
export const Cabecalho: FC = () => {
  return (
    <header className="palco pointer-events-none absolute inset-x-0 top-0 z-40 bg-transparent px-3 pt-3 md:fixed">
      <VidroLiquido className="pointer-events-auto mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 rounded-full pr-2 pl-5">
        <Link
          href="/"
          aria-label="Dr. Notebook Maceió, página inicial"
          className="-m-2 flex shrink-0 items-center rounded-full p-2 outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Logo className="h-7" />
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {linksPrincipais.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex h-10 items-center rounded-full px-3.5 text-sm font-medium text-foreground transition-colors outline-none hover:bg-foreground/10 focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {link.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden h-10 sm:inline-flex">
            <a href={linkWhatsApp(MENSAGEM_ORCAMENTO)} target="_blank" rel="noopener">
              <IconeWhatsApp />
              Orçamento grátis
            </a>
          </Button>
          <MenuCelular links={linksPrincipais} />
        </div>
      </VidroLiquido>
    </header>
  );
};
