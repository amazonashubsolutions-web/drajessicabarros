import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { processLeadMagnetSubmission } from "./server/leadMagnetMailer.js";

function leadMagnetApiPlugin() {
  return {
    name: "lead-magnet-api-plugin",
    configureServer(server) {
      server.middlewares.use("/api/send-leadmagnet", async (req, res, next) => {
        if (req.method !== "POST") {
          next();
          return;
        }

        try {
          const chunks = [];

          for await (const chunk of req) {
            chunks.push(chunk);
          }

          const rawBody = Buffer.concat(chunks).toString("utf8");
          const payload = rawBody ? JSON.parse(rawBody) : {};
          const result = await processLeadMagnetSubmission(payload);

          res.statusCode = result.status;
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          res.end(JSON.stringify(result.body));
        } catch (error) {
          console.error("Lead magnet dev API error:", error);
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          res.end(
            JSON.stringify({
              message: "Nao foi possivel enviar o guia por e-mail no momento.",
            }),
          );
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), leadMagnetApiPlugin()],
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});
