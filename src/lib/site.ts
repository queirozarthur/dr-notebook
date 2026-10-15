// Endereço público do site, usado nas URLs absolutas (Open Graph, sitemap, dados
// estruturados). Vem de SITE_URL no build de produção; o domínio ainda não foi
// decidido (ver "A decidir" no CLAUDE.md), então sem ela vale o servidor local.
const PADRAO = "http://localhost:3000";

export const URL_DO_SITE = new URL(process.env.SITE_URL ?? PADRAO);

export const urlAbsoluta = (caminho: string) => {
  return new URL(caminho, URL_DO_SITE).href;
};
