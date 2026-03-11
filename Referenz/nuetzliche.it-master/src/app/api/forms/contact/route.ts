import {NextResponse} from "next/server";
import {contactSchema} from "@/lib/validation";

interface ContactRequestBody {
  values?: unknown;
  context?: {
    pagePath?: string;
    pageTitle?: string;
    referrer?: string;
  };
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ContactRequestBody | null;
  const result = contactSchema.safeParse(body?.values);

  if (!result.success) {
    return NextResponse.json({ok: false, error: "validation_failed", issues: result.error.flatten().fieldErrors}, {status: 400});
  }

  if (result.data.websiteHoney && result.data.websiteHoney.length > 0) {
    return NextResponse.json({ok: false, error: "spam_detected"}, {status: 400});
  }

  const webhookUrl = process.env.CONTACT_FORM_WEBHOOK_URL?.trim();
  const payload = {
    ...result.data,
    submittedAt: new Date().toISOString(),
    context: body?.context ?? {}
  };

  if (webhookUrl) {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }).catch(() => null);

    if (!webhookResponse || !webhookResponse.ok) {
      return NextResponse.json({ok: false, error: "delivery_failed"}, {status: 502});
    }
  } else {
    console.info("[contact-form:no-webhook-configured]", JSON.stringify(payload));
  }

  return NextResponse.json({ok: true, deliveredToWebhook: Boolean(webhookUrl)});
}