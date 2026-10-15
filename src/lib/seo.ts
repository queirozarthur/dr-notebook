import { loja } from "./loja";
import { caminhoDoServico, type Servico, type SlugServico } from "./servicos";
import { URL_DO_SITE, urlAbsoluta } from "./site";

// Dados estruturados (schema.org, em JSON-LD) para o Google entender a loja, cada
// serviço e onde cada página fica no site. Só com o que está no briefing.

export type DadosEstruturados = {
  "@context": "https://schema.org";
  "@type": string;
  [propriedade: string]: unknown;
};

// Gerada por src/app/og.png/route.tsx. As páginas que mudam o openGraph precisam
// repetir a imagem: no Next, o openGraph de uma página substitui o do layout.
export const IMAGEM_DE_COMPARTILHAMENTO = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Dr. Notebook Maceió: assistência técnica de informática desde 2005",
} as const;

const ID_DA_LOJA = urlAbsoluta("/#loja");
const TELEFONE = "+55 82 99129-8384";

const endereco = {
  "@type": "PostalAddress",
  streetAddress: `${loja.endereco.rua}, ${loja.endereco.local}`,
  addressLocality: loja.cidade,
  addressRegion: "AL",
  postalCode: loja.endereco.cep,
  addressCountry: "BR",
} as const;

const horarioDeFuncionamento = loja.horario.flatMap((faixa) => {
  if (!("abertura" in faixa)) return [];
  return [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: faixa.abertura.dias,
      opens: faixa.abertura.abre,
      closes: faixa.abertura.fecha,
    },
  ];
});

export const dadosDaLoja = (): DadosEstruturados => {
  return {
    "@context": "https://schema.org",
    "@type": "ComputerStore",
    "@id": ID_DA_LOJA,
    name: loja.nome,
    alternateName: `${loja.nome} ${loja.cidade}`,
    description:
      "Assistência técnica de informática em Maceió desde 2005: reparo em placa de notebooks, MacBooks, PCs gamer, PS5, drones e celulares.",
    url: URL_DO_SITE.href,
    telephone: TELEFONE,
    email: loja.email,
    foundingDate: String(loja.desde),
    image: urlAbsoluta("/imagens/loja.jpg"),
    address: endereco,
    geo: { "@type": "GeoCoordinates", ...loja.coordenadas },
    openingHoursSpecification: horarioDeFuncionamento,
    areaServed: { "@type": "City", name: loja.cidade },
    sameAs: [loja.instagram.link],
  };
};

export const dadosDoServico = (servico: Servico & { slug: SlugServico }): DadosEstruturados => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: servico.pagina.titulo,
    serviceType: servico.titulo,
    description: servico.pagina.descricao,
    url: urlAbsoluta(caminhoDoServico(servico.slug)),
    areaServed: { "@type": "City", name: loja.cidade },
    provider: {
      "@type": "ComputerStore",
      "@id": ID_DA_LOJA,
      name: loja.nome,
      telephone: TELEFONE,
      address: endereco,
    },
  };
};

export const trilhaDoServico = (servico: Servico & { slug: SlugServico }): DadosEstruturados => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: urlAbsoluta("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: servico.pagina.titulo,
        item: urlAbsoluta(caminhoDoServico(servico.slug)),
      },
    ],
  };
};
