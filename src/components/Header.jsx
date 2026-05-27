import { useState } from "react";
import { links, navItems } from "../data/content";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Header({ logo }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleNavClick() {
    setIsMenuOpen(false);
  }

  return (
    <header className="site-header">
      <a className="brand-lockup" href="#inicio" aria-label="Voltar ao início" onClick={handleNavClick}>
        <img src={logo} alt="Dra. Jéssica Barros" className="brand-logo" />
      </a>

      <button
        type="button"
        className={`menu-toggle${isMenuOpen ? " is-open" : ""}`}
        aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isMenuOpen}
        aria-controls="main-navigation"
        onClick={() => setIsMenuOpen((current) => !current)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav
        id="main-navigation"
        className={`main-nav${isMenuOpen ? " is-open" : ""}`}
        aria-label="Navegação principal"
      >
        {navItems.map((item) => (
          <a key={item.id} href={`#${item.id}`} onClick={handleNavClick}>
            {item.label}
          </a>
        ))}
      </nav>

      <a
        className="whatsapp-button whatsapp-button--header"
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
    </header>
  );
}
