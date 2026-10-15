import type { Metadata } from "next";
import type { FC } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Cabecalho } from "@/components/site/cabecalho";
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
    default: "Dr. Notebook Maceió",
    template: "%s | Dr. Notebook Maceió",
  },
  description:
    "Assistência técnica em Maceió desde 2005. Reparo em placa de notebooks, MacBooks, PCs gamer, PS5, drones e celulares. Orçamento grátis pelo WhatsApp.",
};

// A classe "js" entra no <html> antes da primeira pintura. As entradas animadas
// só nascem escondidas com ela; se o JS não rodar, tudo aparece normalmente.
const MARCAR_JS = "document.documentElement.classList.add('js')";

const RootLayout: FC<LayoutProps<"/">> = ({ children }) => {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={cn(jakarta.variable, "h-full antialiased")}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MARCAR_JS }} />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:font-semibold focus:text-primary-foreground"
        >
          Pular para o conteúdo
        </a>
        <Cabecalho />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
