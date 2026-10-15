# Dr. Notebook Maceió

Site institucional da Dr. Notebook, assistência técnica de informática na Divina
Galeria (Jatiúca, Maceió) desde 2005. Conserta notebooks, MacBooks, PCs gamer,
PS5, drones e celulares, com reparo em placa.

Em produção. Tudo sobre a loja está em `docs/briefing.md`; as decisões do projeto,
em `CLAUDE.md`.

## Stack

Next.js 16 (App Router) com exportação estática, Tailwind CSS v4 e shadcn. O
`npm run build` gera o site inteiro em HTML na pasta `out/`, sem servidor.

```powershell
npm install
npm run dev     # http://localhost:3000
npm run build   # gera out/
npm run lint
```

## Cores

Os tokens ficam em `src/app/globals.css`. A paleta foi amostrada dos prints em
`referencias/` (parede azul-marinho da loja e a arte "Seu Mac parou?").

| Token | Valor | Onde |
| --- | --- | --- |
| `--tinta` | `#0b1630` | texto nas seções claras (17,92:1 no branco) |
| `--ardosia` | `#4a5878` | texto secundário (7,10:1 no branco) |
| `--azul-vivo` | `#0353c6` | botão e links nas seções claras (6,87:1) |
| `--marinho-950` | `#061430` | fundo do palco |
| `--azul-palco` | `#1a6bf0` | botão no palco (texto branco 4,77:1) |
| `--azul-claro` | `#4d94ff` | links e destaques no palco (6,08:1) |

### Dois azuis no palco

O azul-vivo some no azul-marinho (2,66:1). Por isso a classe `.palco` reaponta os
tokens: o botão passa para `#1a6bf0` e os links para `#4d94ff`. Os componentes
usam só os nomes semânticos (`bg-primary`, `text-link`, `text-muted-foreground`)
e funcionam nas duas superfícies sem `dark:`.

O `dark:` dos componentes de terceiros também vale dentro do `.palco`
(`@custom-variant dark`), porque o palco é uma superfície escura.

## Tipografia

Plus Jakarta Sans, uma sans geométrica pesada como a das artes da loja. O
`next/font` hospeda a fonte junto do site, sem requisição ao Google.

## Dados da loja

`src/lib/loja.ts` reúne contato, endereço, horário e avaliações. Tudo vem do
briefing; o que não estiver lá não entra no site.

## Avisos do npm

`npm audit` acusa alertas "high" no pacote `braces`, que vem das ferramentas de
desenvolvimento (ESLint e o CLI do shadcn) e não vai para o site publicado. O
`npm audit fix --force` rebaixaria o shadcn para a versão 1.0; não rode.
