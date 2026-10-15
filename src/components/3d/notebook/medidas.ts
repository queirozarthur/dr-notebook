import { MathUtils } from "three";

// Medidas do notebook, em unidades da cena (o notebook tem 3,2 de largura).
export const LARGURA = 3.2;
export const PROFUNDIDADE = 2.2;
export const ALTURA_BASE = 0.12;
export const ESPESSURA_TAMPA = 0.06;
export const ANGULO_TAMPA_ABERTA = MathUtils.degToRad(108);

// O modelo é deslocado para baixo para girar e escalar em torno do próprio meio
// (com a tampa aberta), e não da base.
export const CENTRO_VERTICAL = 0.95;
// Para o enquadramento: largura que o notebook ocupa girado (pose de repouso) e
// altura dele aberto, com folga.
export const LARGURA_NO_ENQUADRAMENTO = 3.9;
export const ALTURA_NO_ENQUADRAMENTO = 2.6;

// A superfície do teclado fica um fio acima da base, para não brigar com ela no
// teste de profundidade; a dobradiça fica acima das teclas, para a tampa fechar
// sem atravessá-las.
export const Y_SUPERFICIE = ALTURA_BASE + 0.002;
export const Y_DOBRADICA = ALTURA_BASE + 0.022;
export const RECUO_DOBRADICA = 0.04;

export const TECLADO = {
  colunas: 14,
  linhas: 5,
  passo: 0.19,
  tamanhoTecla: 0.16,
  alturaTecla: 0.014,
  centroZ: -0.33,
  // A barra de espaço ocupa da coluna 4 à 9 da última linha.
  espaco: { de: 4, ate: 9 },
} as const;

export const TRACKPAD = { largura: 1.15, profundidade: 0.66, centroZ: 0.62, raio: 0.06 } as const;

export const TELA = {
  largura: 2.96,
  altura: 1.92,
  // Distância do centro da tela à dobradiça, ao longo da tampa: a borda de baixo
  // (perto da dobradiça) é mais grossa que a de cima, como nos notebooks.
  centroZ: 1.15,
} as const;

export const MOLDURA = { largura: 3.12, altura: 2.12, raio: 0.05 } as const;

type PosicaoTecla = { x: number; z: number; largura: number };

const montarTeclas = (): PosicaoTecla[] => {
  const { colunas, linhas, passo, tamanhoTecla, centroZ, espaco } = TECLADO;
  const inicioX = -((colunas - 1) * passo) / 2;
  const inicioZ = centroZ - ((linhas - 1) * passo) / 2;
  const larguraEspaco = (espaco.ate - espaco.de) * passo + tamanhoTecla;
  const teclas: PosicaoTecla[] = [];

  for (let linha = 0; linha < linhas; linha++) {
    const ultimaLinha = linha === linhas - 1;
    for (let coluna = 0; coluna < colunas; coluna++) {
      const cobertaPeloEspaco = ultimaLinha && coluna > espaco.de && coluna <= espaco.ate;
      if (cobertaPeloEspaco) continue;

      const ehEspaco = ultimaLinha && coluna === espaco.de;
      const largura = ehEspaco ? larguraEspaco : tamanhoTecla;
      const x = inicioX + coluna * passo + (largura - tamanhoTecla) / 2;
      teclas.push({ x, z: inicioZ + linha * passo, largura });
    }
  }

  return teclas;
};

export const POSICOES_TECLAS = montarTeclas();
