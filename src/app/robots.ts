import type { MetadataRoute } from "next";
import { urlAbsoluta } from "@/lib/site";

export const dynamic = "force-static";

const robots = (): MetadataRoute.Robots => {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: urlAbsoluta("/sitemap.xml"),
  };
};

export default robots;
