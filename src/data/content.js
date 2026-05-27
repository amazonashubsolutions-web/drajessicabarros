
const whatsappText = encodeURIComponent(
  "Olá! Gostaria de agendar uma consulta com a Dra. Jéssica Barros.",
);

export const brandAssets = {
  heroArtwork: "/imagenes/hero.jpg",
  logo: "/logo/logo.png",
  aboutPhoto: "/imagenes/about-jessica.jpg",
  finalPhoto: "/imagenes/final.jpg",
  gallery: [
    "/imagenes/gallery-a.jpg",
    "/imagenes/gallery-b.jpg",
    "/imagenes/gallery-c.jpg",
    "/imagenes/gallery-d.jpg",
    "/imagenes/gallery-e.jpg",
    "/imagenes/gallery-g.jpg",
    "/imagenes/gallery-h.jpg",
    "/imagenes/gallery-i.jpg",
  ],
};

export const links = {
  whatsapp: "https://wa.me/5594991673822",
  whatsappCta: `https://wa.me/5594991673822?text=${whatsappText}`,
  instagram:
    "https://www.instagram.com/drajessicabarross?igsh=aXpxbHQzdGk5M2h3&utm_source=qr",
  email: "mailto:contato@drajessicabarros.com.br",
  maps: "https://maps.google.com/?q=Rua+Itaipu+Tucurui+PA",
};

export const navItems = [
  { id: "inicio", label: "Início" },
  { id: "sobre", label: "Sobre a Dra." },
  { id: "servicos", label: "Serviços" },
  { id: "formacao", label: "Formação" },
  { id: "diferenciais", label: "Diferenciais" },
  { id: "depoimentos", label: "Depoimentos" },
  { id: "contato", label: "Contato" },
];

export const trustItems = [
  {
    icon: "/generated-icons/trust-humanizado.png",
    title: ["Atendimento", "humanizado"],
  },
  {
    icon: "/generated-icons/trust-personalizado.png",
    title: ["Tratamentos", "personalizados"],
  },
  {
    icon: "/generated-icons/trust-seguranca.png",
    title: "Tecnologia e segurança",
  },
  {
    icon: "/generated-icons/trust-referencia.png",
    title: "Referência em Tucuruí e região",
  },
];

export const services = [
  {
    icon: "/generated-icons/service-prenatal.png",
    title: "Pré-natal",
    description:
      "Acompanhamento completo da gestação com segurança, escuta e acolhimento.",
  },
  {
    icon: "/generated-icons/service-ginecologia.png",
    title: "Ginecologia",
    description:
      "Cuidados preventivos, exames de rotina e tratamento de doenças ginecológicas.",
  },
  {
    icon: "/generated-icons/service-cirurgias.png",
    title: "Cirurgias",
    description:
      "Procedimentos com técnicas modernas e recuperação mais rápida.",
  },
  {
    icon: "/generated-icons/service-estetica.png",
    title: "Estética ginecológica",
    description:
      "Procedimentos que promovem bem-estar, autoestima e qualidade de vida.",
  },
  {
    icon: "/generated-icons/service-hormonal.png",
    title: "Saúde hormonal",
    description:
      "Avaliação e tratamento de desequilíbrios hormonais e menopausa.",
  },
  {
    icon: "/generated-icons/service-contracepcao.png",
    title: "Contracepção",
    description:
      "Opções modernas e personalizadas para cada fase da vida.",
  },
];

export const differentials = [
  {
    icon: "/generated-icons/trust-seguranca.png",
    title: "Segurança",
    description: "Protocolos claros, tecnologia atual e cuidado responsável.",
  },
  {
    icon: "/generated-icons/formacao-especializacao.png",
    title: "Experiência",
    description: "Atuação sólida em saúde da mulher com visão integrada.",
  },
  {
    icon: "/generated-icons/trust-humanizado.png",
    title: "Acolhimento",
    description: "Cada paciente é atendida com atenção única e personalizada.",
  },
  {
    icon: "/generated-icons/service-contracepcao.png",
    title: "Tecnologia moderna",
    description: "Abordagem atual para diagnóstico, tratamentos e acompanhamento.",
  },
  {
    icon: "/generated-icons/formulario-calendario.png",
    title: "Agendamento ágil",
    description: "Contato rápido por WhatsApp e Instagram para facilitar sua rotina.",
  },
  {
    icon: "/generated-icons/formacao-graduacao.png",
    title: "Excelência",
    description: "Padrão premium em atendimento médico feminino e personalizado.",
  },
];

export const credentials = [
  {
    icon: "/generated-icons/formacao-graduacao.png",
    title: "Medicina",
    description: "UFPA",
  },
  {
    icon: "/generated-icons/formacao-pos.png",
    title: "Residência em",
    description: "Ginecologia e Obstetrícia Santa Casa do Pará",
  },
  {
    icon: "/generated-icons/formacao-especializacao.png",
    title: "Especialização em",
    description: "Ultrassonografia em Ginecologia e Obstetrícia",
  },
  {
    icon: "/generated-icons/formacao-livro.png",
    title: "Pós-graduação em",
    description: "Endoscopia Ginecológica e Cirurgia Minimamente Invasiva",
  },
  {
    icon: "/generated-icons/formacao-atualizacao.png",
    title: "Atualização constante",
    description: "Em cursos, congressos e treinamentos",
  },
  {
    icon: "/generated-icons/formacao-livro.png",
    title: "Professora ativa",
    description:
      "Na Faculdade de Medicina, reforçando sua autoridade profissional e credibilidade.",
    featured: true,
  },
];

export const aboutHighlights = [
  {
    icon: "/generated-icons/formulario-calendario.png",
    value: "CRM 13232",
    label: "Registro profissional",
  },
  {
    icon: "/generated-icons/diff-experiencia.png",
    value: "+7 anos",
    label: "Escuta, precisão e acompanhamento",
  },
  {
    icon: "/generated-icons/formacao-graduacao.png",
    value: "Formação sólida",
    label: "UFPA e residências médicas",
  },
  {
    icon: "/generated-icons/formacao-atualizacao.png",
    value: "Atualização constante",
    label: "Congressos, cursos e treinamentos",
  },
];

export const testimonials = [
  {
    quote:
      "A Dra. Jéssica mudou minha experiência com consultas. Atenciosa, explica tudo e me fez sentir segura.",
    name: "Juliana S.",
    rating: "5,0",
  },
  {
    quote:
      "Profissional maravilhosa. Acompanhou meu pré-natal com muito carinho e competência.",
    name: "Camila R.",
    rating: "5,0",
  },
  {
    quote:
      "Fiz minha cirurgia com ela e a recuperação foi ótima. Super indico pelo cuidado e clareza.",
    name: "Mariana T.",
    rating: "5,0",
  },
];

export const contactDetails = [
  {
    icon: "/generated-icons/trust-referencia.png",
    title: "Localização",
    content: ["Rua Itaipu, s/n - Vila Permanente", "Tucuruí - PA, 68464-000", "Brasil"],
  },
  {
    icon: "/generated-icons/trust-personalizado.png",
    title: "Contato",
    content: ["+55 94 99167-3822", "contato@drajessicabarros.com.br"],
  },
  {
    icon: "/generated-icons/formulario-calendario.png",
    title: "Horário",
    content: ["Segunda a Sexta: 8h às 18h", "Sábado: 8h às 12h"],
  },
];
