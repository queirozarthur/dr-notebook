"use client";

import { useLayoutEffect, useRef, type FC, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils, Object3D, type Group, type InstancedMesh, type PointLight } from "three";
import type { Ponteiro } from "@/hooks/use-ponteiro-na-janela";
import {
  ALTURA_BASE,
  ANGULO_TAMPA_ABERTA,
  CENTRO_VERTICAL,
  ESPESSURA_TAMPA,
  POSICOES_TECLAS,
  PROFUNDIDADE,
  RECUO_DOBRADICA,
  TECLADO,
  TELA,
  TRACKPAD,
  Y_DOBRADICA,
  Y_SUPERFICIE,
} from "./medidas";
import { calcularPose, type EstadoAnimacao } from "./pose";
import { useKitNotebook } from "./use-kit-notebook";

export type NotebookProps = {
  estado: RefObject<EstadoAnimacao>;
  ponteiro: RefObject<Ponteiro>;
  escala: number;
  suavizar: boolean;
};

// Quanto o notebook acompanha o mouse, e com que rapidez chega na pose pedida.
const PARALLAX = 0.12;
const AMORTECIMENTO = 6;
// A tela acende entre 35% e 80% da abertura e ilumina o teclado de azul.
const ACENDE_DE = 0.35;
const ACENDE_ATE = 0.8;
const INTENSIDADE_LUZ_TELA = 2.5;
const COR_LUZ_TELA = "#4d94ff";
const Y_TECLAS = Y_SUPERFICIE + TECLADO.alturaTecla / 2;
const DEITADO = -Math.PI / 2;
// A tela fica na face de baixo da tampa (voltada para o teclado quando fechada).
const VOLTADO_PARA_BAIXO = Math.PI / 2;

export const Notebook: FC<NotebookProps> = ({ estado, ponteiro, escala, suavizar }) => {
  const kit = useKitNotebook();
  const raiz = useRef<Group>(null);
  const dobradica = useRef<Group>(null);
  const teclas = useRef<InstancedMesh>(null);
  const luzTela = useRef<PointLight>(null);

  useLayoutEffect(() => {
    const malha = teclas.current;
    if (!malha) return;

    const auxiliar = new Object3D();
    POSICOES_TECLAS.forEach((tecla, indice) => {
      auxiliar.position.set(tecla.x, Y_TECLAS, tecla.z);
      auxiliar.scale.set(tecla.largura / TECLADO.tamanhoTecla, 1, 1);
      auxiliar.updateMatrix();
      malha.setMatrixAt(indice, auxiliar.matrix);
    });
    malha.instanceMatrix.needsUpdate = true;
    malha.computeBoundingSphere();
  }, []);

  useFrame((_, delta) => {
    const [conjunto, tampa, luz] = [raiz.current, dobradica.current, luzTela.current];
    if (!conjunto || !tampa || !luz) return;

    const pose = calcularPose(estado.current);
    const aproximar = (atual: number, alvo: number) => {
      return suavizar ? MathUtils.damp(atual, alvo, AMORTECIMENTO, delta) : alvo;
    };

    conjunto.rotation.y = aproximar(conjunto.rotation.y, pose.giro + ponteiro.current.x * PARALLAX);
    conjunto.rotation.x = aproximar(conjunto.rotation.x, pose.inclinacao + ponteiro.current.y * PARALLAX * 0.5);
    conjunto.position.y = aproximar(conjunto.position.y, pose.elevacao * escala);
    conjunto.scale.setScalar(aproximar(conjunto.scale.x, escala * pose.escala));
    tampa.rotation.x = aproximar(tampa.rotation.x, -pose.abertura * ANGULO_TAMPA_ABERTA);

    const abertura = -tampa.rotation.x / ANGULO_TAMPA_ABERTA;
    const ligada = MathUtils.smoothstep(abertura, ACENDE_DE, ACENDE_ATE);
    kit.acenderTela(ligada, delta);
    luz.intensity = ligada * INTENSIDADE_LUZ_TELA;
  });

  return (
    <group ref={raiz}>
      <group position-y={-CENTRO_VERTICAL}>
        <mesh geometry={kit.geometrias.sombra} material={kit.materiais.sombra} rotation-x={DEITADO} position-y={0.002} />
        <mesh geometry={kit.geometrias.base} material={kit.materiais.aluminio} position-y={ALTURA_BASE / 2} />
        <mesh
          geometry={kit.geometrias.pocoTeclado}
          material={kit.materiais.pocoTeclado}
          rotation-x={DEITADO}
          position={[0, Y_SUPERFICIE, TECLADO.centroZ]}
        />
        <instancedMesh ref={teclas} args={[kit.geometrias.tecla, kit.materiais.tecla, POSICOES_TECLAS.length]} />
        <mesh
          geometry={kit.geometrias.trackpad}
          material={kit.materiais.trackpad}
          rotation-x={DEITADO}
          position={[0, Y_SUPERFICIE, TRACKPAD.centroZ]}
        />

        <group ref={dobradica} position={[0, Y_DOBRADICA, -PROFUNDIDADE / 2 + RECUO_DOBRADICA]}>
          <mesh
            geometry={kit.geometrias.tampa}
            material={kit.materiais.aluminio}
            position={[0, ESPESSURA_TAMPA / 2, PROFUNDIDADE / 2]}
          />
          <mesh
            geometry={kit.geometrias.moldura}
            material={kit.materiais.moldura}
            rotation-x={VOLTADO_PARA_BAIXO}
            position={[0, -0.002, PROFUNDIDADE / 2]}
          />
          <mesh
            geometry={kit.geometrias.tela}
            material={kit.materiais.tela}
            rotation-x={VOLTADO_PARA_BAIXO}
            position={[0, -0.004, TELA.centroZ]}
          />
          <pointLight
            ref={luzTela}
            color={COR_LUZ_TELA}
            intensity={0}
            distance={4}
            decay={2}
            position={[0, -0.8, TELA.centroZ]}
          />
        </group>
      </group>
    </group>
  );
};
