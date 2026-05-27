import { processContactSubmission } from "../server/contactMailer.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed." });
    return;
  }

  try {
    const payload =
      typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

    const result = await processContactSubmission(payload);

    res.status(result.status).json(result.body);
  } catch (error) {
    console.error("Contact email error:", error);
    res.status(500).json({
      message: "Nao foi possivel enviar a mensagem no momento.",
    });
  }
}
