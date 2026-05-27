import { useEffect, useId } from "react";

export default function FormSuccessModal({
  open,
  onClose,
  eyebrow,
  title,
  description,
  note,
  ctaLabel = "Entendi",
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
        <button type="button" className="form-modal-close" aria-label="Fechar" onClick={onClose}>
          X
        </button>

        {eyebrow ? <p className="form-modal-eyebrow">{eyebrow}</p> : null}
        <div className="form-modal-badge" aria-hidden="true">
          OK
        </div>
        <h3 id={titleId}>{title}</h3>
        <p id={descriptionId} className="form-modal-description">{description}</p>
        {note ? <p className="form-modal-note">{note}</p> : null}

        <button type="button" className="form-modal-action" onClick={onClose}>
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}
