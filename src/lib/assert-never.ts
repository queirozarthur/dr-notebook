// Fecha um switch sobre uma união: se um caso novo aparecer sem tratamento, o
// build quebra aqui (o valor deixa de ser `never`).
export const assertNever = (valor: never): never => {
  throw new Error(`Caso não tratado: ${JSON.stringify(valor)}`);
};
