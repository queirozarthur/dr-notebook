"use client";

import Link from "next/link";
import { useId, type FC } from "react";
import { Menu, X } from "lucide-react";
import { IconeWhatsApp } from "@/components/marca/icone-whatsapp";
import { Button } from "@/components/ui/button";
import { MENSAGEM_ORCAMENTO, linkWhatsApp } from "@/lib/loja";
import type { LinkNavegacao } from "@/lib/navegacao";
import { cn } from "@/lib/utils";
import { useMenuCelular } from "./use-menu-celular";

type MenuCelularProps = {
  links: readonly LinkNavegacao[];
};

export const MenuCelular: FC<MenuCelularProps> = ({ links }) => {
  const { aberto, alternar, fechar, raiz, botao } = useMenuCelular();
  const idPainel = useId();

  return (
    <div ref={raiz} className="md:hidden">
      <button
        ref={botao}
        type="button"
        aria-expanded={aberto}
        aria-controls={idPainel}
        onClick={alternar}
        className="grid size-11 place-items-center rounded-full text-foreground transition-[background-color,scale] duration-150 ease-out outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring active:scale-96"
      >
        <span className="sr-only">{aberto ? "Fechar menu" : "Abrir menu"}</span>
        <IconeMenu aberto={aberto} />
      </button>

      <div
        id={idPainel}
        inert={!aberto}
        className={cn(
          "absolute inset-x-0 top-full border-b border-border bg-background px-4 pt-2 pb-6 shadow-2xl shadow-black/50",
          "transition-[opacity,translate,visibility] duration-200 ease-suave",
          aberto ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
        )}
      >
        <nav aria-label="Principal">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={fechar}
                  className="flex h-14 items-center border-b border-border text-lg font-semibold outline-none focus-visible:text-link"
                >
                  {link.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Button asChild size="lg" className="mt-6 w-full">
          <a href={linkWhatsApp(MENSAGEM_ORCAMENTO)} target="_blank" rel="noopener">
            <IconeWhatsApp />
            Pedir orçamento grátis
          </a>
        </Button>
      </div>
    </div>
  );
};

type IconeMenuProps = {
  aberto: boolean;
};

// Troca ☰ ↔ ✕ por cross-fade (skill ui-motion): os dois ícones ficam montados,
// então a transição vale na ida e na volta e não roda na primeira pintura.
const TRANSICAO_ICONE = "size-6 transition-[opacity,filter,scale] duration-300 ease-suave";
const ICONE_VISIVEL = "scale-100 opacity-100 blur-none";
const ICONE_OCULTO = "scale-25 opacity-0 blur-xs";

const IconeMenu: FC<IconeMenuProps> = ({ aberto }) => {
  return (
    <span aria-hidden="true" className="relative grid size-6 place-items-center">
      <X className={cn(TRANSICAO_ICONE, "absolute inset-0", aberto ? ICONE_VISIVEL : ICONE_OCULTO)} />
      <Menu className={cn(TRANSICAO_ICONE, aberto ? ICONE_OCULTO : ICONE_VISIVEL)} />
    </span>
  );
};
