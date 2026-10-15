import { useCallback, useRef, useState } from "react";
import { useEconomiaDeDados } from "./use-economia-de-dados";
import { usePonteiroNaJanela } from "./use-ponteiro-na-janela";
import { usePrefereMovimentoReduzido } from "./use-prefere-movimento-reduzido";
import { useVisivelNaTela } from "./use-visivel-na-tela";

// O que todo palco 3D do site precisa saber: se está na tela, se o visitante
// prefere menos movimento, se pediu economia de dados, onde está o mouse e se a
// cena já foi criada (para aparecer com um fade, sem piscar).
export const usePalco3D = () => {
  const palco = useRef<HTMLDivElement>(null);
  const ativa = useVisivelNaTela(palco);
  const movimentoReduzido = usePrefereMovimentoReduzido();
  const economizarDados = useEconomiaDeDados();
  const ponteiro = usePonteiroNaJanela();
  const [pronta, setPronta] = useState(false);

  const aoFicarPronta = useCallback(() => {
    setPronta(true);
  }, []);

  return { palco, ativa, movimentoReduzido, economizarDados, ponteiro, pronta, aoFicarPronta };
};
