import { useEffect, useState, type RefObject } from "react";
import { desenharMapaDeRefracao } from "@/lib/mapa-de-refracao";

// Refração só existe onde o navegador aplica filtro SVG no backdrop-filter: hoje,
// os do Chromium (Chrome, Edge). Nos outros, o vidro fica só desfocado. Quem pediu
// menos transparência ao sistema também fica sem.
export type Refracao = { tipo: "indisponivel" } | { tipo: "pronta"; mapa: string; largura: number; altura: number };

const BISEL = 18;

const ehChromium = () => {
  const dados: unknown = Reflect.get(navigator, "userAgentData");
  if (typeof dados !== "object" || dados === null || !("brands" in dados) || !Array.isArray(dados.brands)) {
    return false;
  }
  return dados.brands.some(
    (marca: unknown) => typeof marca === "object" && marca !== null && "brand" in marca && marca.brand === "Chromium",
  );
};

const podeRefratar = () => {
  return ehChromium() && !window.matchMedia("(prefers-reduced-transparency: reduce)").matches;
};

// Mede a camada de vidro e desenha o mapa de refração no tamanho dela; refaz o
// mapa quando o tamanho muda.
export const useRefracao = (camada: RefObject<HTMLElement | null>) => {
  const [refracao, setRefracao] = useState<Refracao>({ tipo: "indisponivel" });

  useEffect(() => {
    const elemento = camada.current;
    if (!elemento || !podeRefratar()) return;

    const medirEDesenhar = () => {
      const { width, height } = elemento.getBoundingClientRect();
      const [largura, altura] = [Math.round(width), Math.round(height)];
      if (!largura || !altura) return;

      const raioDeclarado = Number.parseFloat(getComputedStyle(elemento).borderTopLeftRadius) || 0;
      const raio = Math.min(raioDeclarado, altura / 2, largura / 2);
      try {
        const mapa = desenharMapaDeRefracao({ largura, altura, raio, bisel: BISEL });
        setRefracao({ tipo: "pronta", mapa, largura, altura });
      } catch {
        setRefracao({ tipo: "indisponivel" });
      }
    };

    const observador = new ResizeObserver(medirEDesenhar);
    observador.observe(elemento);
    return () => observador.disconnect();
  }, [camada]);

  return refracao;
};
