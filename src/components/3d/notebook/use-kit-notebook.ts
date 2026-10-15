import { useEffect, useMemo } from "react";
import {
  BoxGeometry,
  CanvasTexture,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  Shape,
  ShapeGeometry,
} from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { criarMaterialTela } from "./material-tela";
import {
  ALTURA_BASE,
  ESPESSURA_TAMPA,
  LARGURA,
  MOLDURA,
  PROFUNDIDADE,
  TECLADO,
  TELA,
  TRACKPAD,
} from "./medidas";

const SEGMENTOS_CANTO = 4;
const MARGEM_POCO_TECLADO = 0.08;
// Com a tela acesa, o teclado ganha um fundo azul discreto.
const BRILHO_TECLADO = 0.16;

const retanguloArredondado = (largura: number, altura: number, raio: number) => {
  const [x, y] = [-largura / 2, -altura / 2];
  const forma = new Shape();
  forma.moveTo(x + raio, y);
  forma.lineTo(x + largura - raio, y);
  forma.quadraticCurveTo(x + largura, y, x + largura, y + raio);
  forma.lineTo(x + largura, y + altura - raio);
  forma.quadraticCurveTo(x + largura, y + altura, x + largura - raio, y + altura);
  forma.lineTo(x + raio, y + altura);
  forma.quadraticCurveTo(x, y + altura, x, y + altura - raio);
  forma.lineTo(x, y + raio);
  forma.quadraticCurveTo(x, y, x + raio, y);
  return new ShapeGeometry(forma, SEGMENTOS_CANTO);
};

// Sombra de contato barata: um degradê radial num plano sob o notebook.
const criarTexturaSombra = () => {
  const tamanho = 128;
  const centro = tamanho / 2;
  const tela = document.createElement("canvas");
  tela.width = tamanho;
  tela.height = tamanho;
  const contexto = tela.getContext("2d");
  if (contexto) {
    const degrade = contexto.createRadialGradient(centro, centro, 0, centro, centro, centro);
    degrade.addColorStop(0, "rgba(0, 0, 0, 0.8)");
    degrade.addColorStop(0.5, "rgba(0, 0, 0, 0.35)");
    degrade.addColorStop(1, "rgba(0, 0, 0, 0)");
    contexto.fillStyle = degrade;
    contexto.fillRect(0, 0, tamanho, tamanho);
  }
  return new CanvasTexture(tela);
};

// Geometrias e materiais do notebook, criados uma vez e liberados ao desmontar.
export const useKitNotebook = () => {
  const kit = useMemo(() => {
    const tela = criarMaterialTela(TELA.largura / TELA.altura);
    const texturaSombra = criarTexturaSombra();
    const larguraTeclado = TECLADO.colunas * TECLADO.passo + MARGEM_POCO_TECLADO;
    const profundidadeTeclado = TECLADO.linhas * TECLADO.passo + MARGEM_POCO_TECLADO;
    const materialTecla = new MeshStandardMaterial({
      color: "#151c2e",
      metalness: 0.2,
      roughness: 0.5,
      emissive: "#1a6bf0",
      emissiveIntensity: 0,
    });

    // `ligada` vai de 0 (tela apagada) a 1; `delta` é o tempo do quadro, em segundos.
    const acenderTela = (ligada: number, delta: number) => {
      tela.uniformes.uLigada.value = ligada;
      tela.uniformes.uTempo.value += delta;
      materialTecla.emissiveIntensity = ligada * BRILHO_TECLADO;
    };

    return {
      geometrias: {
        base: new RoundedBoxGeometry(LARGURA, ALTURA_BASE, PROFUNDIDADE, SEGMENTOS_CANTO, 0.05),
        tampa: new RoundedBoxGeometry(LARGURA, ESPESSURA_TAMPA, PROFUNDIDADE, SEGMENTOS_CANTO, 0.028),
        pocoTeclado: retanguloArredondado(larguraTeclado, profundidadeTeclado, 0.05),
        tecla: new BoxGeometry(TECLADO.tamanhoTecla, TECLADO.alturaTecla, TECLADO.tamanhoTecla),
        trackpad: retanguloArredondado(TRACKPAD.largura, TRACKPAD.profundidade, TRACKPAD.raio),
        moldura: retanguloArredondado(MOLDURA.largura, MOLDURA.altura, MOLDURA.raio),
        tela: new PlaneGeometry(TELA.largura, TELA.altura),
        sombra: new PlaneGeometry(LARGURA * 1.5, PROFUNDIDADE * 1.6),
      },
      materiais: {
        aluminio: new MeshStandardMaterial({ color: "#c4cad6", metalness: 0.9, roughness: 0.32 }),
        pocoTeclado: new MeshStandardMaterial({ color: "#0b1222", metalness: 0.3, roughness: 0.75 }),
        tecla: materialTecla,
        trackpad: new MeshStandardMaterial({ color: "#a9b0bd", metalness: 0.6, roughness: 0.18 }),
        moldura: new MeshStandardMaterial({ color: "#04060b", metalness: 0.2, roughness: 0.25 }),
        tela: tela.material,
        sombra: new MeshBasicMaterial({
          map: texturaSombra,
          transparent: true,
          depthWrite: false,
          toneMapped: false,
        }),
      },
      acenderTela,
      texturaSombra,
    };
  }, []);

  useEffect(() => {
    return () => {
      Object.values(kit.geometrias).forEach((geometria) => geometria.dispose());
      Object.values(kit.materiais).forEach((material) => material.dispose());
      kit.texturaSombra.dispose();
    };
  }, [kit]);

  return kit;
};
