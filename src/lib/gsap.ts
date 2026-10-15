import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// Os plugins são registrados uma vez, aqui; os componentes importam deste módulo.
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

// Entrada padrão da skill ui-motion: sobe 12 px, ganha opacidade e sai de um
// desfoque de 4 px, com 100 ms entre os grupos. Sem ultrapassagem.
export const ENTRADA = {
  duracao: 0.5,
  deslocamento: 12,
  desfoque: "blur(4px)",
  curva: "power2.out",
  intervalo: 0.1,
} as const;

export const SEM_MOVIMENTO_REDUZIDO = "(prefers-reduced-motion: no-preference)";

// Para quem precisa de um ramo também com movimento reduzido: o gsap.matchMedia()
// só chama a função quando alguma condição bate, então as duas vão juntas.
export const PREFERENCIA_DE_MOVIMENTO = {
  comMovimento: SEM_MOVIMENTO_REDUZIDO,
  reduzido: "(prefers-reduced-motion: reduce)",
} as const;

export { gsap, ScrollTrigger, SplitText, useGSAP };
