// Gera a geometria da logo da Dr. Notebook: o redesenho em SVG da logo da loja
// (referencias/logo-perfil.jpg). As letras saem da Plus Jakarta Sans ExtraBold
// convertidas em curvas, para a logo não depender de fonte instalada.
//
// Rode com: node scripts/gerar-logo.mjs
// Saída: src/components/marca/logo-geometria.ts

import { writeFile } from "node:fs/promises";
import opentype from "opentype.js";

const FONTE_URL =
  "https://cdn.jsdelivr.net/npm/@fontsource/plus-jakarta-sans@5.3.0/files/plus-jakarta-sans-latin-800-normal.woff";
const SAIDA = new URL("../src/components/marca/logo-geometria.ts", import.meta.url);

// Todas as medidas estão na escala de um "Noteb" com corpo 100, linha de base em y = 0.
const CORPO = 100;
const CORPO_DR = 46;
const TRACO = 6;
const CASAS = 1;

const resposta = await fetch(FONTE_URL);
const fonte = opentype.parse(await resposta.arrayBuffer());
const ALTURA_MAIUSCULA = (fonte.tables.os2.sCapHeight * CORPO) / fonte.unitsPerEm;

// O opentype.js 2.0 quebra no GSUB desta fonte, então o texto é montado glifo a
// glifo, com kerning, sem passar pelas substituições tipográficas.
const escrever = ({ texto, x, y, corpo }) => {
  const escala = corpo / fonte.unitsPerEm;
  const caminho = new opentype.Path();
  let cursor = x;
  let anterior;
  for (const caractere of texto) {
    const glifo = fonte.charToGlyph(caractere);
    if (anterior) cursor += fonte.getKerningValue(anterior, glifo) * escala;
    caminho.extend(glifo.getPath(cursor, y, corpo));
    cursor += glifo.advanceWidth * escala;
    anterior = glifo;
  }
  return caminho;
};

// Escreve o texto com a borda esquerda do desenho (não a do avanço) em `esquerda`.
const escreverAPartirDe = ({ texto, esquerda, y, corpo }) => {
  const rascunho = escrever({ texto, x: 0, y, corpo });
  return escrever({ texto, x: esquerda - rascunho.getBoundingBox().x1, y, corpo });
};

const arredondar = (valor) => Number(valor.toFixed(CASAS));
const pontos = (lista) => lista.map(([x, y]) => `${arredondar(x)},${arredondar(y)}`).join(" L");

const retanguloArredondado = ({ x, y, largura, altura, raio }) => {
  const [d, b] = [x + largura, y + altura];
  return [
    `M${arredondar(x + raio)},${arredondar(y)}`,
    `H${arredondar(d - raio)}`,
    `A${raio},${raio} 0 0 1 ${arredondar(d)},${arredondar(y + raio)}`,
    `V${arredondar(b - raio)}`,
    `A${raio},${raio} 0 0 1 ${arredondar(d - raio)},${arredondar(b)}`,
    `H${arredondar(x + raio)}`,
    `A${raio},${raio} 0 0 1 ${arredondar(x)},${arredondar(b - raio)}`,
    `V${arredondar(y + raio)}`,
    `A${raio},${raio} 0 0 1 ${arredondar(x + raio)},${arredondar(y)}`,
    "Z",
  ].join(" ");
};

// "Dr." pequeno, acima e à esquerda do "N", com a base um pouco abaixo do topo do N.
const dr = escreverAPartirDe({ texto: "Dr.", esquerda: 0, y: -ALTURA_MAIUSCULA + 11, corpo: CORPO_DR });
const noteb = escreverAPartirDe({ texto: "Noteb", esquerda: dr.getBoundingBox().x2 + 4, y: 0, corpo: CORPO });

// O notebook ocupa o lugar do "oo": tela com borda inferior grossa, base em trapézio.
const notebook = { esquerda: noteb.getBoundingBox().x2 + 9, largura: 154 };
const base = {
  topo: -1,
  fundo: 13,
  esquerdaFundo: notebook.esquerda,
  direitaFundo: notebook.esquerda + notebook.largura,
  recuoTopo: 9,
};
const tela = { x: notebook.esquerda + 12, y: -92, largura: notebook.largura - 24, altura: 88, raio: 7 };
const moldura = { altura: 11 };

// Batimento: dois complexos QRS sobre uma linha reta, a 55% da altura útil da tela.
const linhaBatimento = tela.y + 0.55 * (tela.altura - moldura.altura);
const inicioBatimento = tela.x + 8;
const fimBatimento = tela.x + tela.largura - 8;
const larguraBatimento = fimBatimento - inicioBatimento;
const batida = (fracao) => {
  const x = inicioBatimento + fracao * larguraBatimento;
  return [
    [x, linhaBatimento],
    [x + 5, linhaBatimento - 26],
    [x + 11, linhaBatimento + 15],
    [x + 16, linhaBatimento],
  ];
};

// O "k" encosta no notebook; o tubo do estetoscópio sai de dentro dele e sobe até
// as hastes em U, com as olivas (pontas de ouvido) no alto.
const k = escreverAPartirDe({ texto: "k", esquerda: notebook.esquerda + notebook.largura + 6, y: 0, corpo: CORPO });
const kCaixa = k.getBoundingBox();
const haste = kCaixa.x2 + 12;
const abertura = 16;
const topoOlivas = -98;
const RAIO_OLIVA = 4.5;

const estetoscopio = [
  `M${arredondar(kCaixa.x1 + 25)},-28`,
  `H${arredondar(haste - 8)}`,
  `Q${arredondar(haste)},-28 ${arredondar(haste)},-36`,
  "V-62",
  `M${arredondar(haste - abertura)},${topoOlivas}`,
  "V-80",
  `Q${arredondar(haste - abertura)},-62 ${arredondar(haste)},-62`,
  `Q${arredondar(haste + abertura)},-62 ${arredondar(haste + abertura)},-80`,
  `V${topoOlivas}`,
].join(" ");

const geometria = {
  letras: {
    dr: dr.toPathData(CASAS),
    noteb: noteb.toPathData(CASAS),
    k: k.toPathData(CASAS),
  },
  tela: retanguloArredondado(tela),
  moldura: retanguloArredondado({
    x: tela.x - TRACO / 2,
    y: tela.y + tela.altura - moldura.altura,
    largura: tela.largura + TRACO,
    altura: moldura.altura + TRACO / 2,
    raio: 3,
  }),
  base: `M${pontos([
    [base.esquerdaFundo + base.recuoTopo, base.topo],
    [base.direitaFundo - base.recuoTopo, base.topo],
    [base.direitaFundo, base.fundo],
    [base.esquerdaFundo, base.fundo],
  ])} Z`,
  batimento: `M${pontos([
    [inicioBatimento, linhaBatimento],
    ...batida(0.22),
    ...batida(0.62),
    [fimBatimento, linhaBatimento],
  ])}`,
  estetoscopio,
  olivas: [
    { cx: arredondar(haste - abertura), cy: topoOlivas, r: RAIO_OLIVA },
    { cx: arredondar(haste + abertura), cy: topoOlivas, r: RAIO_OLIVA },
  ],
};

// Caixa do desenho inteiro, com meia espessura de traço de folga nas bordas.
const folga = TRACO / 2;
const caixa = {
  x: Math.min(dr.getBoundingBox().x1, 0) - 1,
  y: Math.min(dr.getBoundingBox().y1, tela.y, topoOlivas - RAIO_OLIVA) - folga,
  direita: haste + abertura + RAIO_OLIVA + folga,
  fundo: base.fundo + folga,
};
const largura = arredondar(caixa.direita - caixa.x);
const altura = arredondar(caixa.fundo - caixa.y);

const modulo = `// Gerado por scripts/gerar-logo.mjs. Não edite à mão: rode o script de novo.
// Redesenho em SVG da logo da loja (referencias/logo-perfil.jpg), letras em
// Plus Jakarta Sans ExtraBold convertidas em curvas.

export const logoGeometria = {
  viewBox: "${arredondar(caixa.x)} ${arredondar(caixa.y)} ${largura} ${altura}",
  largura: ${largura},
  altura: ${altura},
  traco: ${TRACO},
  degrade: { x1: ${arredondar(caixa.x)}, x2: ${arredondar(caixa.direita)} },
  letras: {
    dr: "${geometria.letras.dr}",
    noteb: "${geometria.letras.noteb}",
    k: "${geometria.letras.k}",
  },
  tela: "${geometria.tela}",
  moldura: "${geometria.moldura}",
  base: "${geometria.base}",
  batimento: "${geometria.batimento}",
  estetoscopio: "${geometria.estetoscopio}",
  olivas: [
${geometria.olivas.map(({ cx, cy, r }) => `    { cx: ${cx}, cy: ${cy}, r: ${r} },`).join("\n")}
  ],
} as const;
`;

await writeFile(SAIDA, modulo);
console.log(`logo-geometria.ts gerado: ${largura} × ${altura}`);
