import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-3xl font-semibold text-[var(--ink-primary)]">Seite nicht gefunden</h1>
      <p className="text-sm text-slate-600">The requested page could not be found.</p>
      <Link href="/de" className="rounded-full bg-[var(--accent-current)] px-5 py-2 text-sm font-medium text-white">
        Zur Startseite
      </Link>
    </main>
  );
}
