export default function GallerySection({ photos }) {
  return (
    <section className="section gallery-contact-shell">
      <article className="gallery-card">
        <div className="gallery-grid gallery-grid--compact">
          {photos.map((photo, index) => (
            <div key={photo} className="gallery-item gallery-item--compact">
              <img src={photo} alt={`Foto da clínica ${index + 1}`} />
            </div>
          ))}
        </div>

        <ul className="gallery-points">
          <li>Ambiente moderno, confortável e preparado para o seu bem-estar</li>
          <li>Equipamentos de última geração e protocolos seguros</li>
          <li>Atendimento exclusivo e com tempo dedicado à sua história</li>
        </ul>
      </article>
    </section>
  );
}
