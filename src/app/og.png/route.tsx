import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { LogoEstatica } from "@/components/marca/logo-estatica";
import { loja } from "@/lib/loja";
import { IMAGEM_DE_COMPARTILHAMENTO } from "@/lib/seo";

// Imagem que aparece ao compartilhar o link (WhatsApp, Instagram, Facebook).
// - PNG, porque as redes não leem SVG (lição do John Radio Web).
// - Rota "og.png" em vez do opengraph-image do Next: no export estático, aquele
//   vira um arquivo sem extensão, que hospedagens como o GitHub Pages servem como
//   binário genérico. Aqui o arquivo sai como og.png.
// - Gerada no build, sem internet: a fonte da marca está em src/assets/fontes.
// - Estilos em `style` porque o gerador (Satori) não lê classes do Tailwind.
export const dynamic = "force-static";

const PASTA_DAS_FONTES = join(process.cwd(), "src/assets/fontes");
const MARINHO = "#061430";
const AZUL_CLARO = "#4d94ff";
const TEXTO = "#f5f7fb";
const TEXTO_SUAVE = "#9fb0cf";

const lerFonte = (peso: 500 | 800) => {
  return readFile(join(PASTA_DAS_FONTES, `plus-jakarta-sans-latin-${peso}-normal.woff`));
};

export const GET = async () => {
  const [media, extraNegrito] = await Promise.all([lerFonte(500), lerFonte(800)]);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: 80,
          backgroundColor: MARINHO,
          backgroundImage: "radial-gradient(circle at 85% 115%, rgba(26, 107, 240, 0.6), transparent 60%)",
          color: TEXTO,
          fontFamily: "Jakarta",
        }}
      >
        <LogoEstatica largura={520} />
        <div style={{ display: "flex", flexDirection: "column", marginTop: 56, fontSize: 68, fontWeight: 800 }}>
          <span style={{ letterSpacing: -2 }}>Não resolve no martelo.</span>
          <span style={{ letterSpacing: -2 }}>Resolve na técnica.</span>
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 32, fontWeight: 500, color: TEXTO_SUAVE }}>
          Assistência técnica em {loja.cidade} desde {loja.desde}
        </div>
        <div style={{ display: "flex", marginTop: 20, fontSize: 28, fontWeight: 500, color: AZUL_CLARO }}>
          Orçamento grátis pelo WhatsApp · {loja.endereco.local}, {loja.endereco.bairro}
        </div>
      </div>
    ),
    {
      width: IMAGEM_DE_COMPARTILHAMENTO.width,
      height: IMAGEM_DE_COMPARTILHAMENTO.height,
      fonts: [
        { name: "Jakarta", data: media, weight: 500, style: "normal" },
        { name: "Jakarta", data: extraNegrito, weight: 800, style: "normal" },
      ],
    },
  );
};
