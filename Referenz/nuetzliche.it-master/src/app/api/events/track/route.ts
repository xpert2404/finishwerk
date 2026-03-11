import {NextResponse} from "next/server";
import type {AnalyticsEvent} from "@/lib/events";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as AnalyticsEvent | null;

  if (!body || !body.name) {
    return NextResponse.json({ok: false, error: "invalid_event"}, {status: 400});
  }

  console.info("[analytics-event]", JSON.stringify(body));
  return NextResponse.json({ok: true}, {status: 202});
}