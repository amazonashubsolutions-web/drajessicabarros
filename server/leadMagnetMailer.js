import fs from "node:fs/promises";
import path from "node:path";
import { getRequiredEnv, sendEmailOrThrow } from "./mailTransport.js";

const guidePath = path.resolve(process.cwd(), "src", "leadmagnet", "leadmagnet.pdf");

function normalizePayload(payload = {}) {
  return {
    name: `${payload.name ?? ""}`.trim(),
    email: `${payload.email ?? ""}`.trim(),
    whatsapp: `${payload.whatsapp ?? ""}`.trim(),
    need: `${payload.need ?? ""}`.trim(),
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

  return errors;
}

function buildPatientMessage(payload) {
  const needLine = payload.need || "Nao informado";

  return {
    subject: "Seu guia rapido para o dia da consulta",
    text:
      `Ola, ${payload.name}.\n\n` +
      "Segue em anexo o guia rapido para o dia da consulta.\n\n" +
      `WhatsApp informado: ${payload.whatsapp}\n` +
      `Necessidade: ${needLine}\n\n` +
      "Se desejar, nossa equipe tambem pode ajudar pelo WhatsApp.\n\n" +
      "Dra. Jessica Barros",
    html:
      `<p>Ola, <strong>${payload.name}</strong>.</p>` +
      "<p>Segue em anexo o <strong>guia rapido para o dia da consulta</strong>.</p>" +
      "<p>Preparamos esse material para ajudar voce a chegar ao atendimento com mais tranquilidade.</p>" +
      "<p><strong>WhatsApp informado:</strong> " +
      `${payload.whatsapp}<br />` +
      `<strong>Necessidade:</strong> ${needLine}</p>` +
      "<p>Se desejar, nossa equipe tambem pode ajudar pelo WhatsApp.</p>" +
      "<p>Dra. Jessica Barros</p>",
  };
}

function buildInternalNotification(payload) {
  return {
    subject: "Novo Contato Site - Dra Jessica | Guia Gratuita",
    text:
      "Nova solicitacao da guia gratuita pelo site.\n\n" +
      `Nome: ${payload.name}\n` +
      `E-mail: ${payload.email}\n` +
      `WhatsApp: ${payload.whatsapp}\n` +
      `Necessidade: ${payload.need || "Nao informado"}`,
    html:
      "<p>Nova solicitacao da guia gratuita pelo site.</p>" +
      `<p><strong>Nome:</strong> ${payload.name}<br />` +
      `<strong>E-mail:</strong> ${payload.email}<br />` +
      `<strong>WhatsApp:</strong> ${payload.whatsapp}<br />` +
      `<strong>Necessidade:</strong> ${payload.need || "Nao informado"}</p>`,
  };
}

export async function processLeadMagnetSubmission(rawPayload) {
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

  await fs.access(guidePath);

  const from = getRequiredEnv("RESEND_FROM");
  const replyTo = process.env.RESEND_REPLY_TO || from;
  const notifyTo = process.env.LEADMAGNET_NOTIFY_TO;
  const guideBuffer = await fs.readFile(guidePath);
  const attachment = {
    filename: "guia-rapido-consulta.pdf",
    content: guideBuffer,
    contentType: "application/pdf",
  };

  const patientMessage = buildPatientMessage(payload);

  await sendEmailOrThrow({
    from,
    to: payload.email,
    replyTo,
    subject: patientMessage.subject,
    text: patientMessage.text,
    html: patientMessage.html,
    attachments: [attachment],
  });

  if (notifyTo) {
    const internalMessage = buildInternalNotification(payload);

    await sendEmailOrThrow({
      from,
      to: notifyTo,
      replyTo: payload.email,
      subject: internalMessage.subject,
      text: internalMessage.text,
      html: internalMessage.html,
    });
  }

  return {
    ok: true,
    status: 200,
    body: {
      message: "Guia enviado com sucesso para o e-mail informado.",
    },
  };
}
