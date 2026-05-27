import { links } from "../data/content";
import WhatsAppIcon from "./WhatsAppIcon";

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="15" rx="3" />
      <path d="M7 3.5v4M17 3.5v4M3.5 9.5h17" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.75" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function FinalCtaSection() {
  return (
    <section className="section final-cta">
      <div className="final-cta__panel">
        <article className="final-cta__item final-cta__item--info">
          <span className="final-cta__icon" aria-hidden="true">
            <CalendarIcon />
          </span>
          <div className="final-cta__copy">
            <h3>Sua saúde merece prioridade.</h3>
            <p>Agende sua consulta de forma rápida e prática pelo WhatsApp.</p>
          </div>
        </article>

        <div className="final-cta__item final-cta__item--center">
          <a
            className="whatsapp-button whatsapp-button--strip"
            href={links.whatsappCta}
            target="_blank"
            rel="noreferrer"
          >
            <span className="whatsapp-button__icon">
              <WhatsAppIcon className="whatsapp-button__icon-svg" />
            </span>
            <span>
              <strong>Falar no WhatsApp</strong>
              <small>Resposta imediata</small>
            </span>
          </a>
        </div>

        <article className="final-cta__item final-cta__item--social">
          <span className="final-cta__icon" aria-hidden="true">
            <InstagramIcon />
          </span>
          <div className="final-cta__copy">
            <h3>Veja conteúdos exclusivos</h3>
            <p>Dicas, informações e novidades no meu Instagram.</p>
            <a
              className="final-cta__instagram"
              href={links.instagram}
              target="_blank"
              rel="noreferrer"
            >
              Acessar Instagram
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
