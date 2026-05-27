import SectionHeading from "./SectionHeading";

export default function DifferentialsSection({ items }) {
  return (
    <section className="section section--differentials" id="diferenciais">
      <SectionHeading
        eyebrow="Atendimento premium e humanizado"
        title="Diferenciais que tornam sua experiência mais segura e tranquila"
      />

      <div className="differentials-grid">
        {items.map((item) => (
          <article key={item.title} className="differential-card">
            <img src={item.icon} alt="" aria-hidden="true" />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
