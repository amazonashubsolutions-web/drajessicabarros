import SectionHeading from "./SectionHeading";

const steps = [
  {
    number: "1",
    title: "Marque sua consulta",
    description: "Clique no Instagram ou no WhatsApp para iniciar seu atendimento.",
  },
  {
    number: "2",
    title: "Avaliacao completa",
    description: "Exames, historico e uma conversa detalhada para entender seu caso.",
  },
  {
    number: "3",
    title: "Plano personalizado",
    description: "Opcoes de tratamento, custos e cronograma alinhados a sua realidade.",
  },
  {
    number: "4",
    title: "Acompanhamento",
    description: "Suporte continuo, revisoes e telemedicina para mais tranquilidade.",
  },
];

export default function ProcessSection() {
  return (
    <section className="section section--process" id="processo">
      <SectionHeading
        eyebrow="Como funciona"
        title="Conheca o passo a passo do seu tratamento"
        description="Um processo claro, sem burocracia desnecessaria e com acompanhamento em cada etapa."
      />

      <div className="process-grid">
        {steps.map((step) => (
          <article key={step.number} className="process-card">
            <span className="process-card__number">{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
