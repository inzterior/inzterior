"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/i18n";

export default function ContactForm({ dict }: { dict: Dictionary["contactForm"] }) {
  const [status, setStatus] = useState<{ message: string; ok: boolean } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string)?.trim() ?? "";
    const email = (data.get("email") as string)?.trim() ?? "";
    const phone = (data.get("phone") as string)?.trim() ?? "";
    const projectType = (data.get("project-type") as string)?.trim() ?? "";
    const message = (data.get("message") as string)?.trim() ?? "";

    if (!name || !email || !message) {
      setStatus({ message: dict.errorRequired, ok: false });
      return;
    }

    setSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "Contact Form",
          name,
          email,
          phone,
          details: `Project type: ${projectType || "-"}\n\n${message}`,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Something went wrong.");
      }

      form.reset();
      setStatus({ message: dict.success, ok: true });
    } catch (err) {
      setStatus({
        message: err instanceof Error ? err.message : dict.errorGeneric,
        ok: false,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-xs uppercase tracking-wide">
            {dict.nameLabel}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full border border-neutral-300 px-3 py-2.5 text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-xs uppercase tracking-wide">
            {dict.emailLabel}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full border border-neutral-300 px-3 py-2.5 text-sm"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1 block text-xs uppercase tracking-wide">
            {dict.phoneLabel}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="w-full border border-neutral-300 px-3 py-2.5 text-sm"
          />
        </div>
        <div>
          <label htmlFor="project-type" className="mb-1 block text-xs uppercase tracking-wide">
            {dict.projectTypeLabel}
          </label>
          <select
            id="project-type"
            name="project-type"
            className="w-full border border-neutral-300 px-3 py-2.5 text-sm"
          >
            <option value="">{dict.selectOne}</option>
            <option value="Residential — Full Home">{dict.options.residentialFull}</option>
            <option value="Residential — Single Room">{dict.options.residentialSingle}</option>
            <option value="Commercial / Office">{dict.options.commercialOffice}</option>
            <option value="Renovation">{dict.options.renovation}</option>
            <option value="Consultation Only">{dict.options.consultationOnly}</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-xs uppercase tracking-wide">
          {dict.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={dict.messagePlaceholder}
          className="w-full border border-neutral-300 px-3 py-2.5 text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-fit rounded bg-neutral-900 px-6 py-3 text-xs uppercase tracking-wide text-white disabled:opacity-50"
      >
        {submitting ? dict.submitting : dict.submit}
      </button>

      {status && (
        <p className={`text-sm ${status.ok ? "text-emerald-700" : "text-red-700"}`}>
          {status.message}
        </p>
      )}
    </form>
  );
}
