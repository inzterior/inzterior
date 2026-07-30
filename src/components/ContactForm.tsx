"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
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
      setStatus({ message: "Please fill in your name, email, and project details.", ok: false });
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
      setStatus({ message: "Thanks — we've got your enquiry and will be in touch soon.", ok: true });
    } catch (err) {
      setStatus({
        message:
          err instanceof Error
            ? err.message
            : "Something went wrong. Please email inquiry@inzterior.com directly.",
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
            Name
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
            Email
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
            Phone (optional)
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
            Project Type
          </label>
          <select
            id="project-type"
            name="project-type"
            className="w-full border border-neutral-300 px-3 py-2.5 text-sm"
          >
            <option value="">Select one</option>
            <option value="Residential — Full Home">Residential — Full Home</option>
            <option value="Residential — Single Room">Residential — Single Room</option>
            <option value="Commercial / Office">Commercial / Office</option>
            <option value="Renovation">Renovation</option>
            <option value="Consultation Only">Consultation Only</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-xs uppercase tracking-wide">
          Tell us about your space
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Location, size, budget range, timeline, and what you're hoping to achieve..."
          className="w-full border border-neutral-300 px-3 py-2.5 text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-fit rounded bg-neutral-900 px-6 py-3 text-xs uppercase tracking-wide text-white disabled:opacity-50"
      >
        {submitting ? "Sending..." : "Send Enquiry"}
      </button>

      {status && (
        <p className={`text-sm ${status.ok ? "text-emerald-700" : "text-red-700"}`}>
          {status.message}
        </p>
      )}
    </form>
  );
}
