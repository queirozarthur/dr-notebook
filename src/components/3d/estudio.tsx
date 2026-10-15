"use client";

import { useEffect, useLayoutEffect, useMemo, type FC } from "react";
import { useThree } from "@react-three/fiber";
import { PMREMGenerator } from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

// Peças comuns às cenas 3D do site: o mesmo "estúdio" (reflexos, luzes, câmera)
// para o notebook, a placa e o drone parecerem da mesma sessão de fotos.

export type Vetor = [number, number, number];

export const DENSIDADE_DE_PIXELS: [number, number] = [1, 1.75];
export const OPCOES_GL = { antialias: true, alpha: true, powerPreference: "high-performance" } as const;
export const INTENSIDADE_AMBIENTE = 0.55;

// Fora da tela a cena não desenha nada; com movimento reduzido, só quando algo muda.
export const escolherRitmo = (ativa: boolean, movimentoReduzido: boolean) => {
  if (!ativa) return "never";
  return movimentoReduzido ? "demand" : "always";
};

// Reflexos de estúdio gerados em código (RoomEnvironment): nenhum HDR baixado.
// O <primitive attach="environment"> pendura o mapa na cena e o tira ao desmontar.
export const AmbienteDeEstudio: FC = () => {
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
export const Luzes: FC = () => {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={2.2} color="#e8efff" />
      <directionalLight position={[-5, 3, -4]} intensity={3} color="#4d94ff" />
      <directionalLight position={[5, 1, -5]} intensity={1.5} color="#9cc2ff" />
    </>
  );
};

type MirarCameraProps = {
  // Passe uma constante do módulo: um array novo a cada render reapontaria a câmera.
  alvo: Vetor;
};

export const MirarCamera: FC<MirarCameraProps> = ({ alvo }) => {
  const camera = useThree((estado) => estado.camera);

  useLayoutEffect(() => {
    camera.lookAt(...alvo);
  }, [camera, alvo]);

  return null;
};

type Enquadramento = {
  alvo: Vetor;
  // Tamanho do objeto, nas unidades da cena, e quanto do palco ele pode ocupar.
  largura: number;
  altura: number;
  ocupacao: number;
  escalaMaxima: number;
};

// Escala que faz o objeto caber no palco, do celular (estreito) ao desktop (largo).
export const useEscalaParaCaber = ({ alvo, largura, altura, ocupacao, escalaMaxima }: Enquadramento) => {
  const camera = useThree((estado) => estado.camera);
  const viewport = useThree((estado) => estado.viewport);
  const visivel = viewport.getCurrentViewport(camera, alvo);

  return Math.min(
    (visivel.width * ocupacao) / largura,
    (visivel.height * ocupacao) / altura,
    escalaMaxima,
  );
};
