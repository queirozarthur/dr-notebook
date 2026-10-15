import { useEffect, useState, type RefObject } from "react";

// Diz se o elemento está na tela (com uma folga, para acordar um pouco antes).
export const useVisivelNaTela = (alvo: RefObject<Element | null>, folga = "200px") => {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const elemento = alvo.current;
    if (!elemento) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada) setVisivel(entrada.isIntersecting);
      },
      { rootMargin: folga },
    );

    observador.observe(elemento);
    return () => observador.disconnect();
  }, [alvo, folga]);

  return visivel;
};
