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

## Logo

Redesenho em SVG da logo da loja (`referencias/logo-perfil.jpg`, que só tem
150 px): "Dr." pequeno, "Noteb" em degradê, o notebook com batimento no lugar do
"oo" e o "k" com estetoscópio. A versão publicada deve usar o arquivo da loja.

- `scripts/gerar-logo.mjs` gera `src/components/marca/logo-geometria.ts`. As
  letras são a Plus Jakarta Sans ExtraBold convertida em curvas (`opentype.js`),
  então a logo não depende de fonte instalada. Para mudar a logo, edite o script
  e rode `node scripts/gerar-logo.mjs`; não edite o `.ts` gerado.
- O `opentype.js` 2.0 quebra no GSUB desta fonte; por isso o script monta o
  texto glifo a glifo, com kerning, sem as substituições tipográficas.
- `<Logo />` pinta com os tokens `--logo-*`, que o `.palco` reaponta: a mesma
  logo serve no branco e no azul-marinho. Cada instância cria o próprio degradê
  (`useId`), porque o `<stop>` resolve as cores onde o degradê está, não onde ele
  é usado.
- `src/app/icon.svg` é o favicon, desenhado à mão numa grade de 32 px para ficar
  legível em 16 px.

## Animações

Sem a biblioteca `motion`: transições de estado em CSS, sequências em GSAP
(`gsap`, `SplitText`, `ScrollTrigger`, registrados uma vez em `src/lib/gsap.ts`).

- `RevelarEmSequencia` (`src/components/animacao/`): os filhos entram em fila
  com os valores da skill ui-motion: sobem 12 px, ganham opacidade, saem de um
  desfoque de 4 px, 100 ms entre um e outro.
- `WordsStagger` (`src/components/spell/`): porte do
  [words-stagger](https://spell.sh/docs/words-stagger) do Spell UI para GSAP +
  SplitText. Palavra por palavra, 80 ms entre elas; ao fim o texto original volta
  (`revert`), para leitores de tela e buscadores.
- **Sem piscar:** um script inline no `<head>` põe a classe `js` no `<html>`
  antes da primeira pintura, e só com ela os blocos `[data-animacao="entrada"]`
  nascem escondidos. Se o JS falhar, uma animação de CSS os mostra em 2,5 s. Com
  `prefers-reduced-motion`, nada é escondido nem animado.
- O batimento do hero é só CSS (`animate-tracar` e `animate-pulso`, definidos
  como tokens no `@theme`).

## Notebook 3D (hero)

Three.js com React Three Fiber, modelo construído em código (sem arquivo 3D
baixado): base, teclado com teclas instanciadas, trackpad, dobradiça e tampa. Tudo
em `src/components/3d/notebook/`.

- **Tela:** um shader (`material-tela.ts`) desenha um monitor cardíaco, com dois
  batimentos, grade e a varredura de monitor de hospital. A tela acende conforme a
  tampa abre e ilumina o teclado de azul.
- **Animação:** o GSAP anima só dois números numa ref, `entrada` (ao carregar) e
  `rolagem` (com o scroll); a cena lê a ref a cada quadro e calcula a pose
  (`pose.ts`). Nenhum estado React muda por quadro.
- **Desktop (lg+):** o hero inteiro fica fixo por 80% de uma tela de rolagem
  enquanto a tampa abre (`pinSpacing: true` explícito, porque o ScrollTrigger o
  desliga quando o pai é flex). **Celular e tablet:** sem fixar; a tampa abre
  enquanto o palco passa pela tela.
- **Movimento reduzido:** o notebook já aparece aberto e parado, sem pin.
- **Desempenho:** o Three.js (uns 900 KB) é um pacote separado, carregado só
  depois da página (`next/dynamic`, sem SSR). A cena para de desenhar fora da
  tela, e com movimento reduzido só desenha quando algo muda. Com a economia de
  dados do navegador ligada, o 3D nem é baixado.
- **Reflexos:** `RoomEnvironment` do Three gera o ambiente de estúdio em código;
  nenhum HDR é baixado de CDN.
- O aviso `THREE.Clock ... deprecated` no console vem do próprio React Three
  Fiber 9.8 com o Three r186; não é do nosso código.

## Componentes de terceiros

| Componente | Origem | O que mudou |
| --- | --- | --- |
| `Button` | shadcn | reescrito com `tv()` e `forwardRef`, em pílula; mesma API |
| acabamento do botão principal | Spell UI `rich-button` | degradê, brilho interno e sombra no texto, nas cores da marca |
| `WordsStagger` | Spell UI `words-stagger` | de `motion` para GSAP + SplitText |

## Cabeçalho

Fixo no topo só do `md` para cima, translúcido. No celular ele não fica fixo,
como no John Radio Web: numa tela pequena, moldura fixa rouba espaço do
conteúdo. O menu do celular fecha com Esc (devolvendo o foco ao botão), ao tocar
fora e ao escolher um link.

## TypeScript

Além do `strict`, o `tsconfig.json` liga `noUncheckedIndexedAccess`,
`exactOptionalPropertyTypes` e `noImplicitOverride`, como pede a skill
type-safety.

## Dados da loja

`src/lib/loja.ts` reúne contato, endereço, horário e avaliações. Tudo vem do
briefing; o que não estiver lá não entra no site.

## Avisos do npm

`npm audit` acusa alertas "high" no pacote `braces`, que vem das ferramentas de
desenvolvimento (ESLint e o CLI do shadcn) e não vai para o site publicado. O
`npm audit fix --force` rebaixaria o shadcn para a versão 1.0; não rode.
