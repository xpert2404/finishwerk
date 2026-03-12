import { NextResponse } from "next/server";

/* ───────────────────────────────────────────────
   Contact form API route.

   Configure SMTP via environment variables:
     SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL

   Without SMTP env vars this route still works — it validates
   the input and logs a successful receipt but can't send email.
   ─────────────────────────────────────────────── */

const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5;
const ipHits = new Map<string, { count: number; reset: number }>();

function rateLimit(ip: string): boolean {
    const now = Date.now();
    const entry = ipHits.get(ip);

    if (!entry || now > entry.reset) {
        ipHits.set(ip, { count: 1, reset: now + RATE_LIMIT_WINDOW });
        return true;
    }

    if (entry.count >= RATE_LIMIT_MAX) return false;
    entry.count++;
    return true;
}

function sanitize(value: unknown): string {
    if (typeof value !== "string") return "";
    return value.trim().slice(0, 5000);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
    // Basic rate limiting by IP
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";
    if (!rateLimit(ip)) {
        return NextResponse.json(
            { error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." },
            { status: 429 },
        );
    }

    let body: Record<string, unknown>;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { error: "Ungültige Anfrage." },
            { status: 400 },
        );
    }

    const name = sanitize(body.name);
    const email = sanitize(body.email);
    const phone = sanitize(body.phone);
    const message = sanitize(body.message);

    // Validate required fields
    if (!name || !email || !message) {
        return NextResponse.json(
            { error: "Bitte füllen Sie alle Pflichtfelder aus." },
            { status: 400 },
        );
    }

    if (!EMAIL_RE.test(email)) {
        return NextResponse.json(
            { error: "Bitte geben Sie eine gültige E-Mail-Adresse ein." },
            { status: 400 },
        );
    }

    // Check for SMTP configuration
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const contactEmail = process.env.CONTACT_EMAIL || "kontakt@finishwerk.de";

    if (smtpHost && smtpUser && smtpPass) {
        try {
            // Dynamic import to avoid bundling nodemailer when not used
            const nodemailer = await import("nodemailer");
            const transporter = nodemailer.createTransport({
                host: smtpHost,
                port: smtpPort,
                secure: smtpPort === 465,
                auth: { user: smtpUser, pass: smtpPass },
            });

            await transporter.sendMail({
                from: `"FinishWerk Kontakt" <${smtpUser}>`,
                replyTo: `"${name}" <${email}>`,
                to: contactEmail,
                subject: `Neue Kontaktanfrage von ${name}`,
                text: [
                    `Name: ${name}`,
                    `E-Mail: ${email}`,
                    phone ? `Telefon: ${phone}` : null,
                    ``,
                    `Nachricht:`,
                    message,
                ]
                    .filter(Boolean)
                    .join("\n"),
                html: `
          <div style="font-family: sans-serif; max-width: 600px;">
            <h2 style="color: #3b82f6;">Neue Kontaktanfrage</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #666;">Name</td><td style="padding: 8px 0;">${escapeHtml(name)}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">E-Mail</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
              ${phone ? `<tr><td style="padding: 8px 0; color: #666;">Telefon</td><td style="padding: 8px 0;"><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></td></tr>` : ""}
            </table>
            <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
            <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
        `,
            });
        } catch (err) {
            console.error("SMTP send failed:", err);
            return NextResponse.json(
                { error: "E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es erneut." },
                { status: 500 },
            );
        }
    } else {
        // No SMTP: log the contact for manual follow-up
        console.log("──── New contact form submission ────");
        console.log(`Name: ${name}`);
        console.log(`Email: ${email}`);
        if (phone) console.log(`Phone: ${phone}`);
        console.log(`Message: ${message}`);
        console.log("────────────────────────────────────");
        console.log(
            "⚠️  SMTP not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS env vars to enable email delivery.",
        );
    }

    return NextResponse.json({ success: true });
}

function escapeHtml(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}
