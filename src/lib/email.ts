import "server-only";

/** Application delivery settings. Every value must be present for the form to accept submissions. */
export function emailConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.APPLICATION_TO_EMAIL;
  const from = process.env.APPLICATION_FROM_EMAIL;
  if (!apiKey || !to || !from) return null;
  return { apiKey, from, to: to.split(",").map((s) => s.trim()).filter(Boolean) };
}
