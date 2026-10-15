"use client";

import { useEffect, useLayoutEffect, useMemo, type FC, type RefObject } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { PMREMGenerator } from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import type { Ponteiro } from "@/hooks/use-ponteiro-na-janela";
import { ALTURA_NO_ENQUADRAMENTO, LARGURA_NO_ENQUADRAMENTO } from "./medidas";
import { Notebook, type NotebookProps } from "./notebook";
import type { EstadoAnimacao } from "./pose";

type CenaNotebookProps = {
  estado: RefObject<EstadoAnimacao>;
  ponteiro: RefObject<Ponteiro>;
  // Fora da tela a cena não desenha nada; com movimento reduzido, só quando algo muda.
  ativa: boolean;
  movimentoReduzido: boolean;
  aoFicarPronta: () => void;
};

const DENSIDADE_DE_PIXELS: [number, number] = [1, 1.75];
const OPCOES_GL = { antialias: true, alpha: true, powerPreference: "high-performance" } as const;
const POSICAO_CAMERA: [number, number, number] = [0, 1.4, 8.6];
const ALVO_CAMERA: [number, number, number] = [0, 0, 0];
const CAMPO_DE_VISAO = 26;
// Quanto do palco o notebook pode ocupar, na largura e na altura.
const OCUPACAO_LARGURA = 0.88;
const OCUPACAO_ALTURA = 0.8;
const ESCALA_MAXIMA = 1.2;
const INTENSIDADE_AMBIENTE = 0.55;

const escolherRitmo = (ativa: boolean, movimentoReduzido: boolean) => {
  if (!ativa) return "never";
  return movimentoReduzido ? "demand" : "always";
};

export const CenaNotebook: FC<CenaNotebookProps> = ({ estado, ponteiro, ativa, movimentoReduzido, aoFicarPronta }) => {
  return (
    <Canvas
      dpr={DENSIDADE_DE_PIXELS}
      frameloop={escolherRitmo(ativa, movimentoReduzido)}
      gl={OPCOES_GL}
      camera={{ position: POSICAO_CAMERA, fov: CAMPO_DE_VISAO, near: 0.1, far: 40 }}
      scene={{ environmentIntensity: INTENSIDADE_AMBIENTE }}
      onCreated={aoFicarPronta}
    >
      <AmbienteDeEstudio />
      <Luzes />
      <MirarCamera />
      <NotebookEnquadrado estado={estado} ponteiro={ponteiro} suavizar={!movimentoReduzido} />
    </Canvas>
  );
};

// Reflexos de estúdio gerados em código (RoomEnvironment): nenhum HDR baixado.
// O <primitive attach="environment"> pendura o mapa na cena e o tira ao desmontar.
const AmbienteDeEstudio: FC = () => {
  const renderizador = useThree((estado) => estado.gl);

  const mapa = useMemo(() => {
    const gerador = new PMREMGenerator(renderizador);
    const sala = new RoomEnvironment();
    const textura = gerador.fromScene(sala, 0.04).texture;
    sala.dispose();
    gerador.dispose();
    return textura;
  }, [renderizador]);

  useEffect(() => {
    return () => mapa.dispose();
  }, [mapa]);

  return <primitive object={mapa} attach="environment" />;
};

// Luz principal fria pela frente e contornos azuis por trás, que recortam o
// alumínio contra o azul-marinho do palco.
const Luzes: FC = () => {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={2.2} color="#e8efff" />
      <directionalLight position={[-5, 3, -4]} intensity={3} color="#4d94ff" />
      <directionalLight position={[5, 1, -5]} intensity={1.5} color="#9cc2ff" />
    </>
  );
};

const MirarCamera: FC = () => {
  const camera = useThree((estado) => estado.camera);

  useLayoutEffect(() => {
    camera.lookAt(...ALVO_CAMERA);
  }, [camera]);

  return null;
};

type NotebookEnquadradoProps = Omit<NotebookProps, "escala">;

// Escala o notebook para caber no palco, do celular (estreito) ao desktop (largo).
const NotebookEnquadrado: FC<NotebookEnquadradoProps> = (props) => {
  const camera = useThree((estado) => estado.camera);
  const viewport = useThree((estado) => estado.viewport);
  const visivel = viewport.getCurrentViewport(camera, ALVO_CAMERA);
  const escala = Math.min(
    (visivel.width * OCUPACAO_LARGURA) / LARGURA_NO_ENQUADRAMENTO,
    (visivel.height * OCUPACAO_ALTURA) / ALTURA_NO_ENQUADRAMENTO,
    ESCALA_MAXIMA,
  );

  return <Notebook {...props} escala={escala} />;
};
