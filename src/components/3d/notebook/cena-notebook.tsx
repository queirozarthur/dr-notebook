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
import { ALTURA_NO_ENQUADRAMENTO, LARGURA_NO_ENQUADRAMENTO } from "./medidas";
import { Notebook, type NotebookProps } from "./notebook";
import type { EstadoAnimacao } from "./pose";

type CenaNotebookProps = {
  estado: RefObject<EstadoAnimacao>;
  ponteiro: RefObject<Ponteiro>;
  ativa: boolean;
  movimentoReduzido: boolean;
  aoFicarPronta: () => void;
};

const POSICAO_CAMERA: Vetor = [0, 1.4, 8.6];
const ALVO_CAMERA: Vetor = [0, 0, 0];

export const CenaNotebook: FC<CenaNotebookProps> = ({ estado, ponteiro, ativa, movimentoReduzido, aoFicarPronta }) => {
  return (
    <Canvas
      dpr={DENSIDADE_DE_PIXELS}
      frameloop={escolherRitmo(ativa, movimentoReduzido)}
      gl={OPCOES_GL}
      camera={{ position: POSICAO_CAMERA, fov: 26, near: 0.1, far: 40 }}
      scene={{ environmentIntensity: INTENSIDADE_AMBIENTE }}
      onCreated={aoFicarPronta}
    >
      <AmbienteDeEstudio />
      <Luzes />
      <MirarCamera alvo={ALVO_CAMERA} />
      <NotebookEnquadrado estado={estado} ponteiro={ponteiro} suavizar={!movimentoReduzido} />
    </Canvas>
  );
};

type NotebookEnquadradoProps = Omit<NotebookProps, "escala">;

const NotebookEnquadrado: FC<NotebookEnquadradoProps> = (props) => {
  const escala = useEscalaParaCaber({
    alvo: ALVO_CAMERA,
    largura: LARGURA_NO_ENQUADRAMENTO,
    altura: ALTURA_NO_ENQUADRAMENTO,
    ocupacao: 0.85,
    escalaMaxima: 1.2,
  });

  return <Notebook {...props} escala={escala} />;
};
