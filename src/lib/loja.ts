// Dados da loja, todos tirados de docs/briefing.md. Nada aqui pode ser inventado:
// o que não está no briefing fica fora até a loja confirmar.

const WHATSAPP_NUMERO = "5582991298384";
const WHATSAPP_BASE = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMERO}`;
const COORDENADAS = { latitude: -9.6513854, longitude: -35.7131546 } as const;
const BUSCA_NO_GOOGLE = "Dr. Notebook Informática, Divina Galeria, Jatiúca, Maceió";

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
  instagram: { usuario: "@drnotebookmcz", link: "https://www.instagram.com/drnotebookmcz/" },
  coordenadas: COORDENADAS,
  mapas: {
    // O perfil da loja no Google (com as avaliações) e a rota até a galeria.
    perfil: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSCA_NO_GOOGLE)}`,
    rota: `https://www.google.com/maps/dir/?api=1&destination=${COORDENADAS.latitude},${COORDENADAS.longitude}`,
  },
  endereco: {
    local: "Divina Galeria",
    rua: "Av. Dr. Antônio Gomes de Barros, 637, Loja 3",
    bairro: "Jatiúca",
    cidadeUf: "Maceió/AL",
    cep: "57036-000",
  },
  // `abertura` é a mesma informação no formato dos dados estruturados do Google.
  horario: [
    {
      dias: "Segunda a sexta",
      horas: "8h às 19h",
      abertura: { dias: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], abre: "08:00", fecha: "19:00" },
    },
    { dias: "Sábado", horas: "9h às 13h", abertura: { dias: ["Saturday"], abre: "09:00", fecha: "13:00" } },
    { dias: "Domingo", horas: "Fechado" },
  ],
} as const;
