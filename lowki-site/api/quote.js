const DEFAULT_RECIPIENT = "chrismanth3y@gmail.com";

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const { RESEND_API_KEY, LOWKI_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !LOWKI_FROM_EMAIL) {
    return response.status(503).json({ error: "Quote email is not configured" });
  }

  const input = request.body ?? {};
  const fields = ["name", "email", "phone", "pickup", "delivery", "loadType", "details"];
  const quote = Object.fromEntries(
    fields.map((field) => [field, typeof input[field] === "string" ? input[field].trim().slice(0, 2000) : ""])
  );

  if (!quote.name || !quote.pickup || !quote.delivery || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(quote.email)) {
    return response.status(400).json({ error: "Please provide a name, valid email, pickup, and delivery location" });
  }

  const rows = [
    ["Name", quote.name],
    ["Email", quote.email],
    ["Phone", quote.phone || "Not provided"],
    ["Pickup", quote.pickup],
    ["Delivery", quote.delivery],
    ["Freight type", quote.loadType],
    ["Details", quote.details || "Not provided"],
  ];
  const html = rows.map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`).join("");

  try {
    const mail = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: LOWKI_FROM_EMAIL,
        to: [DEFAULT_RECIPIENT],
        reply_to: quote.email,
        subject: `Lowki Transport quote request — ${quote.loadType || "General freight"}`,
        html,
      }),
    });

    if (!mail.ok) {
      return response.status(502).json({ error: "Unable to send quote enquiry" });
    }

    return response.status(200).json({ ok: true });
  } catch {
    return response.status(502).json({ error: "Unable to send quote enquiry" });
  }
}
