import type { FC } from "react";
import type { DadosEstruturados } from "@/lib/seo";

type JsonLdProps = {
  dados: DadosEstruturados;
};

// O "<" vira < para nenhum texto dos dados conseguir fechar o <script>.
export const JsonLd: FC<JsonLdProps> = ({ dados }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados).replace(/</g, "\\u003c") }}
    />
  );
};
