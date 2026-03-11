"use client";

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {contactSchema, type ContactFields} from "@/lib/validation";
import {Link} from "@/i18n/navigation";
import {trackCTA, trackLead} from "@/lib/analytics";

interface ContactFormLabels {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  submit: string;
  success: string;
  honeypot: string;
  responseTime: string;
  submitError: string;
  privacyPrefix: string;
  privacyLinkLabel: string;
  submitting: string;
}

interface ContactFormProps {
  labels: ContactFormLabels;
  successHref: string;
}

export function ContactForm({labels, successHref}: ContactFormProps) {
  const [values, setValues] = useState<ContactFields>({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
    websiteHoney: ""
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFields, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function updateField<K extends keyof ContactFields>(field: K, value: ContactFields[K]) {
    setValues((prev) => ({...prev, [field]: value}));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    const result = contactSchema.safeParse(values);

    if (values.websiteHoney && values.websiteHoney.length > 0) {
      setErrors({websiteHoney: "Spam erkannt"});
      return;
    }

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        company: fieldErrors.company?.[0],
        email: fieldErrors.email?.[0],
        phone: fieldErrors.phone?.[0],
        message: fieldErrors.message?.[0],
        websiteHoney: fieldErrors.websiteHoney?.[0]
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/forms/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          values,
          context: {
            pagePath: window.location.pathname,
            pageTitle: document.title,
            referrer: document.referrer || undefined
          }
        })
      });

      if (!response.ok) {
        throw new Error("Contact form submission failed");
      }

      trackCTA({ctaId: "contact_form_submit", position: "contact_form"});
      trackLead({method: "form", formId: "contact_form"});
      window.location.assign(`${successHref}?source=form`);
    } catch {
      setSubmitError(labels.submitError);
    } finally {
      setIsSubmitting(false);
    }
  }

  function fieldErrorId(field: keyof ContactFields) {
    return `${field}-error`;
  }

  return (
    <form onSubmit={onSubmit} noValidate className="surface-card h-full space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">{labels.name}</Label>
          <Input
            id="name"
            className="h-11 rounded-xl"
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? fieldErrorId("name") : undefined}
            required
          />
          {errors.name ? <p id={fieldErrorId("name")} className="text-xs text-red-600">{errors.name}</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">{labels.company}</Label>
          <Input
            id="company"
            className="h-11 rounded-xl"
            value={values.company}
            onChange={(event) => updateField("company", event.target.value)}
            autoComplete="organization"
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? fieldErrorId("company") : undefined}
            required
          />
          {errors.company ? <p id={fieldErrorId("company")} className="text-xs text-red-600">{errors.company}</p> : null}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">{labels.email}</Label>
          <Input
            id="email"
            type="email"
            className="h-11 rounded-xl"
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? fieldErrorId("email") : undefined}
            required
          />
          {errors.email ? <p id={fieldErrorId("email")} className="text-xs text-red-600">{errors.email}</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">{labels.phone}</Label>
          <Input id="phone" className="h-11 rounded-xl" value={values.phone ?? ""} onChange={(event) => updateField("phone", event.target.value)} autoComplete="tel" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">{labels.message}</Label>
        <Textarea
          id="message"
          className="min-h-[112px] rounded-xl"
          rows={5}
          value={values.message}
          onChange={(event) => updateField("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? fieldErrorId("message") : undefined}
          required
        />
        {errors.message ? <p id={fieldErrorId("message")} className="text-xs text-red-600">{errors.message}</p> : null}
      </div>

      <div className="hidden">
        <Label htmlFor="websiteHoney">{labels.honeypot}</Label>
        <Input
          id="websiteHoney"
          className="h-11 rounded-xl"
          autoComplete="off"
          tabIndex={-1}
          value={values.websiteHoney ?? ""}
          onChange={(event) => updateField("websiteHoney", event.target.value)}
        />
      </div>

      <div className="space-y-2 pt-1">
        <Button type="submit" disabled={isSubmitting} className="rounded-full bg-[var(--accent-current)] px-6 text-white hover:bg-[var(--accent-current)]/90 disabled:cursor-wait disabled:opacity-80">
          {isSubmitting ? labels.submitting : labels.submit}
        </Button>
        <p className="text-sm text-slate-500">
          {labels.responseTime} {labels.privacyPrefix} <Link href="/privacy-policy" className="underline underline-offset-4">{labels.privacyLinkLabel}</Link>
        </p>
        {submitError ? <p role="alert" className="text-sm text-red-700">{submitError}</p> : null}
      </div>
    </form>
  );
}
