import { loja } from "@/lib/loja";

// Prévia da fundação (passo 1): mostra os tokens de cor e a tipografia nas duas
// superfícies do site. O hero de verdade substitui esta página no passo 2.

const Home = () => (
  <main className="flex flex-1 flex-col">
    <section className="palco flex flex-col items-center gap-6 px-4 py-24 text-center">
      <p className="text-sm font-semibold tracking-wide text-link uppercase">
        {loja.nome} · {loja.cidade} · desde {loja.desde}
      </p>
      <h1 className="max-w-3xl text-5xl font-extrabold tracking-tight md:text-7xl">
        Não resolve no martelo. Resolve na técnica.
      </h1>
      <p className="max-w-xl text-lg text-muted-foreground">
        Reparo em placa de notebooks, MacBooks, PCs gamer, PS5, drones e celulares.
      </p>
      <a
        href={loja.whatsapp.link}
        className="rounded-full bg-primary px-6 py-3 text-lg font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Orçamento grátis no WhatsApp
      </a>
    </section>

    <section className="flex flex-col items-center gap-6 px-4 py-24 text-center">
      <h2 className="max-w-2xl text-4xl font-bold tracking-tight md:text-5xl">
        {loja.avaliacoes.nota} estrelas em {loja.avaliacoes.total} avaliações no Google
      </h2>
      <p className="max-w-xl text-lg text-muted-foreground">
        {loja.endereco.local}, {loja.endereco.bairro}, {loja.endereco.cidadeUf}.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <a
          href={loja.whatsapp.link}
          className="rounded-full bg-primary px-6 py-3 text-lg font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Chamar no WhatsApp
        </a>
        <a
          href={loja.instagram}
          className="rounded-full border border-link px-6 py-3 text-lg font-semibold text-link"
        >
          Ver o Instagram
        </a>
      </div>
    </section>
  </main>
);

export default Home;
