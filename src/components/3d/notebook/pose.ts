// O GSAP anima só estes dois números (0 a 1), numa ref; a cena lê a ref a cada
// quadro e calcula a pose. Nada disso é estado React: nenhum render por quadro.
export type EstadoAnimacao = {
  // Ao carregar a página: o notebook sobe, gira e entreabre a tampa.
  entrada: number;
  // Com o scroll: a tampa abre, a tela acende e o notebook vira de frente.
  rolagem: number;
};

export type Pose = {
  // 0 fechada, 1 aberta (ANGULO_TAMPA_ABERTA).
  abertura: number;
  // Rotações em radianos.
  giro: number;
  inclinacao: number;
  elevacao: number;
  escala: number;
};

// A elevação compensa o modelo estar centrado na altura da tampa aberta: fechado,
// ele sobe para ficar no meio do palco; aberto, desce um pouco.
const POSE_ANTES_DA_ENTRADA: Pose = { abertura: 0, giro: -1.15, inclinacao: 0, elevacao: -0.5, escala: 0.92 };
const POSE_EM_REPOUSO: Pose = { abertura: 0.34, giro: -0.6, inclinacao: 0.04, elevacao: 0.22, escala: 1 };
const POSE_ABERTA: Pose = { abertura: 1, giro: 0, inclinacao: 0.12, elevacao: -0.12, escala: 1.04 };

const misturar = (de: number, para: number, quanto: number) => {
  return de + (para - de) * quanto;
};

const misturarPoses = (de: Pose, para: Pose, quanto: number): Pose => {
  return {
    abertura: misturar(de.abertura, para.abertura, quanto),
    giro: misturar(de.giro, para.giro, quanto),
    inclinacao: misturar(de.inclinacao, para.inclinacao, quanto),
    elevacao: misturar(de.elevacao, para.elevacao, quanto),
    escala: misturar(de.escala, para.escala, quanto),
  };
};

export const calcularPose = ({ entrada, rolagem }: EstadoAnimacao): Pose => {
  const repouso = misturarPoses(POSE_ANTES_DA_ENTRADA, POSE_EM_REPOUSO, entrada);
  return misturarPoses(repouso, POSE_ABERTA, rolagem);
};
