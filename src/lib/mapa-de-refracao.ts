// Mapa de deslocamento do efeito "liquid glass": uma imagem em que o vermelho e o
// verde dizem, pixel a pixel, de onde buscar o fundo (128 = não desloca). O
// feDisplacementMap do SVG lê esse mapa e entorta o fundo perto das bordas, como
// a borda arredondada de um vidro grosso. No meio, nada se mexe.

type Medidas = {
  largura: number;
  altura: number;
  raio: number;
  // Largura da faixa da borda que refrata, em px.
  bisel: number;
};

const NEUTRO = 128;
const AMPLITUDE = 127;
const PASSO_DO_GRADIENTE = 0.5;

// Distância com sinal até a borda de um retângulo arredondado centrado na origem:
// negativa dentro, positiva fora.
const distanciaAteABorda = (x: number, y: number, metadeLargura: number, metadeAltura: number, raio: number) => {
  const qx = Math.abs(x) - (metadeLargura - raio);
  const qy = Math.abs(y) - (metadeAltura - raio);
  const fora = Math.hypot(Math.max(qx, 0), Math.max(qy, 0));
  const dentro = Math.min(Math.max(qx, qy), 0);
  return fora + dentro - raio;
};

export const desenharMapaDeRefracao = ({ largura, altura, raio, bisel }: Medidas) => {
  const tela = document.createElement("canvas");
  tela.width = largura;
  tela.height = altura;
  const contexto = tela.getContext("2d");
  if (!contexto) throw new Error("Sem contexto 2D para desenhar o mapa de refração.");

  const imagem = contexto.createImageData(largura, altura);
  const [metadeLargura, metadeAltura] = [largura / 2, altura / 2];
  const distancia = (x: number, y: number) => distanciaAteABorda(x, y, metadeLargura, metadeAltura, raio);

  for (let linha = 0; linha < altura; linha++) {
    for (let coluna = 0; coluna < largura; coluna++) {
      const [x, y] = [coluna + 0.5 - metadeLargura, linha + 0.5 - metadeAltura];
      const profundidade = -distancia(x, y);
      let [vermelho, verde] = [NEUTRO, NEUTRO];

      if (profundidade > 0 && profundidade < bisel) {
        // O gradiente da distância aponta para fora; o fundo é buscado para dentro,
        // com mais força quanto mais perto da borda.
        const gx = distancia(x + PASSO_DO_GRADIENTE, y) - distancia(x - PASSO_DO_GRADIENTE, y);
        const gy = distancia(x, y + PASSO_DO_GRADIENTE) - distancia(x, y - PASSO_DO_GRADIENTE);
        const comprimento = Math.hypot(gx, gy) || 1;
        const forca = (1 - profundidade / bisel) ** 2;
        vermelho = NEUTRO - (gx / comprimento) * forca * AMPLITUDE;
        verde = NEUTRO - (gy / comprimento) * forca * AMPLITUDE;
      }

      const indice = (linha * largura + coluna) * 4;
      imagem.data[indice] = vermelho;
      imagem.data[indice + 1] = verde;
      imagem.data[indice + 2] = NEUTRO;
      imagem.data[indice + 3] = 255;
    }
  }

  contexto.putImageData(imagem, 0, 0);
  return tela.toDataURL();
};
