import { Color, ShaderMaterial } from "three";

// A tela do notebook é um monitor cardíaco: dois batimentos (P, QRS, T) sobre o
// fundo azul-marinho, com a varredura de monitor de hospital. Uma cabeça de luz
// percorre a tela desenhando o traço, que vai apagando atrás dela.

const VERTICES = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENTOS = /* glsl */ `
  uniform float uTempo;
  uniform float uLigada;
  uniform float uAspecto;
  uniform vec3 uFundo;
  uniform vec3 uFundoCentro;
  uniform vec3 uLinha;
  varying vec2 vUv;

  const float BATIDAS = 2.0;
  const float LINHA_DE_BASE = 0.42;
  const float ESPESSURA = 0.006;
  const float VELOCIDADE = 0.22;

  float onda(float x, float centro, float largura, float altura) {
    float d = (x - centro) / largura;
    return altura * exp(-d * d);
  }

  // Um batimento, com x de 0 a 1: ondas P, Q, R, S e T.
  float batimento(float x) {
    return onda(x, 0.20, 0.030, 0.06)
      + onda(x, 0.36, 0.010, -0.07)
      + onda(x, 0.40, 0.012, 0.42)
      + onda(x, 0.44, 0.012, -0.14)
      + onda(x, 0.66, 0.050, 0.10);
  }

  float alturaDoTraco(float u) {
    return LINHA_DE_BASE + batimento(fract(u * BATIDAS));
  }

  void main() {
    vec2 uv = vUv;
    vec2 proporcional = (uv - 0.5) * vec2(uAspecto, 1.0);
    float raio = length(proporcional) / uAspecto;
    vec3 cor = mix(uFundoCentro, uFundo, smoothstep(0.0, 0.7, raio));

    // Grade fina de monitor.
    vec2 escalaGrade = uv * vec2(20.0, 13.0);
    vec2 frac = fract(escalaGrade);
    vec2 largura = fwidth(escalaGrade) * 1.2;
    vec2 entre = smoothstep(vec2(0.0), largura, frac) * smoothstep(vec2(0.0), largura, 1.0 - frac);
    cor += uLinha * (1.0 - min(entre.x, entre.y)) * 0.06;

    // Distância perpendicular ao traço, para a espessura ser igual nas subidas.
    float y = alturaDoTraco(uv.x);
    float passo = 0.0015;
    float inclinacao = (alturaDoTraco(uv.x + passo) - alturaDoTraco(uv.x - passo)) / (2.0 * passo) / uAspecto;
    float distancia = abs(uv.y - y) / sqrt(1.0 + inclinacao * inclinacao);
    float suavizacao = fwidth(uv.y) * 1.2;
    float traco = 1.0 - smoothstep(ESPESSURA - suavizacao, ESPESSURA + suavizacao, distancia);
    float halo = exp(-distancia * 45.0) * 0.55;

    // Varredura: atrás da cabeça o traço apaga; logo à frente dela, a tela limpa.
    float cabeca = fract(uTempo * VELOCIDADE);
    float atras = fract(cabeca - uv.x);
    float rastro = 1.0 - smoothstep(0.0, 0.9, atras);
    vec2 pontoCabeca = (uv - vec2(cabeca, alturaDoTraco(cabeca))) * vec2(uAspecto, 1.0);
    float brilhoCabeca = exp(-length(pontoCabeca) * 40.0);

    cor += uLinha * (traco * 1.4 + halo) * rastro;
    cor += vec3(0.85, 0.93, 1.0) * brilhoCabeca * 1.2;

    gl_FragColor = vec4(cor * uLigada, 1.0);
    #include <colorspace_fragment>
  }
`;

export const criarMaterialTela = (aspecto: number) => {
  // Os uniformes ficam numa referência tipada: o useFrame atualiza estes objetos,
  // que são os mesmos que o material usa.
  const uniformes = {
    uTempo: { value: 0 },
    uLigada: { value: 0 },
    uAspecto: { value: aspecto },
    uFundo: { value: new Color("#040d24") },
    uFundoCentro: { value: new Color("#0c2250") },
    uLinha: { value: new Color("#4d94ff") },
  };

  const material = new ShaderMaterial({
    uniforms: uniformes,
    vertexShader: VERTICES,
    fragmentShader: FRAGMENTOS,
    toneMapped: false,
  });

  return { material, uniformes };
};
