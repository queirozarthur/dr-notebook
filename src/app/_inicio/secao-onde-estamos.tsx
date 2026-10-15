import Image from "next/image";
import type { FC, ReactNode } from "react";
import { MapPinned, Navigation } from "lucide-react";
import { CabecalhoSecao } from "@/components/site/cabecalho-secao";
import { Button } from "@/components/ui/button";
import { loja } from "@/lib/loja";

// Sem mapa embutido: um iframe do Google Maps carregaria cookies e scripts do
// Google para todo visitante. Os botões abrem o Maps só para quem pedir.
export const SecaoOndeEstamos: FC = () => {
  const { endereco, horario, whatsapp, email, instagram, mapas } = loja;

  return (
    <section id="onde-estamos" aria-labelledby="onde-titulo" className="scroll-mt-24 bg-muted py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-5 lg:items-center">
        <div className="lg:col-span-3">
          <CabecalhoSecao
            id="onde-titulo"
            sobretitulo="Onde estamos"
            titulo="Na Divina Galeria, em Jatiúca."
            descricao="Loja física em Maceió, de segunda a sábado."
          />

          <dl className="mt-10 grid gap-8 sm:grid-cols-2">
            <Informacao rotulo="Endereço">
              {endereco.local}
              <br />
              {endereco.rua}
              <br />
              {endereco.bairro}, {endereco.cidadeUf}
              <br />
              CEP {endereco.cep}
            </Informacao>
            <Informacao rotulo="Horário">
              <ul>
                {horario.map(({ dias, horas }) => (
                  <li key={dias}>
                    {dias}: <span className="tabular-nums">{horas}</span>
                  </li>
                ))}
              </ul>
            </Informacao>
            <Informacao rotulo="WhatsApp">
              <a href={whatsapp.link} target="_blank" rel="noopener" className="font-semibold text-link hover:underline">
                {whatsapp.exibicao}
              </a>
            </Informacao>
            <Informacao rotulo="E-mail e Instagram">
              <a href={`mailto:${email}`} className="text-link hover:underline">
                {email}
              </a>
              <br />
              <a href={instagram.link} target="_blank" rel="noopener" className="text-link hover:underline">
                {instagram.usuario}
              </a>
            </Informacao>
          </dl>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href={mapas.rota} target="_blank" rel="noopener">
                <Navigation />
                Como chegar
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={mapas.perfil} target="_blank" rel="noopener">
                <MapPinned />
                Ver no Google Maps
              </a>
            </Button>
          </div>
        </div>

        <figure className="mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-border bg-background lg:col-span-2">
          <Image
            src="/imagens/loja.jpg"
            width={382}
            height={455}
            sizes="(min-width: 640px) 384px, 100vw"
            alt="Interior da loja: balcão preto, parede azul-marinho com a logo iluminada, estante com action figures e sofá de espera."
            className="h-auto w-full"
          />
          <figcaption className="p-4 text-sm text-muted-foreground">A loja na Divina Galeria.</figcaption>
        </figure>
      </div>
    </section>
  );
};

type InformacaoProps = {
  rotulo: string;
  children: ReactNode;
};

const Informacao: FC<InformacaoProps> = ({ rotulo, children }) => {
  return (
    <div>
      <dt className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">{rotulo}</dt>
      <dd className="mt-2 text-lg">{children}</dd>
    </div>
  );
};
