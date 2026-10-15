import type { MetadataRoute } from "next";
import { caminhoDoServico, servicos } from "@/lib/servicos";
import { urlAbsoluta } from "@/lib/site";

export const dynamic = "force-static";

const sitemap = (): MetadataRoute.Sitemap => {
  return [
    { url: urlAbsoluta("/"), changeFrequency: "monthly", priority: 1 },
    ...servicos.map((servico) => ({
      url: urlAbsoluta(caminhoDoServico(servico.slug)),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
};

export default sitemap;
