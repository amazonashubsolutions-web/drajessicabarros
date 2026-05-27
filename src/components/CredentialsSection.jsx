import { useEffect, useRef, useState } from "react";
import SectionHeading from "./SectionHeading";

function ArrowIcon({ direction = "right" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={direction === "left" ? "M14.5 5.5 8 12l6.5 6.5" : "M9.5 5.5 16 12l-6.5 6.5"} />
    </svg>
  );
}

export default function CredentialsSection({ items }) {
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
      const cardWidth = rail.clientWidth > 0 ? Math.min(260, rail.clientWidth) : 0;
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
      left: direction === "left" ? -260 : 260,
      behavior: "smooth",
    });
  }

  return (
    <section className="section section--credentials" id="formacao">
      <div className="credentials-card">
        <SectionHeading title="Formação e especializações" light />

        <div className="credentials-rail">
          <button
            type="button"
            className={`credentials-arrow credentials-arrow--left${arrowState.canScrollLeft ? "" : " is-hidden"}`}
            aria-label="Ver formações anteriores"
            onClick={() => handleScroll("left")}
          >
            <ArrowIcon direction="left" />
          </button>

          <div
            ref={railRef}
            className="credentials-grid"
            aria-label="Formação e especializações da Dra. Jéssica Barros"
          >
            {items.map((item) => (
              <article
                key={item.title + item.description}
                className={`credential-item${item.featured ? " credential-item--featured" : ""}`}
              >
                <img src={item.icon} alt="" aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>

          <button
            type="button"
            className={`credentials-arrow credentials-arrow--right${arrowState.canScrollRight ? "" : " is-hidden"}`}
            aria-label="Ver próximas formações"
            onClick={() => handleScroll("right")}
          >
            <ArrowIcon direction="right" />
          </button>
        </div>

        <div className="credentials-dots" aria-hidden="true">
          {items.map((item, index) => (
            <span
              key={item.title + item.description}
              className={index === activeIndex ? "is-active" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
