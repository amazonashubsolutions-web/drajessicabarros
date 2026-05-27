import SectionHeading from "./SectionHeading";

export default function ServicesSection({ items }) {
  return (
    <section className="section section--services" id="servicos">
      <div className="services-heading">
        <SectionHeading title="Como posso te ajudar" />
        <span className="section-title-divider" aria-hidden="true" />
      </div>

      <div className="services-grid" id="especialidades">
        {items.map((item) => (
          <article key={item.title} className="service-card">
            <img src={item.icon} alt="" aria-hidden="true" className="service-card__icon" />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
