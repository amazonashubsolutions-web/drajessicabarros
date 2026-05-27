import { useState } from "react";

const faqs = [
  {
    question: "Qual o valor da consulta?",
    answer:
      "O valor da consulta pode variar conforme o tipo de atendimento e necessidade de acompanhamento. Para informacoes atualizadas, entre em contato pelo WhatsApp e nossa equipe tera prazer em ajudar.",
  },
  {
    question: "Quanto tempo dura a consulta?",
    answer:
      "As consultas sao realizadas com atencao e sem pressa, para que cada paciente possa esclarecer suas duvidas com tranquilidade. O tempo pode variar conforme a necessidade de cada atendimento.",
  },
  {
    question: "Como posso entrar em contato?",
    answer:
      "Voce pode entrar em contato diretamente pelo WhatsApp para agendamentos, duvidas, informacoes sobre consultas e orientacoes iniciais. O atendimento e realizado de forma acolhedora e personalizada.",
  },
  {
    question: "Quais sao as formas de pagamento?",
    answer:
      "Aceitamos diferentes formas de pagamento para oferecer mais comodidade as pacientes. Para informacoes detalhadas sobre cartoes, PIX, parcelamentos e convenios (caso aplicavel), entre em contato pelo WhatsApp.",
  },
  {
    question: "Quais exames sao necessarios?",
    answer:
      "Os exames podem variar conforme a fase da vida da paciente, sintomas apresentados, acompanhamento realizado e tipo de consulta. Durante o atendimento, a Dra. Jessica orientara individualmente quais exames sao mais indicados para cada caso.",
  },
];

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

export default function FaqSection({ photo }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section section--faq" id="faq">
      <div className="faq-band">
        <div className="faq-band__left">
          <div className="faq-band__story">
            <div className="faq-band__media">
              <img src={photo} alt="Dra. Jessica Barros" />
            </div>

            <div className="faq-band__copy">
              <p className="section-eyebrow">Pronta para dar o proximo passo?</p>
              <h2 className="about-title faq-band__title">
                Atendimento feito com atencao, empatia e cuidado em cada detalhe.
                <span className="about-title__divider" />
              </h2>
              <p className="about-description faq-band__description">
                Cuidado individualizado, clareza no atendimento e acompanhamento proximo
                em todas as etapas.
              </p>
            </div>
          </div>

          <div className="faq-band__process">
            <div className="faq-band__heading faq-band__heading--process">
              <p className="section-eyebrow">Como funciona</p>
            </div>

            <div className="process-grid process-grid--faq">
              {steps.map((step) => (
                <article key={step.number} className="process-card">
                  <span className="process-card__number">{step.number}</span>
                  <h3>{step.title}</h3>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="faq-band__panel">
          <div className="faq-band__heading">
            <p className="section-eyebrow">Duvidas frequentes</p>
            <h2>Respostas rapidas para as objecoes mais comuns</h2>
          </div>

          <div className="faq-list">
            {faqs.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <article key={item.question} className={`faq-item${isOpen ? " is-open" : ""}`}>
                  <button
                    type="button"
                    className="faq-trigger"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    <span>{item.question}</span>
                    <span aria-hidden="true">{isOpen ? "-" : "+"}</span>
                  </button>

                  {isOpen ? <p className="faq-answer">{item.answer}</p> : null}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
