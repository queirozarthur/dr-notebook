import type { NextConfig } from "next";

// Site institucional sem servidor: "output: export" gera HTML estático em out/,
// publicável em qualquer hospedagem (GitHub Pages incluído).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
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
