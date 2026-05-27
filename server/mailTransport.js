import { Resend } from "resend";

export function getRequiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function createMailClient() {
  const apiKey = getRequiredEnv("RESEND_API_KEY");

  return new Resend(apiKey);
}

export async function sendEmailOrThrow(payload) {
  const client = createMailClient();
  const { data, error } = await client.emails.send(payload);

  if (error) {
    throw new Error(error.message || "Resend email request failed.");
  }

  return data;
}
