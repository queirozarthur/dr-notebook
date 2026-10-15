// Serviços da loja, agrupados como em docs/briefing.md ("Lista do perfil no
// Google, agrupada para o site"). Os textos só usam o que está no briefing.

export type Servico = {
  slug: string;
  titulo: string;
  resumo: string;
  // Completa "Olá! Vim pelo site e quero um orçamento de ...".
  assunto: string;
  icone: "placa" | "notebook" | "mac" | "gamer" | "videogame" | "drone" | "celular" | "software";
  destaque?: true;
};

export const servicos = [
  {
    slug: "reparo-em-placa",
    titulo: "Reparo em placa",
    resumo:
      "Placa-mãe, placa de vídeo, reballing, regravação de BIOS e recuperação de dados. É o diferencial técnico da loja.",
    assunto: "reparo em placa",
    icone: "placa",
    destaque: true,
  },
  {
    slug: "conserto-de-notebook",
    titulo: "Notebooks",
    resumo:
      "Tela, teclado, bateria, conector de energia, dobradiça e carcaça, limpeza interna com pasta térmica e formatação.",
    assunto: "conserto de notebook",
    icone: "notebook",
  },
  {
    slug: "macbook-e-imac",
    titulo: "MacBook e iMac",
    resumo: "Reparo avançado de placa e troca de tela. Seu Mac parou? A gente resolve.",
    assunto: "conserto de MacBook ou iMac",
    icone: "mac",
  },
  {
    slug: "pc-gamer",
    titulo: "PC Gamer",
    resumo: "Montagem sob medida, reparo, otimização e upgrade.",
    assunto: "PC gamer",
    icone: "gamer",
  },
  {
    slug: "conserto-de-videogame",
    titulo: "Videogames",
    resumo: "Reparo de placa de PS5 e de consoles retrô, como o Super Nintendo.",
    assunto: "conserto de videogame",
    icone: "videogame",
  },
  {
    slug: "conserto-de-drone",
    titulo: "Drones",
    resumo: "DJI e outras marcas, com laboratório próprio para diagnóstico e reparo.",
    assunto: "conserto de drone",
    icone: "drone",
  },
  {
    slug: "conserto-de-celular",
    titulo: "Celulares",
    resumo:
      "Tela, bateria, entrada do carregador, câmera, microfone e alto-falante, botões e danos por água.",
    assunto: "conserto de celular",
    icone: "celular",
  },
  {
    slug: "software-e-ti",
    titulo: "Software e TI",
    resumo: "Remoção de vírus, formatação, problemas de software e consultoria de TI.",
    assunto: "software ou formatação",
    icone: "software",
  },
] as const satisfies readonly Servico[];

// Sintomas que a loja usa nas artes (briefing, "que problema resolvemos").
export const sintomas = [
  "Não liga.",
  "Travou do nada.",
  "Superaquecendo.",
  "Desligando sozinho.",
  "Tela preta.",
  "Não carrega.",
  "Lento.",
  "Sem dar vídeo.",
  "Fonte queimou.",
] as const;

// Marcas citadas no briefing (notebooks, celulares, Mac, drones, consoles).
export const marcas = [
  "Dell",
  "Acer",
  "HP",
  "Lenovo",
  "Asus",
  "Samsung",
  "Positivo",
  "LG",
  "MacBook",
  "iMac",
  "iPhone",
  "Motorola",
  "Xiaomi",
  "DJI",
  "PlayStation 5",
  "Super Nintendo",
] as const;

export const mensagemDoServico = (assunto: string) => {
  return `Olá! Vim pelo site e quero um orçamento de ${assunto}.`;
};
