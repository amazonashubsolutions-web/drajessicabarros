import { getRequiredEnv, sendEmailOrThrow } from "./mailTransport.js";

function normalizePayload(payload = {}) {
  return {
    name: `${payload.name ?? ""}`.trim(),
    email: `${payload.email ?? ""}`.trim(),
    whatsapp: `${payload.whatsapp ?? ""}`.trim(),
    message: `${payload.message ?? ""}`.trim(),
  };
}

function validatePayload(payload) {
  const errors = {};

  if (!payload.name) {
    errors.name = "Informe seu nome completo.";
  }

  if (!/\S+@\S+\.\S+/.test(payload.email)) {
    errors.email = "Informe um e-mail valido.";
  }

  if (payload.whatsapp.replace(/\D/g, "").length < 10) {
    errors.whatsapp = "Informe um WhatsApp valido.";
  }

  if (payload.message.length < 12) {
    errors.message = "Conte brevemente como podemos te ajudar.";
  }

  return errors;
}

function buildContactMessage(payload) {
  return {
    subject: "Novo Contato Site - Dra Jessica | Formulario de contato",
    text:
      "Novo contato enviado pelo formulario Fale conosco.\n\n" +
      `Nome: ${payload.name}\n` +
      `E-mail: ${payload.email}\n` +
      `WhatsApp: ${payload.whatsapp}\n\n` +
      `Mensagem:\n${payload.message}`,
    html:
      "<p>Novo contato enviado pelo formulario <strong>Fale conosco</strong>.</p>" +
      `<p><strong>Nome:</strong> ${payload.name}<br />` +
      `<strong>E-mail:</strong> ${payload.email}<br />` +
      `<strong>WhatsApp:</strong> ${payload.whatsapp}</p>` +
      `<p><strong>Mensagem:</strong><br />${payload.message.replace(/\n/g, "<br />")}</p>`,
  };
}

export async function processContactSubmission(rawPayload) {
  const payload = normalizePayload(rawPayload);
  const errors = validatePayload(payload);

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      status: 400,
      body: {
        message: "Revise os campos do formulario.",
        errors,
      },
    };
  }

  const from = getRequiredEnv("RESEND_FROM");
  const notifyTo =
    process.env.CONTACT_NOTIFY_TO || process.env.LEADMAGNET_NOTIFY_TO || getRequiredEnv("RESEND_REPLY_TO");

  const contactMessage = buildContactMessage(payload);

  await sendEmailOrThrow({
    from,
    to: notifyTo,
    replyTo: payload.email,
    subject: contactMessage.subject,
    text: contactMessage.text,
    html: contactMessage.html,
  });

  return {
    ok: true,
    status: 200,
    body: {
      message: "Mensagem enviada com sucesso para a equipe da Dra. Jessica.",
    },
  };
}
