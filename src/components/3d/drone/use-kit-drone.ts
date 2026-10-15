import { useEffect, useMemo } from "react";
import {
  BoxGeometry,
  CircleGeometry,
  CylinderGeometry,
  DoubleSide,
  MeshBasicMaterial,
  MeshStandardMaterial,
  SphereGeometry,
  TorusGeometry,
} from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { BRACO, CORPO, DISCO_HELICE, GIMBAL, HELICE, LED, LENTE, MOTOR, TAMPA_CORPO } from "./medidas-drone";

const OPACIDADE_DISCO = 0.1;

// Geometrias e materiais do drone, criados uma vez e liberados ao desmontar.
// O comprimento de cada braço varia, então a geometria do braço tem 1 de
// comprimento e cada braço a estica na escala.
export const useKitDrone = () => {
  const kit = useMemo(() => {
    const materialDisco = new MeshBasicMaterial({
      color: "#dfe8ff",
      transparent: true,
      opacity: 0,
      side: DoubleSide,
      depthWrite: false,
      toneMapped: false,
    });

    // `giro` de 0 (parado) a 1 (girando): o disco translúcido simula o borrão.
    const mostrarGiro = (giro: number) => {
      materialDisco.opacity = giro * OPACIDADE_DISCO;
    };

    return {
      geometrias: {
        corpo: new RoundedBoxGeometry(CORPO.largura, CORPO.altura, CORPO.comprimento, 4, CORPO.raio),
        tampaCorpo: new RoundedBoxGeometry(
          TAMPA_CORPO.largura,
          TAMPA_CORPO.altura,
          TAMPA_CORPO.comprimento,
          4,
          TAMPA_CORPO.raio,
        ),
        braco: new BoxGeometry(BRACO.largura, BRACO.altura, 1),
        motor: new CylinderGeometry(MOTOR.raio, MOTOR.raio, MOTOR.altura, 24),
        helice: new BoxGeometry(HELICE.comprimento, HELICE.espessura, HELICE.largura),
        disco: new CircleGeometry(DISCO_HELICE.raio, 48),
        gimbal: new SphereGeometry(GIMBAL.raio, 24, 16),
        lente: new CylinderGeometry(LENTE.raio, LENTE.raio, LENTE.profundidade, 24),
        anelLente: new TorusGeometry(LENTE.raio, 0.008, 8, 32),
        led: new SphereGeometry(LED.raio, 12, 8),
      },
      materiais: {
        corpo: new MeshStandardMaterial({ color: "#2b3039", metalness: 0.3, roughness: 0.45 }),
        tampaCorpo: new MeshStandardMaterial({ color: "#3b414c", metalness: 0.35, roughness: 0.4 }),
        braco: new MeshStandardMaterial({ color: "#262a32", metalness: 0.3, roughness: 0.5 }),
        motor: new MeshStandardMaterial({ color: "#9aa3b2", metalness: 0.9, roughness: 0.3 }),
        helice: new MeshStandardMaterial({ color: "#14171d", metalness: 0.2, roughness: 0.6 }),
        disco: materialDisco,
        lente: new MeshStandardMaterial({ color: "#05080f", metalness: 0.9, roughness: 0.08 }),
        ledFrente: new MeshBasicMaterial({ color: "#4d94ff", toneMapped: false }),
        ledTras: new MeshBasicMaterial({ color: "#e8efff", toneMapped: false }),
      },
      mostrarGiro,
    };
  }, []);

  useEffect(() => {
    return () => {
      Object.values(kit.geometrias).forEach((geometria) => geometria.dispose());
      Object.values(kit.materiais).forEach((material) => material.dispose());
    };
  }, [kit]);

  return kit;
};
