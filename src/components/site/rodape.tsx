import Link from "next/link";
import type { FC, ReactNode } from "react";
import { Logo } from "@/components/marca/logo";
import { loja } from "@/lib/loja";
import { linksPrincipais } from "@/lib/navegacao";

// O ano é o do build: o site é estático e é gerado de novo a cada publicação.
const ANO = new Date().getFullYear();

export const Rodape: FC = () => {
  const { endereco, horario, whatsapp, email, instagram } = loja;

  return (
    <footer className="palco border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <Link
            href="/"
            aria-label="Dr. Notebook Maceió, página inicial"
            className="-m-2 inline-flex rounded-lg p-2 outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Logo className="h-9" />
          </Link>
          <p className="mt-4 max-w-sm text-muted-foreground">
            Assistência técnica de informática em {loja.cidade} desde {loja.desde}. Reparo em placa de notebooks,
            MacBooks, PCs gamer, PS5, drones e celulares.
          </p>
        </div>

        <BlocoRodape titulo="Navegação">
          <nav aria-label="Rodapé">
            <ul className="flex flex-col gap-2">
              {linksPrincipais.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground">
                    {link.rotulo}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </BlocoRodape>

        <BlocoRodape titulo="Contato">
          <address className="flex flex-col gap-2 text-muted-foreground not-italic">
            <a href={whatsapp.link} target="_blank" rel="noopener" className="hover:text-foreground">
              WhatsApp {whatsapp.exibicao}
            </a>
            <a href={`mailto:${email}`} className="hover:text-foreground">
              {email}
            </a>
            <a href={instagram.link} target="_blank" rel="noopener" className="hover:text-foreground">
              Instagram {instagram.usuario}
            </a>
            <span>
              {endereco.local}, {endereco.rua}, {endereco.bairro}, {endereco.cidadeUf}
            </span>
          </address>
        </BlocoRodape>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-muted-foreground md:flex-row md:justify-between">
          <p>
            © {ANO} {loja.nome} {loja.cidade}.
          </p>
          <p>{horario.map(({ dias, horas }) => `${dias}: ${horas}`).join(" · ")}</p>
        </div>
      </div>
    </footer>
  );
};

type BlocoRodapeProps = {
  titulo: string;
  children: ReactNode;
};

const BlocoRodape: FC<BlocoRodapeProps> = ({ titulo, children }) => {
  return (
    <div>
      <p className="mb-4 text-sm font-semibold tracking-widest uppercase">{titulo}</p>
      {children}
    </div>
  );
};
