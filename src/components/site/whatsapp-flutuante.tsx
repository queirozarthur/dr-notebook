"use client";

import { useEffect, useRef, useState, type FC } from "react";
import { IconeWhatsApp } from "@/components/marca/icone-whatsapp";
import { MENSAGEM_ORCAMENTO, linkWhatsApp } from "@/lib/loja";
import { cn } from "@/lib/utils";

// No celular o cabeçalho não fica fixo; depois da primeira tela, este botão
// mantém o WhatsApp sempre a um toque. Do lg para cima o cabeçalho fixo já tem o
// botão, então este some. Um marcador invisível do tamanho da primeira tela diz
// quando o visitante passou dela.
export const WhatsAppFlutuante: FC = () => {
  const marcador = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const elemento = marcador.current;
    if (!elemento) return;

    const observador = new IntersectionObserver(([entrada]) => {
      if (entrada) setVisivel(!entrada.isIntersecting);
    });
    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  return (
    <>
      <div ref={marcador} aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-svh" />
      <a
        href={linkWhatsApp(MENSAGEM_ORCAMENTO)}
        target="_blank"
        rel="noopener"
        inert={!visivel}
        aria-label="Pedir orçamento pelo WhatsApp"
        className={cn(
          "fixed right-4 bottom-4 z-50 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-black/30 lg:hidden",
          "transition-[opacity,scale,translate] duration-300 ease-suave outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-96",
          visivel ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-90 opacity-0",
        )}
      >
        <IconeWhatsApp className="size-7" />
      </a>
    </>
  );
};
