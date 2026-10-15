import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

// Sans geométrica pesada, como nas artes da loja. O next/font hospeda o arquivo
// junto do site: o visitante não faz nenhuma requisição ao Google.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dr. Notebook Maceió | Assistência técnica de informática",
    template: "%s | Dr. Notebook Maceió",
  },
  description:
    "Assistência técnica em Maceió desde 2005. Reparo em placa de notebooks, MacBooks, PCs gamer, PS5, drones e celulares. Orçamento grátis pelo WhatsApp.",
};

const RootLayout = ({ children }: LayoutProps<"/">) => (
  <html lang="pt-BR" className={cn(jakarta.variable, "h-full antialiased")}>
    <body className="flex min-h-full flex-col">{children}</body>
  </html>
);

export default RootLayout;
