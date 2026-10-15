import type { MetadataRoute } from "next";
import { INDEXAR, urlAbsoluta } from "@/lib/site";

export const dynamic = "force-static";

// Na demonstração (INDEXAR=nao) os buscadores não devem indexar nada.
const robots = (): MetadataRoute.Robots => {
  return {
    rules: INDEXAR ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: urlAbsoluta("/sitemap.xml"),
  };
};

export default robots;
