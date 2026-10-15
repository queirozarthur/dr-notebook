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
import { ALTURA_NO_ENQUADRAMENTO, LARGURA_NO_ENQUADRAMENTO } from "./medidas-placa";
import { PlacaExplodida, type PlacaExplodidaProps, type ProgressoPlaca } from "./placa-explodida";

type CenaPlacaProps = {
  progresso: RefObject<ProgressoPlaca>;
  ponteiro: RefObject<Ponteiro>;
  ativa: boolean;
  movimentoReduzido: boolean;
  aoFicarPronta: () => void;
};

// Câmera mais alta que a do hero: a placa é vista de cima, entre as camadas.
const POSICAO_CAMERA: Vetor = [0, 3.1, 6.4];
const ALVO_CAMERA: Vetor = [0, 0, 0];

export const CenaPlaca: FC<CenaPlacaProps> = ({ progresso, ponteiro, ativa, movimentoReduzido, aoFicarPronta }) => {
  return (
    <Canvas
      dpr={DENSIDADE_DE_PIXELS}
      frameloop={escolherRitmo(ativa, movimentoReduzido)}
      gl={OPCOES_GL}
      camera={{ position: POSICAO_CAMERA, fov: 28, near: 0.1, far: 40 }}
      scene={{ environmentIntensity: INTENSIDADE_AMBIENTE }}
      onCreated={aoFicarPronta}
    >
      <AmbienteDeEstudio />
      <Luzes />
      <MirarCamera alvo={ALVO_CAMERA} />
      <PlacaEnquadrada progresso={progresso} ponteiro={ponteiro} animar={!movimentoReduzido} />
    </Canvas>
  );
};

type PlacaEnquadradaProps = Omit<PlacaExplodidaProps, "escala">;

const PlacaEnquadrada: FC<PlacaEnquadradaProps> = (props) => {
  const escala = useEscalaParaCaber({
    alvo: ALVO_CAMERA,
    largura: LARGURA_NO_ENQUADRAMENTO,
    altura: ALTURA_NO_ENQUADRAMENTO,
    ocupacao: 0.92,
    escalaMaxima: 1.3,
  });

  return <PlacaExplodida {...props} escala={escala} />;
};
