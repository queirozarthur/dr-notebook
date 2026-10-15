"use client";

import { useRef, type FC, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils, type Group } from "three";
import type { Ponteiro } from "@/hooks/use-ponteiro-na-janela";
import { BRACOS, GIMBAL, HELICE, LENTE, MOTOR, TAMPA_CORPO } from "./medidas-drone";
import { useKitDrone } from "./use-kit-drone";

// O GSAP escreve `valor` (0 a 1) com o scroll; a cena lê a cada quadro.
export type ProgressoDrone = { valor: number };

export type DroneProps = {
  progresso: RefObject<ProgressoDrone>;
  ponteiro: RefObject<Ponteiro>;
  escala: number;
  // Falso com movimento reduzido: hélices paradas, sem flutuar, sem seguir o mouse.
  animar: boolean;
};

type Kit = ReturnType<typeof useKitDrone>;

// Ao entrar na tela o drone sobe e gira de três quartos; depois flutua e se
// inclina para o lado do mouse, como quem desvia.
const POSE = { antes: { altura: -0.9, giro: -0.9 }, depois: { altura: 0, giro: 0.35 } } as const;
const FLUTUACAO = { amplitude: 0.06, ritmo: 1.6 } as const;
const BALANCO = { amplitude: 0.03, ritmo: 1.1 } as const;
const SEGUIR_MOUSE = { giro: 0.2, rolagem: 0.25, arfagem: 0.15 } as const;
const AMORTECIMENTO = 4;
const VELOCIDADE_HELICE = 28;
const ALTURA_DOS_MOTORES = 0.06;
const DE_FRENTE = Math.PI / 2;

export const Drone: FC<DroneProps> = ({ progresso, ponteiro, escala, animar }) => {
  const kit = useKitDrone();
  const raiz = useRef<Group>(null);
  const nave = useRef<Group>(null);
  const tempo = useRef(0);

  useFrame((_, delta) => {
    const [conjunto, corpo] = [raiz.current, nave.current];
    if (!conjunto || !corpo) return;

    const subida = MathUtils.smootherstep(progresso.current.valor, 0, 1);
    if (animar) tempo.current += delta;
    const flutuacao = animar ? Math.sin(tempo.current * FLUTUACAO.ritmo) * FLUTUACAO.amplitude : 0;
    const balanco = animar ? Math.sin(tempo.current * BALANCO.ritmo) * BALANCO.amplitude : 0;
    const [mouseX, mouseY] = animar ? [ponteiro.current.x, ponteiro.current.y] : [0, 0];
    const aproximar = (atual: number, alvo: number) => {
      return animar ? MathUtils.damp(atual, alvo, AMORTECIMENTO, delta) : alvo;
    };

    conjunto.position.y = MathUtils.lerp(POSE.antes.altura, POSE.depois.altura, subida) + flutuacao;
    conjunto.rotation.y = aproximar(
      conjunto.rotation.y,
      MathUtils.lerp(POSE.antes.giro, POSE.depois.giro, subida) + mouseX * SEGUIR_MOUSE.giro,
    );
    conjunto.scale.setScalar(escala);
    corpo.rotation.z = aproximar(corpo.rotation.z, -mouseX * SEGUIR_MOUSE.rolagem);
    corpo.rotation.x = aproximar(corpo.rotation.x, mouseY * SEGUIR_MOUSE.arfagem + balanco);
    kit.mostrarGiro(animar ? 1 : 0);
  });

  return (
    <group ref={raiz}>
      <group ref={nave}>
        <mesh geometry={kit.geometrias.corpo} material={kit.materiais.corpo} />
        <mesh geometry={kit.geometrias.tampaCorpo} material={kit.materiais.tampaCorpo} position-y={TAMPA_CORPO.y} />

        <mesh geometry={kit.geometrias.gimbal} material={kit.materiais.corpo} position={[0, GIMBAL.y, GIMBAL.z]} />
        <mesh
          geometry={kit.geometrias.lente}
          material={kit.materiais.lente}
          rotation-x={DE_FRENTE}
          position={[0, GIMBAL.y, GIMBAL.z + GIMBAL.raio * 0.8]}
        />
        <mesh
          geometry={kit.geometrias.anelLente}
          material={kit.materiais.ledFrente}
          position={[0, GIMBAL.y, GIMBAL.z + GIMBAL.raio * 0.8 + LENTE.profundidade / 2]}
        />

        {BRACOS.map((braco) => (
          <BracoComHelice key={braco.motor.join(":")} braco={braco} kit={kit} animar={animar} />
        ))}
      </group>
    </group>
  );
};

type BracoComHeliceProps = {
  braco: (typeof BRACOS)[number];
  kit: Kit;
  animar: boolean;
};

const BracoComHelice: FC<BracoComHeliceProps> = ({ braco, kit, animar }) => {
  const helice = useRef<Group>(null);
  const [inicioX, inicioZ] = braco.inicio;
  const [motorX, motorZ] = braco.motor;
  const [dx, dz] = [motorX - inicioX, motorZ - inicioZ];
  const alturaHelice = ALTURA_DOS_MOTORES + MOTOR.altura / 2 + HELICE.folga;

  useFrame((_, delta) => {
    if (animar && helice.current) helice.current.rotation.y += delta * VELOCIDADE_HELICE * braco.sentido;
  });

  return (
    <>
      <mesh
        geometry={kit.geometrias.braco}
        material={kit.materiais.braco}
        position={[(inicioX + motorX) / 2, 0.02, (inicioZ + motorZ) / 2]}
        rotation-y={Math.atan2(dx, dz)}
        scale-z={Math.hypot(dx, dz)}
      />
      <mesh geometry={kit.geometrias.motor} material={kit.materiais.motor} position={[motorX, ALTURA_DOS_MOTORES, motorZ]} />
      <mesh
        geometry={kit.geometrias.led}
        material={braco.frente ? kit.materiais.ledFrente : kit.materiais.ledTras}
        position={[motorX, ALTURA_DOS_MOTORES - MOTOR.altura / 2, motorZ]}
      />
      <group ref={helice} position={[motorX, alturaHelice, motorZ]}>
        <mesh geometry={kit.geometrias.helice} material={kit.materiais.helice} />
        <mesh geometry={kit.geometrias.disco} material={kit.materiais.disco} rotation-x={-Math.PI / 2} />
      </group>
    </>
  );
};
