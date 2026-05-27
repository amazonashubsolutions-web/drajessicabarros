import { useMemo, useState } from "react";
import guidePdfUrl from "../leadmagnet/leadmagnet.pdf?url";
import { links } from "../data/content";
import SectionHeading from "./SectionHeading";

const initialForm = {
  name: "",
  email: "",
  whatsapp: "",
  need: "",
};

function sanitizePhone(value) {
  return value.replace(/[^\d()+\-\s]/g, "").slice(0, 20);
}

export default function LeadMagnetSection() {
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

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = "Informe um e-mail valido.";
    }

    if (!form.whatsapp.trim() || form.whatsapp.replace(/\D/g, "").length < 10) {
      nextErrors.whatsapp = "Informe um WhatsApp valido.";
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
      email: true,
      whatsapp: true,
      need: true,
    });

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-leadmagnet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setTouched({
            name: true,
            email: true,
            whatsapp: true,
            need: true,
          });
        }

        setServerError(data.message || "Nao foi possivel enviar o guia agora.");
        return;
      }

      localStorage.setItem("dra-jessica-lead-guide-claimed", "true");
      window.dispatchEvent(new CustomEvent("leadmagnet:submitted"));
      setSubmitted(true);
      setForm(initialForm);
      setTouched({});
    } catch (error) {
      console.error("Lead magnet submit error:", error);
      setServerError(
        "Nao foi possivel enviar o guia por e-mail agora. Se preferir, fale conosco pelo WhatsApp ou baixe o PDF manualmente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="section section--lead-magnet" id="guia">
      <div className="lead-magnet-card">
        <div className="lead-magnet-copy">
          <SectionHeading
            eyebrow="Guia gratuito"
            title="Baixe o guia: 7 passos para uma gestacao tranquila"
            description="Receba um material objetivo para entender os primeiros cuidados, se organizar melhor e chegar a consulta com mais seguranca."
            centered={false}
          />

          <ul className="lead-magnet-points">
            <li>Orientacoes iniciais para uma gestacao mais tranquila.</li>
            <li>Guia rapido para o dia da consulta.</li>
            <li>Orientacoes rapidas para diminuir a ansiedade antes do atendimento.</li>
          </ul>
        </div>

        <form className="lead-magnet-form" noValidate onSubmit={handleSubmit}>
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
            <span>E-mail</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="voce@exemplo.com"
            />
            {touched.email && errors.email ? <small>{errors.email}</small> : null}
          </label>

          <label>
            <span>Telefone (WhatsApp)</span>
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
            <span>Estado da gestacao ou necessidade</span>
            <select name="need" value={form.need} onChange={handleChange} onBlur={handleBlur}>
              <option value="">Selecione (opcional)</option>
              <option value="Pre-natal">Pre-natal</option>
              <option value="Contracepcao">Contracepcao</option>
              <option value="Mioma ou cirurgia">Mioma ou cirurgia</option>
              <option value="Saude hormonal">Saude hormonal</option>
              <option value="Menopausa">Menopausa</option>
            </select>
          </label>

          <button type="submit" className="lead-magnet-button" disabled={isSubmitting}>
            {isSubmitting ? "Enviando guia..." : "Receber Guia por E-mail"}
          </button>

          <p className="lead-magnet-microcopy">
            Seus dados estao seguros. Usamos essas informacoes apenas para enviar o guia e facilitar o contato.
          </p>

          {submitted ? (
            <p className="lead-magnet-success">
              Guia enviado com sucesso para o e-mail informado.
            </p>
          ) : null}

          {serverError ? <p className="lead-magnet-error">{serverError}</p> : null}

          <p className="lead-magnet-fallback">
            Prefere baixar agora?{" "}
            <a href={guidePdfUrl} target="_blank" rel="noreferrer">
              Abrir PDF manualmente
            </a>{" "}
            ou{" "}
            <a href={links.whatsappCta} target="_blank" rel="noreferrer">
              falar no WhatsApp
            </a>
            .
          </p>
        </form>
      </div>
    </section>
  );
}
