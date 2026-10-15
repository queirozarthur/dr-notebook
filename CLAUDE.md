# Site da Dr. Notebook

Site institucional da Dr. Notebook, assistência técnica de informática numa galeria
em Maceió. É um projeto freelance: o site está sendo feito para ser oferecido à loja,
que ainda não tem site. O objetivo é apresentar a loja, mostrar onde ela fica e que
problemas resolve, e levar o visitante ao WhatsApp para pedir orçamento.

Explique o que fizer e por quê, em poucas frases.

## Marca

`docs/briefing.md` é a fonte de tudo sobre a loja: contato, horário, serviços,
avaliações, identidade visual, tom de voz e concorrência. Leia antes de escrever
qualquer texto do site. Os prints de referência estão em `referencias/`.

O que vale em toda tarefa:

- Assistência técnica desde 2005, na Divina Galeria (Jatiúca, Maceió). 4,8 estrelas
  em 186 avaliações no Google.
- Conserta notebooks, MacBooks, PCs gamer, consoles (PS5), drones e celulares. O
  diferencial técnico é o reparo em placa.
- Ação principal do site: orçamento grátis pelo WhatsApp.
- Visual: azul-marinho, azul vivo e branco. A logo é o "médico dos aparelhos"
  (notebook com batimento cardíaco e estetoscópio).
- Tom: próximo e bem-humorado, com promessa séria ("não resolve no martelo,
  resolve na técnica").

## Regras de conteúdo

- **Não inventar dados da loja.** Garantia, prazos, preços, formas de pagamento e
  tudo que não estiver no briefing: pergunte, ou deixe como pendência no briefing.
- Sempre "Maceió" junto do nome: existe outra Dr Notebook em Ilhabela/SP.
- Não presumir quem é dono ou dona. O perfil no Google se identifica como
  "empresa de empreendedoras".
- Avaliações citadas no site: no máximo o primeiro nome do cliente.
- Fotos e artes tiradas do Instagram e do Google são da loja. Servem para a
  demonstração; a versão publicada usa material cedido pela loja.

## Ambiente

- Windows 11 nativo, terminal PowerShell. Comandos de exemplo em PowerShell. Use
  `python` (não `python3`).
- Pasta: `C:\Users\queir\Desktop\dr-notebook` (fora do OneDrive).
- Repositório: https://github.com/queirozarthur/dr-notebook (**privado**).
- **Controle Inteligente de Aplicativos (Smart App Control) está ligado** e já
  bloqueou binários nativos em outro projeto (`psql.exe`, a DLL do
  `psycopg[binary]`, o oxlint 1.86). Se uma ferramenta falhar com "An Application
  Control policy has blocked this file", me avise e procure uma versão que rode ou
  uma alternativa.

## Como trabalhar comigo

- Passos pequenos. Termine um passo, mostre o que mudou e espere eu revisar antes
  do próximo.
- Antes de editar vários arquivos, mostre o plano em poucas linhas.
- Quando eu pedir um arquivo, entregue o arquivo completo, não só um trecho.
- Faça um commit por passo concluído, com mensagem curta em português.
- Nunca coloque senha, token ou chave no código nem em commit. Tudo vai no `.env`,
  que está no `.gitignore`; mantenha um `.env.example` sem valores reais. O
  repositório pode virar público: antes de cada commit, confira com `git status`
  que nada sensível está indo junto.
- Se uma decisão não estiver neste arquivo, pergunte antes de decidir. Quando eu
  decidir, registre em "Decisões".

## Referência: site da John Radio Web

`C:\Users\queir\Desktop\JRW\John-Radio-Web` é o último site que fiz para um
cliente: HTML, CSS e JS puros, sem build, publicado no GitHub Pages. O README dele
documenta soluções que podem ser reaproveitadas aqui:

- tokens de cor com contraste medido;
- imagem Open Graph em PNG (as redes não leem SVG);
- GA4 carregado só depois do consentimento (LGPD);
- revelação no scroll com `IntersectionObserver`, respeitando `prefers-reduced-motion`;
- header que não fica fixo no celular.

## Decisões

- Repositório privado até a publicação.
- Cursos ficam fora do site por enquanto (só aparecem na lista de serviços do
  Google; voltam se a loja confirmar que ainda acontecem).
- **Stack:** Next.js (App Router, exportação estática) + Tailwind v4 + shadcn.
  Seguir as skills de front-end instaladas (`hzblj-skills`: tailwind, nextjs-routing,
  component-architecture, type-safety, ui-*, gsap-*, css-animations).
- **Arsenal de componentes:** [Spell UI](https://spell.sh/docs) e
  [21st.dev](https://21st.dev), adaptados à marca. Usar os que se encaixam na
  proposta, não todos.
- **3D:** Three.js via React Three Fiber, com modelos construídos em código (leves,
  nas cores da marca, sem licença de terceiros): notebook no hero com o batimento
  cardíaco da logo na tela, vista explodida da placa, drone. Pausa fora da tela e
  vira imagem parada com `prefers-reduced-motion`.
- **Referências visuais (Refero):** Apple *"white room with a single blue switch"*
  nas seções claras; Apple *"Midnight hardware gallery"* nos palcos 3D, com o
  azul-marinho da loja no lugar do preto.
- **Estrutura:** home + uma página por serviço.
- **Grafia do nome:** "Dr. Notebook", sempre com "Maceió".
- **Logo na demonstração:** redesenhada em SVG a partir de
  `referencias/logo-perfil.jpg` (150 px). A versão publicada usa o arquivo da loja.
- **Animação:** CSS para transições de estado e GSAP para sequências, sem a
  biblioteca `motion`, como pedem as skills. Componentes do Spell UI que dependem
  de `motion` são portados para GSAP/CSS.

## A decidir (perguntar antes)

- **Hospedagem e domínio:** `drnotebookmaceio.com.br` está livre. O GitHub Pages
  grátis exige repositório público; antes disso, tirar de `referencias/` os prints
  com pessoas da equipe.
- **Medição de audiência:** GA4 com consentimento, como no John Radio Web, ou nada.
- **21st MCP:** recomendado; falta você gerar a chave em https://21st.dev/mcp. Até
  lá, os componentes do 21st entram pelo link de cada um.

## Pendências

- Destaques do Instagram (só abrem com login): Trajetória, Dúvidas (vira o FAQ),
  Serviços, Loja Nova.
- Perguntas para a loja: lista em `docs/briefing.md`.
