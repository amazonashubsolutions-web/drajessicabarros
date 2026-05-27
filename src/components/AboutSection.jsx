const highlightOverrides = [
  { value: "CRM 13232", label: "Registro profissional" },
  { value: "+7 anos", label: "De experiencia" },
  { value: "Formacao solida", label: "UFPA e residencias medicas" },
  { value: "Atualizacao constante", label: "Em cursos, congressos e treinamentos" },
];

export default function AboutSection({ photo, highlights }) {
  return (
    <section className="section about-section" id="sobre">
      <div className="about-media about-media--feature">
        <img src={photo} alt="Dra. Jessica Barros em atendimento" />
      </div>

      <div className="about-copy about-copy--feature">
        <p className="about-eyebrow">Por que escolher a Dra. Jessica Barros?</p>

        <h2 className="about-title">
          <span className="about-title__line">Cuidado, conhecimento</span>
          <span className="about-title__line">
            e <span className="about-title__accent">excelencia</span> em cada
          </span>
          <span className="about-title__line">fase da sua vida.</span>
        </h2>

        <span className="about-title__divider" aria-hidden="true" />

        <p className="about-description">
          Medica ginecologista dedicada a saude feminina em todas as fases da vida.
          Combino conhecimento tecnico, atualizacao constante e um olhar humanizado
          para oferecer o melhor cuidado as minhas pacientes.
        </p>

        <div className="about-highlights about-highlights--strip">
          {highlights.map((item, index) => {
            const copy = highlightOverrides[index] ?? {
              value: item.value,
              label: item.label,
            };

            return (
              <article key={copy.value} className="about-highlight about-highlight--inline">
                <img src={item.icon} alt="" aria-hidden="true" />
                <div>
                  <strong>{copy.value}</strong>
                  <p>{copy.label}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
