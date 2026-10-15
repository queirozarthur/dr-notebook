"use client";

import { useLayoutEffect, useRef, type FC, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils, Object3D, type Group, type InstancedMesh, type Mesh } from "three";
import type { Ponteiro } from "@/hooks/use-ponteiro-na-janela";
import {
  BATERIA,
  BOLINHAS,
  CENTRO_VERTICAL,
  CHIP_PROCESSADOR,
  CHIP_VIDEO,
  DIE,
  ETAPAS,
  EXPLOSAO,
  INDUTORES,
  MEMORIAS,
  MONTADO,
  PLACA,
  TOPO_DA_PLACA,
  VENTOINHA,
} from "./medidas-placa";
import { useKitPlaca } from "./use-kit-placa";

// O GSAP escreve `valor` (0 a 1) com o scroll; a cena lê a cada quadro.
export type ProgressoPlaca = { valor: number };

export type PlacaExplodidaProps = {
  progresso: RefObject<ProgressoPlaca>;
  ponteiro: RefObject<Ponteiro>;
  escala: number;
  // Falso com movimento reduzido: sem ventoinha girando, anel parado, sem parallax.
  animar: boolean;
};

const GIRO = -0.32;
const PARALLAX = 0.1;
const AMORTECIMENTO = 6;
const VELOCIDADE_VENTOINHA = 6;
const RITMO_DO_PULSO = 3;
const DEITADO = -Math.PI / 2;
const INCLINACAO_DAS_PAS = 0.35;

const TOTAL_BOLINHAS = BOLINHAS.porLado * BOLINHAS.porLado;
const ANGULOS_DAS_PAS = Array.from({ length: VENTOINHA.pas }, (_, indice) => (indice / VENTOINHA.pas) * Math.PI * 2);

const posicionarInstancias = (malha: InstancedMesh, posicoes: [number, number, number][]) => {
  const auxiliar = new Object3D();
  posicoes.forEach((posicao, indice) => {
    auxiliar.position.set(...posicao);
    auxiliar.updateMatrix();
    malha.setMatrixAt(indice, auxiliar.matrix);
  });
  malha.instanceMatrix.needsUpdate = true;
  malha.computeBoundingSphere();
};

// Grade de esferas de solda sob o chip de vídeo (o que o reballing refaz).
const POSICOES_BOLINHAS = Array.from({ length: TOTAL_BOLINHAS }, (_, indice): [number, number, number] => {
  const metade = ((BOLINHAS.porLado - 1) * BOLINHAS.passo) / 2;
  const linha = Math.floor(indice / BOLINHAS.porLado);
  const coluna = indice % BOLINHAS.porLado;
  return [
    CHIP_VIDEO.x - metade + coluna * BOLINHAS.passo,
    TOPO_DA_PLACA + BOLINHAS.raio,
    CHIP_VIDEO.z - metade + linha * BOLINHAS.passo,
  ];
});

const POSICOES_INDUTORES = Array.from({ length: INDUTORES.quantidade }, (_, indice): [number, number, number] => [
  INDUTORES.de + indice * INDUTORES.passo,
  TOPO_DA_PLACA + INDUTORES.altura / 2,
  INDUTORES.z,
]);

export const PlacaExplodida: FC<PlacaExplodidaProps> = ({ progresso, ponteiro, escala, animar }) => {
  const kit = useKitPlaca();
  const raiz = useRef<Group>(null);
  const bandeja = useRef<Mesh>(null);
  const bateria = useRef<Mesh>(null);
  const bloco = useRef<Mesh>(null);
  const chipVideo = useRef<Group>(null);
  const anel = useRef<Mesh>(null);
  const pas = useRef<Group>(null);
  const bolinhas = useRef<InstancedMesh>(null);
  const indutores = useRef<InstancedMesh>(null);
  const tempo = useRef(0);

  useLayoutEffect(() => {
    if (bolinhas.current) posicionarInstancias(bolinhas.current, POSICOES_BOLINHAS);
    if (indutores.current) posicionarInstancias(indutores.current, POSICOES_INDUTORES);
  }, []);

  useFrame((_, delta) => {
    const [conjunto, fundo, celula, topo, chip, destaque, helice] = [
      raiz.current,
      bandeja.current,
      bateria.current,
      bloco.current,
      chipVideo.current,
      anel.current,
      pas.current,
    ];
    if (!conjunto || !fundo || !celula || !topo || !chip || !destaque || !helice) return;

    const valor = progresso.current.valor;
    const abrir = MathUtils.smootherstep(valor, ETAPAS.abrir.de, ETAPAS.abrir.ate);
    const realce = MathUtils.smootherstep(valor, ETAPAS.destacar.de, ETAPAS.destacar.ate);

    topo.position.set(0, MONTADO.blocoSuperior + abrir * EXPLOSAO.blocoSuperior.y, abrir * EXPLOSAO.blocoSuperior.z);
    topo.rotation.x = abrir * EXPLOSAO.blocoSuperior.inclinacao;
    celula.position.set(0, MONTADO.bateria + abrir * EXPLOSAO.bateria.y, BATERIA.z + abrir * EXPLOSAO.bateria.z);
    fundo.position.y = MONTADO.bandeja + abrir * EXPLOSAO.bandeja.y;
    chip.position.y = MONTADO.chipVideo + realce * EXPLOSAO.chipVideo.y;

    tempo.current += delta;
    const pulso = animar ? 0.5 + 0.5 * Math.sin(tempo.current * RITMO_DO_PULSO) : 1;
    destaque.scale.setScalar(1 + 0.12 * pulso * realce);
    kit.destacar(realce, pulso);

    if (animar) helice.rotation.y += delta * VELOCIDADE_VENTOINHA;
    const giro = GIRO + ponteiro.current.x * PARALLAX;
    conjunto.rotation.y = animar ? MathUtils.damp(conjunto.rotation.y, giro, AMORTECIMENTO, delta) : giro;
    conjunto.scale.setScalar(escala);
  });

  const distanciaDasPas = kit.raioCuboVentoinha + (VENTOINHA.raio - kit.raioCuboVentoinha) / 2;

  return (
    <group ref={raiz} rotation-y={GIRO}>
      <group position-y={-CENTRO_VERTICAL}>
        <mesh ref={bandeja} geometry={kit.geometrias.bandeja} material={kit.materiais.aluminio} position-y={MONTADO.bandeja} />
        <mesh
          ref={bateria}
          geometry={kit.geometrias.bateria}
          material={kit.materiais.bateria}
          position={[0, MONTADO.bateria, BATERIA.z]}
        />

        <group position={[0, MONTADO.placa, PLACA.z]}>
          <mesh geometry={kit.geometrias.placa} material={kit.materiais.placa} />
          <instancedMesh ref={bolinhas} args={[kit.geometrias.bolinha, kit.materiais.solda, TOTAL_BOLINHAS]} />
          <group ref={chipVideo} position={[CHIP_VIDEO.x, MONTADO.chipVideo, CHIP_VIDEO.z]}>
            <mesh geometry={kit.geometrias.chipVideo} material={kit.materiais.chip} />
            <mesh
              geometry={kit.geometrias.dieVideo}
              material={kit.materiais.die}
              position-y={(CHIP_VIDEO.altura + DIE.altura) / 2}
            />
          </group>
          <mesh
            ref={anel}
            geometry={kit.geometrias.anel}
            material={kit.materiais.anel}
            rotation-x={DEITADO}
            position={[CHIP_VIDEO.x, TOPO_DA_PLACA + 0.003, CHIP_VIDEO.z]}
          />

          <group position={[CHIP_PROCESSADOR.x, TOPO_DA_PLACA + CHIP_PROCESSADOR.altura / 2, CHIP_PROCESSADOR.z]}>
            <mesh geometry={kit.geometrias.chipProcessador} material={kit.materiais.chip} />
            <mesh
              geometry={kit.geometrias.dieProcessador}
              material={kit.materiais.die}
              position-y={(CHIP_PROCESSADOR.altura + DIE.altura) / 2}
            />
          </group>
          {MEMORIAS.posicoes.map(([x, z]) => (
            <mesh
              key={`${x}:${z}`}
              geometry={kit.geometrias.memoria}
              material={kit.materiais.chip}
              position={[x, TOPO_DA_PLACA + MEMORIAS.altura / 2, z]}
            />
          ))}
          <instancedMesh ref={indutores} args={[kit.geometrias.indutor, kit.materiais.chip, INDUTORES.quantidade]} />

          <group position={[VENTOINHA.x, TOPO_DA_PLACA, VENTOINHA.z]}>
            <mesh geometry={kit.geometrias.discoVentoinha} material={kit.materiais.ventoinha} position-y={0.005} />
            <mesh
              geometry={kit.geometrias.paredeVentoinha}
              material={kit.materiais.paredeVentoinha}
              position-y={VENTOINHA.altura / 2}
            />
            <group ref={pas} position-y={VENTOINHA.altura / 2}>
              <mesh geometry={kit.geometrias.cuboVentoinha} material={kit.materiais.die} />
              {ANGULOS_DAS_PAS.map((angulo) => (
                <mesh
                  key={angulo}
                  geometry={kit.geometrias.pa}
                  material={kit.materiais.ventoinha}
                  position={[Math.cos(angulo) * distanciaDasPas, 0, -Math.sin(angulo) * distanciaDasPas]}
                  rotation={[INCLINACAO_DAS_PAS, angulo, 0, "YXZ"]}
                />
              ))}
            </group>
          </group>
        </group>

        <mesh
          ref={bloco}
          geometry={kit.geometrias.blocoSuperior}
          material={kit.materiais.aluminio}
          position-y={MONTADO.blocoSuperior}
        />
      </group>
    </group>
  );
};
