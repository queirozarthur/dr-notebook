// Dados da loja, todos tirados de docs/briefing.md. Nada aqui pode ser inventado:
// o que não está no briefing fica fora até a loja confirmar.

const WHATSAPP_NUMERO = "5582991298384";

export const loja = {
  nome: "Dr. Notebook",
  cidade: "Maceió",
  desde: 2005,
  avaliacoes: { nota: "4,8", total: 186 },
  whatsapp: {
    exibicao: "(82) 99129-8384",
    link: `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMERO}`,
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
