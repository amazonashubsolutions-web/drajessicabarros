import { contactDetails, links, navItems } from "../data/content";
import FooterMap from "./FooterMap";
import WhatsAppIcon from "./WhatsAppIcon";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.75" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__brand">
        <img src="/logo/logo.png" alt="Marca da Dra. Jessica Barros" className="footer-logo" />
        <p>Cuidado, conhecimento e excelencia em cada fase da sua vida.</p>
        <div className="footer-social">
          <a href={links.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
            <InstagramIcon />
          </a>
          <a href={links.whatsappCta} target="_blank" rel="noreferrer" aria-label="WhatsApp">
            <WhatsAppIcon />
          </a>
        </div>
      </div>

      <div className="site-footer__nav">
        <h4>Navegacao</h4>
        {navItems.map((item) => (
          <a key={item.id} href={`#${item.id}`}>
            {item.label}
          </a>
        ))}
      </div>

      <div className="site-footer__services">
        <h4>Servicos</h4>
        <a href="#servicos">Pre-natal</a>
        <a href="#servicos">Ginecologia</a>
        <a href="#servicos">Cirurgias</a>
        <a href="#servicos">Estetica ginecologica</a>
        <a href="#servicos">Saude hormonal</a>
        <a href="#servicos">Contracepcao</a>
      </div>

      <div className="site-footer__contact">
        {contactDetails.map((item) => (
          <article key={item.title} className="footer-contact-item">
            <div>
              <h4>{item.title}</h4>
              {item.content.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </article>
        ))}

        <FooterMap />
      </div>

      <div className="site-footer__bottom">
        <p>&copy; 2026 Dra. Jessica Barros - Ginecologia | CRM 13232</p>
        <div>
          <a href={links.maps} target="_blank" rel="noreferrer">
            Ver no mapa
          </a>
          <a href={links.email}>Enviar e-mail</a>
        </div>
      </div>
    </footer>
  );
}
