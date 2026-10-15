import type { NextConfig } from "next";

// Site institucional sem servidor: "output: export" gera HTML estático em out/,
// publicável em qualquer hospedagem (GitHub Pages incluído).
//
// No GitHub Pages de projeto o site mora num subcaminho (/dr-notebook); o workflow
// passa BASE_PATH no build. Localmente, e num domínio próprio, fica na raiz.
const caminhoBase = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: caminhoBase,
  trailingSlash: true,
  images: { unoptimized: true },
  // Para os poucos caminhos que o Next não prefixa sozinho (src de imagem, ícones).
  env: { NEXT_PUBLIC_BASE_PATH: caminhoBase },
  // O next dev criaria um AGENTS.md; as instruções do projeto ficam no CLAUDE.md.
  agentRules: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
