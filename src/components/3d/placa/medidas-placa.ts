// Vista explodida do notebook: bandeja (fundo), bateria e placa-mãe por dentro,
// e o bloco de cima (teclado com a tampa fechada). Unidades da cena; o notebook
// tem 3,2 de largura, como no hero.

export const LARGURA = 3.2;
export const PROFUNDIDADE = 2.2;

export const BANDEJA = { altura: 0.05 } as const;
export const BLOCO_SUPERIOR = { altura: 0.11, base: 0.16 } as const;
export const BATERIA = { largura: 2.5, altura: 0.05, profundidade: 0.7, z: 0.6 } as const;

export const PLACA = { largura: 2.9, espessura: 0.03, profundidade: 1.05, z: -0.45 } as const;
// Coordenadas dos componentes, a partir do centro da placa.
export const TOPO_DA_PLACA = PLACA.espessura / 2;

export const CHIP_VIDEO = { lado: 0.46, altura: 0.035, x: -0.35, z: 0.02 } as const;
export const BOLINHAS = { porLado: 9, passo: 0.045, raio: 0.014 } as const;
export const CHIP_PROCESSADOR = { lado: 0.38, altura: 0.03, x: 0.42, z: 0.04 } as const;
// O "die" é o quadrado de silício no topo do chip.
export const DIE = { proporcao: 0.52, altura: 0.012 } as const;
export const MEMORIAS = {
  largura: 0.16,
  profundidade: 0.22,
  altura: 0.02,
  posicoes: [
    [-1.18, -0.16],
    [-0.94, -0.16],
    [-1.18, 0.16],
    [-0.94, 0.16],
  ],
} as const;
export const INDUTORES = { lado: 0.075, altura: 0.06, z: -0.33, de: 0.15, passo: 0.11, quantidade: 6 } as const;
export const VENTOINHA = { raio: 0.28, altura: 0.05, x: 1.1, z: -0.05, pas: 9 } as const;

// Alturas (y do centro) com o notebook montado.
export const MONTADO = {
  bandeja: BANDEJA.altura / 2,
  bateria: BANDEJA.altura + BATERIA.altura / 2,
  placa: BANDEJA.altura + PLACA.espessura / 2,
  blocoSuperior: BLOCO_SUPERIOR.base + BLOCO_SUPERIOR.altura / 2,
  // O chip de vídeo fica apoiado nas esferas de solda.
  chipVideo: TOPO_DA_PLACA + BOLINHAS.raio * 2 + CHIP_VIDEO.altura / 2,
} as const;

// Quanto cada parte se afasta quando a vista explode.
export const EXPLOSAO = {
  blocoSuperior: { y: 0.95, z: -0.35, inclinacao: -0.22 },
  bateria: { y: -0.12, z: 0.42 },
  bandeja: { y: -0.5 },
  // No destaque final, o chip sobe e mostra as esferas de solda (o reballing).
  chipVideo: { y: 0.2 },
} as const;

// Etapas da animação, de 0 a 1: abrir as camadas, depois destacar o chip.
export const ETAPAS = {
  abrir: { de: 0, ate: 0.55 },
  destacar: { de: 0.55, ate: 0.85 },
} as const;

// Para o enquadramento: o conjunto explodido, com folga.
export const CENTRO_VERTICAL = 0.35;
export const LARGURA_NO_ENQUADRAMENTO = 3.6;
export const ALTURA_NO_ENQUADRAMENTO = 2.4;
