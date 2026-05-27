import { useEffect, useMemo, useState } from "react";
import { links } from "../data/content";

const EXIT_KEY = "dra-jessica-popup-exit-last-shown";
const LEAD_KEY = "dra-jessica-lead-guide-claimed";
const SESSION_PREFIX = "dra-jessica-popup-session";
const EXIT_COOLDOWN_MS = 30 * 24 * 60 * 60 * 1000;

const popupContent = {
  exit: {
    eyebrow: "Guia gratuito",
    title: "Espere! Nao perca seu guia gratuito",
    text: "Baixe agora o nosso e-book '7 passos para uma gestacao tranquila' e receba dicas exclusivas.",
    cta: "Baixar Agora",
    href: "#guia",
    microcopy: "Sem compromisso - enviamos so o guia.",
  },
  scroll: {
    eyebrow: "Tratamento personalizado",
    title: "Ja conhece nossos servicos?",
    text: "Clique aqui e veja o passo a passo do seu tratamento personalizado.",
    cta: "Ver Processo",
    href: "#servicos",
    microcopy: "Leva menos de 1 minuto.",
  },
  time: {
    eyebrow: "Atendimento rapido",
    title: "Tem duvidas? Estamos aqui para ajudar!",
    text: "Converse agora com a nossa equipe via WhatsApp e tire todas as suas duvidas.",
    cta: "Abrir WhatsApp",
    href: links.whatsappCta,
    microcopy: "Resposta em ate 5 min.",
  },
};

function getSessionFlag(name) {
  return sessionStorage.getItem(`${SESSION_PREFIX}:${name}`) === "true";
}

function setSessionFlag(name) {
  sessionStorage.setItem(`${SESSION_PREFIX}:${name}`, "true");
}

export default function CroPopupManager() {
  const [activePopup, setActivePopup] = useState(null);
  const [ctaInteracted, setCtaInteracted] = useState(false);
  const [whatsAppInteracted, setWhatsAppInteracted] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);
  const [leadClaimed, setLeadClaimed] = useState(() => localStorage.getItem(LEAD_KEY) === "true");

  const canShowExit = useMemo(() => {
    const lastShown = Number(localStorage.getItem(EXIT_KEY) || "0");
    return Date.now() - lastShown > EXIT_COOLDOWN_MS;
  }, []);

  useEffect(() => {
    function handleLeadSubmitted() {
      setLeadClaimed(true);
      setActivePopup((current) => (current === "exit" ? null : current));
    }

    function handleClick(event) {
      const target = event.target instanceof Element ? event.target.closest("a, button") : null;

      if (!target) {
        return;
      }

      const href = target.getAttribute("href") || "";
      const className = typeof target.className === "string" ? target.className : "";
      const isCta =
        href.includes("wa.me") ||
        href.includes("instagram.com") ||
        href === "#contato" ||
        href === "#guia" ||
        className.includes("whatsapp-button") ||
        className.includes("social-button") ||
        className.includes("outline-button") ||
        className.includes("submit-button") ||
        className.includes("lead-magnet-button");

      if (isCta) {
        setCtaInteracted(true);
      }

      if (href.includes("wa.me") || className.includes("whatsapp-button")) {
        setWhatsAppInteracted(true);
      }

      setInteractionCount((current) => Math.min(current + 1, 2));
    }

    window.addEventListener("leadmagnet:submitted", handleLeadSubmitted);
    document.addEventListener("click", handleClick, true);

    return () => {
      window.removeEventListener("leadmagnet:submitted", handleLeadSubmitted);
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  useEffect(() => {
    if (getSessionFlag("time") || whatsAppInteracted) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      if (interactionCount < 2 && !whatsAppInteracted && !activePopup) {
        setSessionFlag("time");
        setActivePopup("time");
      }
    }, 45000);

    return () => window.clearTimeout(timer);
  }, [activePopup, interactionCount, whatsAppInteracted]);

  useEffect(() => {
    if (getSessionFlag("scroll") || ctaInteracted) {
      return undefined;
    }

    function handleScroll() {
      if (activePopup) {
        return;
      }

      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollableHeight <= 0) {
        return;
      }

      const progress = window.scrollY / scrollableHeight;

      if (progress >= 0.5) {
        setSessionFlag("scroll");
        setActivePopup("scroll");
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activePopup, ctaInteracted]);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 960 || leadClaimed || !canShowExit) {
      return undefined;
    }

    function handleMouseOut(event) {
      if (activePopup || getSessionFlag("exit")) {
        return;
      }

      if (!event.relatedTarget && event.clientY <= 0) {
        setSessionFlag("exit");
        localStorage.setItem(EXIT_KEY, String(Date.now()));
        setActivePopup("exit");
      }
    }

    document.addEventListener("mouseout", handleMouseOut);

    return () => document.removeEventListener("mouseout", handleMouseOut);
  }, [activePopup, canShowExit, leadClaimed]);

  if (!activePopup) {
    return null;
  }

  const current = popupContent[activePopup];
  const isCenterModal = activePopup === "exit" || activePopup === "time";

  function closePopup() {
    setActivePopup(null);
  }

  return (
    <div className={`cro-popup-layer${isCenterModal ? " cro-popup-layer--modal" : ""}`}>
      {isCenterModal ? <button type="button" className="cro-popup-backdrop" onClick={closePopup} /> : null}

      <aside
        className={`cro-popup cro-popup--${activePopup}${isCenterModal ? " cro-popup--center" : " cro-popup--floating"}`}
        role="dialog"
        aria-modal={isCenterModal ? "true" : "false"}
        aria-label={current.title}
      >
        <button type="button" className="cro-popup__close" aria-label="Fechar" onClick={closePopup}>
          ×
        </button>

        <p className="cro-popup__eyebrow">{current.eyebrow}</p>
        <h3>{current.title}</h3>
        <p className="cro-popup__text">{current.text}</p>

        <a
          href={current.href}
          className="cro-popup__cta"
          target={activePopup === "time" ? "_blank" : undefined}
          rel={activePopup === "time" ? "noreferrer" : undefined}
          onClick={closePopup}
        >
          {current.cta}
        </a>

        <small>{current.microcopy}</small>
      </aside>
    </div>
  );
}
