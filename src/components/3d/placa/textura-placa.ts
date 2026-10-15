import { CanvasTexture, SRGBColorSpace } from "three";
import { PLACA } from "./medidas-placa";

// A face da placa-mãe desenhada em canvas: azul-marinho, trilhas e vias em
// azul-claro e a serigrafia da loja. A mesma textura serve de mapa de emissão,
// então as trilhas "acendem" no destaque.

const PIXELS_POR_UNIDADE = 400;
const TRILHAS = 90;
const TRECHOS_POR_TRILHA = 4;

// Sorteio com semente: a placa sai igual em todo carregamento.
const sorteador = (semente: number) => {
  let estado = semente;
  return () => {
    estado = (estado + 0x6d2b79f5) | 0;
    let valor = Math.imul(estado ^ (estado >>> 15), 1 | estado);
    valor = (valor + Math.imul(valor ^ (valor >>> 7), 61 | valor)) ^ valor;
    return ((valor ^ (valor >>> 14)) >>> 0) / 4294967296;
  };
};

// Trilhas em ângulos de 0°, 45° e 90°, como numa placa de verdade.
const DIRECOES = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
] as const;

const desenharTrilhas = (contexto: CanvasRenderingContext2D, largura: number, altura: number) => {
  const sortear = sorteador(2005);
  contexto.lineWidth = 3;
  contexto.lineCap = "round";
  contexto.lineJoin = "round";
  contexto.strokeStyle = "rgba(77, 148, 255, 0.5)";
  contexto.fillStyle = "rgba(156, 194, 255, 0.9)";

  for (let trilha = 0; trilha < TRILHAS; trilha++) {
    let [x, y] = [sortear() * largura, sortear() * altura];
    contexto.beginPath();
    contexto.moveTo(x, y);
    for (let trecho = 0; trecho < TRECHOS_POR_TRILHA; trecho++) {
      const direcao = DIRECOES[Math.floor(sortear() * DIRECOES.length)];
      if (!direcao) continue;
      const comprimento = 30 + sortear() * 140;
      x += direcao[0] * comprimento;
      y += direcao[1] * comprimento;
      contexto.lineTo(x, y);
    }
    contexto.stroke();
    contexto.beginPath();
    contexto.arc(x, y, 6, 0, Math.PI * 2);
    contexto.fill();
  }
};

export const criarTexturaPlaca = () => {
  const largura = Math.round(PLACA.largura * PIXELS_POR_UNIDADE);
  const altura = Math.round(PLACA.profundidade * PIXELS_POR_UNIDADE);
  const tela = document.createElement("canvas");
  tela.width = largura;
  tela.height = altura;
  const contexto = tela.getContext("2d");

  if (contexto) {
    contexto.fillStyle = "#0a2350";
    contexto.fillRect(0, 0, largura, altura);
    desenharTrilhas(contexto, largura, altura);
    contexto.fillStyle = "rgba(255, 255, 255, 0.6)";
    contexto.font = "600 26px sans-serif";
    contexto.fillText("DR. NOTEBOOK · MACEIÓ", 40, altura - 36);
  }

  const textura = new CanvasTexture(tela);
  textura.colorSpace = SRGBColorSpace;
  textura.anisotropy = 4;
  return textura;
};
