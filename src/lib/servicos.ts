// Serviços da loja, agrupados como em docs/briefing.md ("Lista do perfil no
// Google, agrupada para o site"). Os textos só usam o que está no briefing.

type NaoVazio<T> = readonly [T, ...T[]];

export type Servico = {
  slug: string;
  titulo: string;
  resumo: string;
  // Completa "Olá! Vim pelo site e quero um orçamento de ...".
  assunto: string;
  icone: "placa" | "notebook" | "mac" | "gamer" | "videogame" | "drone" | "celular" | "software";
  destaque?: true;
  // Página própria do serviço (/servicos/<slug>/): o título leva "Maceió" para as
  // buscas locais ("conserto drone maceió", "conserto ps5 maceió").
  pagina: {
    titulo: string;
    // Vai no <title>, antes de "| Dr. Notebook Maceió".
    tituloMeta: string;
    descricao: string;
  };
  itens: NaoVazio<string>;
  marcas?: NaoVazio<string>;
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
    pagina: {
      titulo: "Reparo em placa em Maceió",
      tituloMeta: "Reparo em placa",
      descricao:
        "Reparo em placa em Maceió: placa-mãe, placa de vídeo, reballing, regravação de BIOS e recuperação de dados. Orçamento grátis pelo WhatsApp.",
    },
    itens: ["Placa-mãe", "Placa de vídeo", "Reballing", "Regravação de BIOS", "Recuperação de dados"],
  },
  {
    slug: "conserto-de-notebook",
    titulo: "Notebooks",
    resumo:
      "Tela, teclado, bateria, conector de energia, dobradiça e carcaça, limpeza interna com pasta térmica e formatação.",
    assunto: "conserto de notebook",
    icone: "notebook",
    pagina: {
      titulo: "Conserto de notebook em Maceió",
      tituloMeta: "Conserto de notebook",
      descricao:
        "Conserto de notebook em Maceió: tela, teclado, bateria, conector de energia, dobradiça, limpeza interna e formatação. Orçamento grátis.",
    },
    itens: [
      "Troca de tela",
      "Teclado",
      "Bateria",
      "Conector de energia",
      "Dobradiça e carcaça",
      "Limpeza interna e pasta térmica",
      "Formatação",
    ],
    marcas: ["Dell", "Acer", "HP", "Lenovo", "Asus", "Samsung", "Positivo", "LG"],
  },
  {
    slug: "macbook-e-imac",
    titulo: "MacBook e iMac",
    resumo: "Reparo avançado de placa e troca de tela. Seu Mac parou? A gente resolve.",
    assunto: "conserto de MacBook ou iMac",
    icone: "mac",
    pagina: {
      titulo: "Conserto de MacBook e iMac em Maceió",
      tituloMeta: "Conserto de MacBook e iMac",
      descricao:
        "Conserto de MacBook e iMac em Maceió: reparo avançado de placa e troca de tela. Diagnóstico antes do serviço e orçamento grátis pelo WhatsApp.",
    },
    itens: ["Reparo avançado de placa", "Troca de tela"],
    marcas: ["MacBook", "iMac"],
  },
  {
    slug: "pc-gamer",
    titulo: "PC Gamer",
    resumo: "Montagem sob medida, reparo, otimização e upgrade.",
    assunto: "PC gamer",
    icone: "gamer",
    pagina: {
      titulo: "PC gamer em Maceió",
      tituloMeta: "PC gamer: montagem, reparo e upgrade",
      descricao:
        "PC gamer em Maceió: montagem sob medida, reparo, otimização e upgrade. Assistência técnica desde 2005, na Jatiúca. Orçamento grátis.",
    },
    itens: ["Montagem sob medida", "Reparo", "Otimização", "Upgrade e kits de upgrade"],
  },
  {
    slug: "conserto-de-videogame",
    titulo: "Videogames",
    resumo: "Reparo de placa de PS5 e de consoles retrô, como o Super Nintendo.",
    assunto: "conserto de videogame",
    icone: "videogame",
    pagina: {
      titulo: "Conserto de PS5 e videogames em Maceió",
      tituloMeta: "Conserto de PS5 e videogames",
      descricao:
        "Conserto de PS5 e videogames em Maceió: reparo de placa de PS5 e de consoles retrô, como o Super Nintendo. Orçamento grátis pelo WhatsApp.",
    },
    itens: ["Reparo de placa de PS5", "Consoles retrô, como o Super Nintendo"],
    marcas: ["PlayStation 5", "Super Nintendo"],
  },
  {
    slug: "conserto-de-drone",
    titulo: "Drones",
    resumo: "DJI e outras marcas, com laboratório próprio para diagnóstico e reparo.",
    assunto: "conserto de drone",
    icone: "drone",
    pagina: {
      titulo: "Conserto de drone em Maceió",
      tituloMeta: "Conserto de drone",
      descricao:
        "Conserto de drone em Maceió: DJI e outras marcas, com laboratório próprio para diagnóstico e reparo. Orçamento grátis pelo WhatsApp.",
    },
    itens: ["Diagnóstico em laboratório próprio", "Reparo de drones DJI e de outras marcas"],
    marcas: ["DJI"],
  },
  {
    slug: "conserto-de-celular",
    titulo: "Celulares",
    resumo:
      "Tela, bateria, entrada do carregador, câmera, microfone e alto-falante, botões e danos por água.",
    assunto: "conserto de celular",
    icone: "celular",
    pagina: {
      titulo: "Conserto de celular em Maceió",
      tituloMeta: "Conserto de celular",
      descricao:
        "Conserto de celular em Maceió: tela, bateria, entrada do carregador, câmera, microfone, alto-falante, botões e danos por água. Orçamento grátis.",
    },
    itens: [
      "Tela",
      "Bateria",
      "Entrada do carregador",
      "Câmera",
      "Microfone e alto-falante",
      "Botões",
      "Danos por água",
    ],
    marcas: ["iPhone", "Samsung", "Motorola", "Xiaomi", "LG"],
  },
  {
    slug: "software-e-ti",
    titulo: "Software e TI",
    resumo: "Remoção de vírus, formatação, problemas de software e consultoria de TI.",
    assunto: "software ou formatação",
    icone: "software",
    pagina: {
      titulo: "Formatação, vírus e TI em Maceió",
      tituloMeta: "Formatação, remoção de vírus e TI",
      descricao:
        "Formatação, remoção de vírus, problemas de software e consultoria de TI em Maceió. Assistência técnica desde 2005, na Jatiúca.",
    },
    itens: ["Remoção de vírus", "Formatação de desktop", "Problemas de software", "Consultoria de TI"],
  },
] as const satisfies readonly Servico[];

export type SlugServico = (typeof servicos)[number]["slug"];

export const caminhoDoServico = (slug: SlugServico) => {
  return `/servicos/${slug}/` as const;
};

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
