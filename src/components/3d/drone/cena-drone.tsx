"use client";

import type { FC, RefObject } from "react";
import { Canvas } from "@react-three/fiber";
import type { Ponteiro } from "@/hooks/use-ponteiro-na-janela";
import {
  AmbienteDeEstudio,
  DENSIDADE_DE_PIXELS,
  INTENSIDADE_AMBIENTE,
  Luzes,
  MirarCamera,
  OPCOES_GL,
  escolherRitmo,
  useEscalaParaCaber,
  type Vetor,
} from "../estudio";
import { Drone, type DroneProps, type ProgressoDrone } from "./drone";
import { ALTURA_NO_ENQUADRAMENTO, LARGURA_NO_ENQUADRAMENTO } from "./medidas-drone";

type CenaDroneProps = {
  progresso: RefObject<ProgressoDrone>;
  ponteiro: RefObject<Ponteiro>;
  ativa: boolean;
  movimentoReduzido: boolean;
  aoFicarPronta: () => void;
};

const POSICAO_CAMERA: Vetor = [0, 1.3, 6.5];
const ALVO_CAMERA: Vetor = [0, 0, 0];

export const CenaDrone: FC<CenaDroneProps> = ({ progresso, ponteiro, ativa, movimentoReduzido, aoFicarPronta }) => {
  return (
    <Canvas
      dpr={DENSIDADE_DE_PIXELS}
      frameloop={escolherRitmo(ativa, movimentoReduzido)}
      gl={OPCOES_GL}
      camera={{ position: POSICAO_CAMERA, fov: 30, near: 0.1, far: 40 }}
      scene={{ environmentIntensity: INTENSIDADE_AMBIENTE }}
      onCreated={aoFicarPronta}
    >
      <AmbienteDeEstudio />
      <Luzes />
      <MirarCamera alvo={ALVO_CAMERA} />
      <DroneEnquadrado progresso={progresso} ponteiro={ponteiro} animar={!movimentoReduzido} />
    </Canvas>
  );
};

type DroneEnquadradoProps = Omit<DroneProps, "escala">;

const DroneEnquadrado: FC<DroneEnquadradoProps> = (props) => {
  const escala = useEscalaParaCaber({
    alvo: ALVO_CAMERA,
    largura: LARGURA_NO_ENQUADRAMENTO,
    altura: ALTURA_NO_ENQUADRAMENTO,
    ocupacao: 0.85,
    escalaMaxima: 1.4,
  });

  return <Drone {...props} escala={escala} />;
};
