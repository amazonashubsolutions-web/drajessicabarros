import { useMemo, useState } from "react";
import SectionHeading from "./SectionHeading";

const initialForm = {
  name: "",
  whatsapp: "",
  email: "",
  message: "",
};

function sanitizePhone(value) {
  return value.replace(/[^\d()+\-\s]/g, "").slice(0, 20);
}

export default function ContactSection() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [touched, setTouched] = useState({});

  const errors = useMemo(() => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Informe seu nome completo.";
    }

    if (!form.whatsapp.trim() || form.whatsapp.replace(/\D/g, "").length < 10) {
      nextErrors.whatsapp = "Informe um WhatsApp valido.";
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = "Informe um e-mail valido.";
    }

    if (!form.message.trim() || form.message.trim().length < 12) {
      nextErrors.message = "Conte brevemente como podemos te ajudar.";
    }

    return nextErrors;
  }, [form]);

  function handleChange(event) {
    const { name, value } = event.target;
    setServerError("");
    setForm((current) => ({
      ...current,
      [name]: name === "whatsapp" ? sanitizePhone(value) : value,
    }));
  }

  function handleBlur(event) {
    const { name } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(false);
    setTouched({
      name: true,
      whatsapp: true,
      email: true,
      message: true,
    });

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.message || "Nao foi possivel enviar a mensagem agora.");
        return;
      }

      setSubmitted(true);
      setForm(initialForm);
      setTouched({});
    } catch (error) {
      console.error("Contact submit error:", error);
      setServerError("Nao foi possivel enviar a mensagem no momento.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <article className="contact-card" id="contato">
      <SectionHeading title="Fale conosco" centered={false} />

      <div className="contact-card__layout">
        <form className="contact-form contact-form--compact" noValidate onSubmit={handleSubmit}>
          <label>
            <span>Nome completo</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.name && errors.name ? <small>{errors.name}</small> : null}
          </label>

          <label>
            <span>WhatsApp</span>
            <input
              type="tel"
              name="whatsapp"
              value={form.whatsapp}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="(00) 00000-0000"
            />
            {touched.whatsapp && errors.whatsapp ? <small>{errors.whatsapp}</small> : null}
          </label>

          <label>
            <span>E-mail</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email ? <small>{errors.email}</small> : null}
          </label>

          <label>
            <span>Como podemos te ajudar?</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              onBlur={handleBlur}
              rows="4"
            />
            {touched.message && errors.message ? <small>{errors.message}</small> : null}
          </label>

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar mensagem"}
            <span aria-hidden="true">→</span>
          </button>

          {submitted ? (
            <p className="form-success">
              Mensagem enviada com sucesso para a equipe da Dra. Jessica.
            </p>
          ) : null}

          {serverError ? <p className="form-error">{serverError}</p> : null}
        </form>
      </div>
    </article>
  );
}
