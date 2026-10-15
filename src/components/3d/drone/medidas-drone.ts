// Drone dobrável de quatro hélices, de frente para a câmera (+z). Unidades da cena.

export const CORPO = { largura: 0.62, altura: 0.26, comprimento: 1.25, raio: 0.1 } as const;
export const TAMPA_CORPO = { largura: 0.48, altura: 0.06, comprimento: 0.95, raio: 0.03, y: 0.14 } as const;
export const BRACO = { largura: 0.07, altura: 0.05 } as const;
export const MOTOR = { raio: 0.085, altura: 0.12 } as const;
export const HELICE = { comprimento: 0.86, largura: 0.075, espessura: 0.008, folga: 0.07 } as const;
export const DISCO_HELICE = { raio: 0.45 } as const;
export const GIMBAL = { raio: 0.11, y: -0.12, z: 0.6 } as const;
export const LENTE = { raio: 0.05, profundidade: 0.04 } as const;
export const LED = { raio: 0.022 } as const;

type Braco = {
  // De onde o braço sai do corpo até onde fica o motor (x, z).
  inicio: [number, number];
  motor: [number, number];
  // As hélices vizinhas giram em sentidos opostos, como num drone de verdade.
  sentido: 1 | -1;
  frente: boolean;
};

export const BRACOS: readonly Braco[] = [
  { inicio: [-0.24, 0.42], motor: [-0.8, 0.66], sentido: 1, frente: true },
  { inicio: [0.24, 0.42], motor: [0.8, 0.66], sentido: -1, frente: true },
  { inicio: [-0.24, -0.42], motor: [-0.8, -0.62], sentido: -1, frente: false },
  { inicio: [0.24, -0.42], motor: [0.8, -0.62], sentido: 1, frente: false },
];

// Para o enquadramento: envergadura com as hélices, e altura com folga para o voo.
export const LARGURA_NO_ENQUADRAMENTO = 2.7;
export const ALTURA_NO_ENQUADRAMENTO = 1.4;
