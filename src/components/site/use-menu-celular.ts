import { useCallback, useEffect, useRef, useState } from "react";

// Estado e comportamento do menu do celular: abre e fecha pelo botão, fecha com
// Esc (devolvendo o foco ao botão) e ao tocar fora do menu.
export const useMenuCelular = () => {
  const [aberto, setAberto] = useState(false);
  const raiz = useRef<HTMLDivElement>(null);
  const botao = useRef<HTMLButtonElement>(null);

  const alternar = useCallback(() => {
    setAberto((estavaAberto) => !estavaAberto);
  }, []);

  const fechar = useCallback(() => {
    setAberto(false);
  }, []);

  useEffect(() => {
    if (!aberto) return;

    const fecharComEsc = (evento: KeyboardEvent) => {
      if (evento.key !== "Escape") return;
      setAberto(false);
      botao.current?.focus();
    };

    const fecharAoTocarFora = (evento: PointerEvent) => {
      if (evento.target instanceof Node && raiz.current?.contains(evento.target)) return;
      setAberto(false);
    };

    document.addEventListener("keydown", fecharComEsc);
    document.addEventListener("pointerdown", fecharAoTocarFora);

    return () => {
      document.removeEventListener("keydown", fecharComEsc);
      document.removeEventListener("pointerdown", fecharAoTocarFora);
    };
  }, [aberto]);

  return { aberto, alternar, fechar, raiz, botao };
};
