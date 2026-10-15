// Onde o site está publicado. Tudo vem do build (ver .env.example):
// - SITE_URL: endereço público da raiz do site, com o subcaminho se houver
//   (no GitHub Pages: https://queirozarthur.github.io/dr-notebook). Sem ela, vale
//   o servidor local.
// - NEXT_PUBLIC_BASE_PATH: o subcaminho (/dr-notebook), repassado pelo
//   next.config.ts a partir de BASE_PATH.
// - INDEXAR: "nao" pede aos buscadores para não indexar (a demonstração).
const PADRAO = "http://localhost:3000";

export const CAMINHO_BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const raizDoSite = (process.env.SITE_URL ?? PADRAO).replace(/\/+$/, "");

// Com barra no fim: o Next junta os caminhos dos metadados ao caminho desta URL.
export const URL_DO_SITE = new URL(`${raizDoSite}/`);

export const INDEXAR = process.env.INDEXAR !== "nao";

// Caminho do site ("/servicos/drone/") para URL absoluta, mantendo o subcaminho.
export const urlAbsoluta = (caminho: `/${string}`) => {
  return `${raizDoSite}${caminho}`;
};

// Para o que o Next não prefixa sozinho com o basePath (src de <Image> com
// caminho em texto, ícones declarados nos metadados).
export const comCaminhoBase = (caminho: `/${string}`) => {
  return `${CAMINHO_BASE}${caminho}`;
};
