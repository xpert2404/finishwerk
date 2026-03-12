"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(
          body.error || "Nachricht konnte nicht gesendet werden.",
        );
      }

      setState("success");
      form.reset();
    } catch (err) {
      setState("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Ein unerwarteter Fehler ist aufgetreten.",
      );
    }
  }

  if (state === "success") {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(74,222,128,0.1)]">
          <CheckCircle2 className="h-7 w-7 text-[var(--success)]" />
        </div>
        <div className="space-y-2">
          <p className="font-display text-xl font-semibold text-white">
            Nachricht gesendet!
          </p>
          <p className="text-sm text-[var(--muted-strong)]">
            Wir melden uns innerhalb von 24 Stunden bei Ihnen.
          </p>
        </div>
        <button
          onClick={() => setState("idle")}
          className="mt-2 text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-strong)]"
        >
          Weitere Nachricht senden
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-sm font-medium text-[var(--muted-strong)]"
          >
            Name *
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Max Mustermann"
            className="form-input"
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-sm font-medium text-[var(--muted-strong)]"
          >
            E-Mail *
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="max@beispiel.de"
            className="form-input"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-phone"
          className="mb-1.5 block text-sm font-medium text-[var(--muted-strong)]"
        >
          Telefon <span className="text-[var(--muted)]">(optional)</span>
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+49 172 ..."
          className="form-input"
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-sm font-medium text-[var(--muted-strong)]"
        >
          Nachricht *
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Erzählen Sie uns kurz von Ihrem Projekt..."
          className="form-input"
        />
      </div>

      {state === "error" && (
        <div className="form-message form-message-error flex items-start gap-2">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className={cn(
          "inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--accent-border)] bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(0,0,0,0.35)] transition-all duration-200 sm:w-auto sm:min-w-[14rem]",
          state === "submitting"
            ? "cursor-not-allowed opacity-70"
            : "hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_22px_55px_rgba(0,0,0,0.44)]",
        )}
      >
        {state === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Wird gesendet…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Nachricht senden
          </>
        )}
      </button>

      <p className="text-xs text-[var(--muted)]">
        Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten gemäß unserer{" "}
        <a href="/datenschutz" className="underline hover:text-white">
          Datenschutzerklärung
        </a>{" "}
        zu.
      </p>
    </form>
  );
}
