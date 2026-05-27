import { useEffect, useRef, useState } from "react";

export default function TrustBar({ items }) {
  const railRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const rail = railRef.current;

    if (!rail) {
      return undefined;
    }

    function syncActiveIndex() {
      const cards = Array.from(rail.children);

      if (cards.length === 0) {
        setActiveIndex(0);
        return;
      }

      const railCenter = rail.scrollLeft + rail.clientWidth / 2;
      let nextIndex = 0;
      let smallestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const distance = Math.abs(cardCenter - railCenter);

        if (distance < smallestDistance) {
          smallestDistance = distance;
          nextIndex = index;
        }
      });

      setActiveIndex(nextIndex);
    }

    syncActiveIndex();

    rail.addEventListener("scroll", syncActiveIndex, { passive: true });
    window.addEventListener("resize", syncActiveIndex);

    return () => {
      rail.removeEventListener("scroll", syncActiveIndex);
      window.removeEventListener("resize", syncActiveIndex);
    };
  }, [items.length]);

  return (
    <section className="trust-bar">
      <div ref={railRef} className="trust-bar__inner">
        {items.map((item, index) => {
          const lines = Array.isArray(item.title)
            ? item.title
            : index === 2
              ? ["Tecnologia e", "segurança"]
              : index === 3
                ? ["Referência em", "Tucuruí e região"]
                : [item.title];

          return (
            <article
              key={Array.isArray(item.title) ? item.title.join("-") : item.title}
              className="trust-item"
            >
              <img src={item.icon} alt="" aria-hidden="true" className="trust-item__icon" />
              <p>
                {lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
            </article>
          );
        })}
      </div>

      <div className="trust-bar__dots" aria-hidden="true">
        {items.map((item, index) => (
          <span
            key={Array.isArray(item.title) ? item.title.join("-") : item.title}
            className={index === activeIndex ? "is-active" : ""}
          />
        ))}
      </div>
    </section>
  );
}
