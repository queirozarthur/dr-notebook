import Link from "next/link";
import type { FC } from "react";
import { IconeWhatsApp } from "@/components/marca/icone-whatsapp";
import { Logo } from "@/components/marca/logo";
import { Button } from "@/components/ui/button";
import { MENSAGEM_ORCAMENTO, linkWhatsApp } from "@/lib/loja";
import { linksPrincipais } from "@/lib/navegacao";
import { MenuCelular } from "./menu-celular";

// No celular o cabeçalho não fica fixo (lição do John Radio Web): numa tela
// pequena, cada pixel de moldura fixa sai do conteúdo. Do md para cima ele gruda
// no topo, translúcido, como a barra da Apple.
export const Cabecalho: FC = () => {
  return (
    <header className="palco relative z-40 border-b border-border md:sticky md:top-0 md:bg-background/85 md:backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 md:h-14">
        <Link
          href="/"
          aria-label="Dr. Notebook Maceió, página inicial"
          className="-m-2 flex shrink-0 items-center rounded-lg p-2 outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Logo className="h-7 md:h-8" />
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {linksPrincipais.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex h-11 items-center rounded-full px-3 text-sm font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {link.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href={linkWhatsApp(MENSAGEM_ORCAMENTO)} target="_blank" rel="noopener">
              <IconeWhatsApp />
              Orçamento grátis
            </a>
          </Button>
          <MenuCelular links={linksPrincipais} />
        </div>
      </div>
    </header>
  );
};
