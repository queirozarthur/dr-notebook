export type LinkNavegacao = {
  rotulo: string;
  href: `/${string}`;
};

// As âncoras apontam para seções da home; elas entram nos passos seguintes.
export const linksPrincipais = [
  { rotulo: "Serviços", href: "/#servicos" },
  { rotulo: "Reparo em placa", href: "/#reparo-em-placa" },
  { rotulo: "Avaliações", href: "/#avaliacoes" },
  { rotulo: "Onde estamos", href: "/#onde-estamos" },
] as const satisfies readonly LinkNavegacao[];
