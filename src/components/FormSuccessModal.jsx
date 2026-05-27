import { useEffect, useId } from "react";

export default function FormSuccessModal({
  open,
  onClose,
  eyebrow,
  title,
  description,
  note,
  ctaLabel = "Entendi",
  whatsappHref,
  whatsappLabel,
}) {
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="form-modal-layer"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
    >
      <button type="button" className="form-modal-backdrop" aria-label="Fechar mensagem" onClick={onClose} />

      <div className="form-modal-card">
        <div className="form-modal-header">
          {eyebrow ? <p className="form-modal-eyebrow">{eyebrow}</p> : <span />}
          <button type="button" className="form-modal-close" aria-label="Fechar" onClick={onClose}>
            X
          </button>
        </div>

        <div className="form-modal-content">
          <div className="form-modal-badge" aria-hidden="true">
            OK
          </div>

          <div className="form-modal-copy">
            <h3 id={titleId}>{title}</h3>
            <p id={descriptionId} className="form-modal-description">{description}</p>
            {note ? <p className="form-modal-note">{note}</p> : null}

            {whatsappHref ? (
              <a
                className="form-modal-whatsapp-link"
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
              >
                {whatsappLabel || "Continuar o atendimento pelo WhatsApp"}
              </a>
            ) : null}

            <button type="button" className="form-modal-action" onClick={onClose}>
              {ctaLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
