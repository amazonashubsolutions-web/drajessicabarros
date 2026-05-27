import { useEffect, useRef, useState } from "react";
import SectionHeading from "./SectionHeading";

function Stars() {
  return <p className="stars">{"\u2605\u2605\u2605\u2605\u2605"}</p>;
}

function ArrowIcon({ direction = "right" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={direction === "left" ? "M14.5 5.5 8 12l6.5 6.5" : "M9.5 5.5 16 12l-6.5 6.5"} />
    </svg>
  );
}

export default function TestimonialsSection({ items }) {
  const railRef = useRef(null);
  const [arrowState, setArrowState] = useState({
    canScrollLeft: false,
    canScrollRight: true,
  });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const rail = railRef.current;

    if (!rail) {
      return undefined;
    }

    function syncArrowState() {
      const maxScrollLeft = Math.max(0, rail.scrollWidth - rail.clientWidth);
      const threshold = 4;
      const cardWidth = rail.clientWidth > 0 ? rail.clientWidth - 56 : 0;
      const estimatedIndex =
        cardWidth > 0 ? Math.round(rail.scrollLeft / (cardWidth + 16)) : 0;

      setArrowState({
        canScrollLeft: rail.scrollLeft > threshold,
        canScrollRight: rail.scrollLeft < maxScrollLeft - threshold,
      });
      setActiveIndex(Math.max(0, Math.min(items.length - 1, estimatedIndex)));
    }

    syncArrowState();

    const frameId = requestAnimationFrame(syncArrowState);

    rail.addEventListener("scroll", syncArrowState, { passive: true });
    window.addEventListener("resize", syncArrowState);

    return () => {
      cancelAnimationFrame(frameId);
      rail.removeEventListener("scroll", syncArrowState);
      window.removeEventListener("resize", syncArrowState);
    };
  }, [items.length]);

  function handleScroll(direction) {
    if (!railRef.current) {
      return;
    }

    railRef.current.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  }

  return (
    <section className="section section--testimonials" id="depoimentos">
      <SectionHeading title="O que minhas pacientes dizem" />
      <span className="section-title-divider" aria-hidden="true" />

      <div className="testimonials-rail">
        <button
          type="button"
          className={`testimonials-arrow testimonials-arrow--left${arrowState.canScrollLeft ? "" : " is-hidden"}`}
          aria-label="Ver depoimento anterior"
          onClick={() => handleScroll("left")}
        >
          <ArrowIcon direction="left" />
        </button>

        <div ref={railRef} className="testimonials-grid" aria-label="Depoimentos de pacientes">
          {items.map((item) => (
            <article key={item.name} className="testimonial-card">
              <span className="testimonial-mark" aria-hidden="true">
                &ldquo;
              </span>
              <p className="testimonial-quote">{item.quote}</p>

              <footer className="testimonial-footer">
                <img
                  src="/imagenes/about-jessica.jpg"
                  alt={`Foto de ${item.name}`}
                  className="testimonial-avatar"
                />
                <div className="testimonial-meta">
                  <strong>{item.name}</strong>
                  <Stars />
                </div>
              </footer>
            </article>
          ))}
        </div>

        <button
          type="button"
          className={`testimonials-arrow testimonials-arrow--right${arrowState.canScrollRight ? "" : " is-hidden"}`}
          aria-label="Ver próximo depoimento"
          onClick={() => handleScroll("right")}
        >
          <ArrowIcon direction="right" />
        </button>
      </div>

      <div className="testimonial-dots" aria-hidden="true">
        {items.map((item, index) => (
          <span key={item.name} className={index === activeIndex ? "is-active" : ""} />
        ))}
      </div>
    </section>
  );
}
