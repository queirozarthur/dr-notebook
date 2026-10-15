import { useEffect, useMemo } from "react";
import {
  BoxGeometry,
  CylinderGeometry,
  DoubleSide,
  MeshBasicMaterial,
  MeshStandardMaterial,
  RingGeometry,
  SphereGeometry,
} from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import {
  BANDEJA,
  BATERIA,
  BLOCO_SUPERIOR,
  BOLINHAS,
  CHIP_PROCESSADOR,
  CHIP_VIDEO,
  DIE,
  INDUTORES,
  LARGURA,
  MEMORIAS,
  PLACA,
  PROFUNDIDADE,
  VENTOINHA,
} from "./medidas-placa";
import { criarTexturaPlaca } from "./textura-placa";

const BRILHO_TRILHAS = { repouso: 0.15, destaque: 0.7 } as const;
const RAIO_CUBO_VENTOINHA = 0.07;

// Geometrias e materiais da vista explodida, criados uma vez e liberados ao desmontar.
export const useKitPlaca = () => {
  const kit = useMemo(() => {
    const texturaPlaca = criarTexturaPlaca();
    const materialPlaca = new MeshStandardMaterial({
      map: texturaPlaca,
      emissiveMap: texturaPlaca,
      emissive: "#ffffff",
      emissiveIntensity: BRILHO_TRILHAS.repouso,
      metalness: 0.2,
      roughness: 0.55,
    });
    const materialAnel = new MeshBasicMaterial({
      color: "#4d94ff",
      transparent: true,
      opacity: 0,
      side: DoubleSide,
      depthWrite: false,
      toneMapped: false,
    });

    // `destaque` de 0 a 1 acende as trilhas e o anel; `pulso` (0 a 1) faz o anel
    // respirar em volta do chip.
    const destacar = (destaque: number, pulso: number) => {
      materialPlaca.emissiveIntensity = BRILHO_TRILHAS.repouso + destaque * BRILHO_TRILHAS.destaque;
      materialAnel.opacity = destaque * (0.55 + 0.45 * pulso);
    };

    const ladoDieVideo = CHIP_VIDEO.lado * DIE.proporcao;
    const ladoDieProcessador = CHIP_PROCESSADOR.lado * DIE.proporcao;

    return {
      geometrias: {
        bandeja: new RoundedBoxGeometry(LARGURA, BANDEJA.altura, PROFUNDIDADE, 4, 0.024),
        blocoSuperior: new RoundedBoxGeometry(LARGURA, BLOCO_SUPERIOR.altura, PROFUNDIDADE, 4, 0.04),
        bateria: new RoundedBoxGeometry(BATERIA.largura, BATERIA.altura, BATERIA.profundidade, 2, 0.02),
        placa: new BoxGeometry(PLACA.largura, PLACA.espessura, PLACA.profundidade),
        chipVideo: new BoxGeometry(CHIP_VIDEO.lado, CHIP_VIDEO.altura, CHIP_VIDEO.lado),
        dieVideo: new BoxGeometry(ladoDieVideo, DIE.altura, ladoDieVideo),
        chipProcessador: new BoxGeometry(CHIP_PROCESSADOR.lado, CHIP_PROCESSADOR.altura, CHIP_PROCESSADOR.lado),
        dieProcessador: new BoxGeometry(ladoDieProcessador, DIE.altura, ladoDieProcessador),
        memoria: new BoxGeometry(MEMORIAS.largura, MEMORIAS.altura, MEMORIAS.profundidade),
        indutor: new BoxGeometry(INDUTORES.lado, INDUTORES.altura, INDUTORES.lado),
        bolinha: new SphereGeometry(BOLINHAS.raio, 10, 8),
        discoVentoinha: new CylinderGeometry(VENTOINHA.raio, VENTOINHA.raio, 0.01, 40),
        paredeVentoinha: new CylinderGeometry(VENTOINHA.raio, VENTOINHA.raio, VENTOINHA.altura, 40, 1, true),
        cuboVentoinha: new CylinderGeometry(RAIO_CUBO_VENTOINHA, RAIO_CUBO_VENTOINHA, VENTOINHA.altura * 0.8, 24),
        pa: new BoxGeometry(VENTOINHA.raio - RAIO_CUBO_VENTOINHA - 0.02, VENTOINHA.altura * 0.5, 0.07),
        anel: new RingGeometry(CHIP_VIDEO.lado * 0.82, CHIP_VIDEO.lado * 0.9, 64),
      },
      materiais: {
        aluminio: new MeshStandardMaterial({ color: "#c4cad6", metalness: 0.9, roughness: 0.32 }),
        bateria: new MeshStandardMaterial({ color: "#1b2131", metalness: 0.3, roughness: 0.6 }),
        placa: materialPlaca,
        chip: new MeshStandardMaterial({ color: "#11151d", metalness: 0.4, roughness: 0.45 }),
        die: new MeshStandardMaterial({ color: "#c9ced8", metalness: 0.95, roughness: 0.2 }),
        solda: new MeshStandardMaterial({ color: "#dfe3ea", metalness: 1, roughness: 0.25 }),
        ventoinha: new MeshStandardMaterial({ color: "#0e1220", metalness: 0.3, roughness: 0.5 }),
        paredeVentoinha: new MeshStandardMaterial({ color: "#0e1220", metalness: 0.3, roughness: 0.5, side: DoubleSide }),
        anel: materialAnel,
      },
      raioCuboVentoinha: RAIO_CUBO_VENTOINHA,
      destacar,
      texturaPlaca,
    };
  }, []);

  useEffect(() => {
    return () => {
      Object.values(kit.geometrias).forEach((geometria) => geometria.dispose());
      Object.values(kit.materiais).forEach((material) => material.dispose());
      kit.texturaPlaca.dispose();
    };
  }, [kit]);

  return kit;
};
