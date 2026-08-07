import { Resend } from "resend";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] || character);
}

export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); } catch { return Response.json({ error: "Invalid request." }, { status: 400 }); }
  if (!body || typeof body !== "object") return Response.json({ error: "Invalid request." }, { status: 400 });
  const { name, email, subject, message } = body as Record<string, unknown>;
  if (![name, email, subject, message].every((value) => typeof value === "string" && value.trim()) || !emailPattern.test(String(email))) return Response.json({ error: "Please complete every field with a valid email address." }, { status: 400 });
  if (String(name).length > 120 || String(subject).length > 200 || String(message).length > 10000) return Response.json({ error: "One or more fields are too long." }, { status: 400 });
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  if (!apiKey || !to) return Response.json({ error: "Email delivery is not configured." }, { status: 503 });
  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
      to,
      replyTo: String(email),
      subject: `Portfolio enquiry: ${String(subject)}`,
      html: `<p><strong>From:</strong> ${escapeHtml(String(name))} (${escapeHtml(String(email))})</p><p>${escapeHtml(String(message)).replace(/\n/g, "<br>")}</p>`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    if (error) throw error;
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact email failed", error);
    return Response.json({ error: "Failed to send." }, { status: 500 });
  }
}
