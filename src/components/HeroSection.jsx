import { links } from "../data/content";
import WhatsAppIcon from "./WhatsAppIcon";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="3.25"
        y="3.25"
        width="17.5"
        height="17.5"
        rx="5.2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.55" cy="6.45" r="1.1" fill="currentColor" />
    </svg>
  );
}

export default function HeroSection({ heroArtwork }) {
  return (
    <section className="hero-shell">
      <div className="hero-panel">
        <img src={heroArtwork} alt="Dra. Jéssica Barros" className="hero-artwork" />
        <div className="hero-copy">
          <p className="hero-eyebrow">Ginecologia • Obstetrícia • Saúde da Mulher</p>
          <h1 className="hero-title">
            <span className="hero-title__line">Sua saúde ginecológica</span>
            <span className="hero-title__line hero-title__line--accent">nas mãos de quem</span>
            <span className="hero-title__line">
              entende e <span className="hero-title__line--default">cuida de você.</span>
            </span>
          </h1>
          <span className="hero-title__divider" aria-hidden="true" />
          <p className="hero-description">
            Atendimento humanizado, tratamentos modernos e personalizados para cada
            fase da sua vida.
          </p>

          <div className="hero-actions">
            <div className="hero-actions__row">
              <a
                className="whatsapp-button whatsapp-button--hero"
                href={links.whatsappCta}
                target="_blank"
                rel="noreferrer"
              >
                <span className="whatsapp-button__icon">
                  <WhatsAppIcon className="whatsapp-button__icon-svg" />
                </span>
                <span>
                  <strong>Falar no WhatsApp</strong>
                  <small>Agende sua consulta</small>
                </span>
              </a>

              <a
                className="whatsapp-button social-button social-button--instagram"
                href={links.instagram}
                target="_blank"
                rel="noreferrer"
              >
                <span className="whatsapp-button__icon social-button__icon">
                  <InstagramIcon />
                </span>
                <span>
                  <strong>Acompanhe meu trabalho</strong>
                  <small>no Instagram</small>
                </span>
              </a>
            </div>

            <a className="lead-guide-button" href="#guia">
              <span className="lead-guide-button__badge">Guia gratuito</span>
              <span>
                <strong>Quero acessar a guia gratuita</strong>
                <small>Veja os 7 passos para uma gestacao mais tranquila</small>
              </span>
            </a>
          </div>
        </div>

        <div className="hero-mobile-media" aria-hidden="true">
          <img src={heroArtwork} alt="" />
        </div>
      </div>
    </section>
  );
}
