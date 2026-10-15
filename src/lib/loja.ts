// Dados da loja, todos tirados de docs/briefing.md. Nada aqui pode ser inventado:
// o que não está no briefing fica fora até a loja confirmar.

const WHATSAPP_NUMERO = "5582991298384";
const WHATSAPP_BASE = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMERO}`;

// Mensagem que já vem escrita quando o visitante abre o WhatsApp pelo site: a loja
// sabe de onde veio o contato e o visitante só precisa apertar enviar.
export const MENSAGEM_ORCAMENTO = "Olá! Vim pelo site e quero um orçamento.";

export const linkWhatsApp = (mensagem: string) => {
  return `${WHATSAPP_BASE}&text=${encodeURIComponent(mensagem)}`;
};

export const loja = {
  nome: "Dr. Notebook",
  cidade: "Maceió",
  desde: 2005,
  avaliacoes: { nota: "4,8", total: 186 },
  whatsapp: {
    exibicao: "(82) 99129-8384",
    link: WHATSAPP_BASE,
  },
  email: "drnotebookmcz@outlook.com",
  instagram: "https://www.instagram.com/drnotebookmcz/",
  endereco: {
    local: "Divina Galeria",
    rua: "Av. Dr. Antônio Gomes de Barros, 637, Loja 3",
    bairro: "Jatiúca",
    cidadeUf: "Maceió/AL",
    cep: "57036-000",
  },
  horario: [
    { dias: "Segunda a sexta", horas: "8h às 19h" },
    { dias: "Sábado", horas: "9h às 13h" },
    { dias: "Domingo", horas: "Fechado" },
  ],
} as const;
