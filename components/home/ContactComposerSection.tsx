"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";
type Fields = "name" | "email" | "subject" | "message";
type FieldErrors = Partial<Record<Fields, string>>;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactComposerSection({ email }: { email: string }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const fields = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      subject: String(data.get("subject") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };
    const nextErrors: FieldErrors = {};
    (Object.keys(fields) as Fields[]).forEach((field) => {
      if (!fields[field]) nextErrors[field] = "This field is required.";
    });
    if (fields.email && !emailPattern.test(fields.email)) nextErrors.email = "Enter a valid email address.";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setStatus("idle");
      return;
    }
    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      if (!response.ok) throw new Error("Message delivery failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="py-16 md:py-24" id="contact">
      <div className="site-shell max-w-[1440px] text-center">
        <p className="mb-4 text-[11px] font-black uppercase tracking-[0.2em] text-[var(--red)]">
          New Commit Interface
        </p>
        <h2 className="balanced text-[clamp(2.15rem,6vw,4.25rem)] font-black tracking-[-0.035em]">
          Initialize Collaboration
        </h2>
        <p className="mx-auto mt-6 max-w-2xl pretty text-base leading-7 text-[var(--muted)]">
          For AI workflows, media production, storytelling, web systems, and digital
          operations. One reply, from me, within 48 hours.
        </p>
        <p className="mt-5 text-[clamp(0.95rem,2vw,1.15rem)] tracking-[-0.01em]">
          <a
            href={`mailto:${email}`}
            className="border-b border-[var(--red)] pb-1 text-[var(--text)] transition hover:text-[var(--red)]"
          >
            {email}
          </a>
        </p>

        <form
          className="panel mx-auto mt-10 max-w-4xl overflow-hidden text-left md:mt-12"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="flex h-12 items-center justify-between border-b hairline px-5 text-[11px] uppercase tracking-[0.16em] text-[var(--dim)]">
            <span>New message</span>
            <span>Direct contact</span>
          </div>
          <div className="space-y-5 p-4 sm:p-6 md:p-8">
            <label className="grid gap-2.5 text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
              <span>Name</span>
              <input
                name="name"
                type="text"
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                onChange={() => setErrors((current) => ({ ...current, name: undefined }))}
                className="motion-input h-12 border border-white/8 bg-[#121212] px-4 text-base text-[var(--text)] outline-none placeholder:text-[#7b8490] focus:border-[var(--blue-border)]"
                placeholder="Your name"
              />
              {errors.name ? <span id="name-error" className="normal-case tracking-normal text-red-400">{errors.name}</span> : null}
            </label>
            <label className="grid gap-2.5 text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
              <span>Email</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                onChange={() => setErrors((current) => ({ ...current, email: undefined }))}
                className="motion-input h-12 border border-white/8 bg-[#121212] px-4 text-base text-[var(--text)] outline-none placeholder:text-[#7b8490] focus:border-[var(--blue-border)]"
                placeholder="you@example.com"
              />
              {errors.email ? <span id="email-error" className="normal-case tracking-normal text-red-400">{errors.email}</span> : null}
            </label>
            <label className="grid gap-2.5 text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
              <span>Subject</span>
              <input
                name="subject"
                type="text"
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? "subject-error" : undefined}
                onChange={() => setErrors((current) => ({ ...current, subject: undefined }))}
                className="motion-input h-12 border border-white/8 bg-[#121212] px-4 text-base text-[var(--text)] outline-none placeholder:text-[#7b8490] focus:border-[var(--blue-border)]"
                placeholder="Project scope or technical requirement"
              />
              {errors.subject ? <span id="subject-error" className="normal-case tracking-normal text-red-400">{errors.subject}</span> : null}
            </label>
            <label className="grid gap-3 text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
              <span>Message</span>
              <textarea
                name="message"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                onChange={() => setErrors((current) => ({ ...current, message: undefined }))}
                rows={5}
                className="motion-input resize-y border border-white/8 bg-[#121212] p-4 text-base leading-7 text-[var(--text)] outline-none placeholder:text-[#7b8490] focus:border-[var(--blue-border)]"
                placeholder="Define project context, timeline, and operating requirements."
              />
              {errors.message ? <span id="message-error" className="normal-case tracking-normal text-red-400">{errors.message}</span> : null}
            </label>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t hairline p-5 md:p-6">
            <span
              key={status}
              role={status === "success" || status === "error" ? "status" : undefined}
              className={
                status === "success"
                  ? "feedback-enter text-[11px] uppercase tracking-[0.16em] text-[#20c56b]"
                  : status === "error"
                    ? "feedback-enter text-[11px] uppercase tracking-[0.16em] text-red-400"
                  : "feedback-enter text-[11px] uppercase tracking-[0.16em] text-[var(--dim)]"
              }
            >
              {status === "success"
                ? "Message committed, response within 48h"
                : status === "error"
                  ? "Delivery unavailable, email directly"
                  : status === "submitting"
                    ? "Transmitting request"
                    : "Direct contact"}
            </span>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="pressable min-h-12 bg-[var(--red)] px-7 text-[11px] font-black uppercase tracking-[0.18em] text-white hover:bg-[#9e1c1c] focus:outline-none focus:ring-2 focus:ring-[var(--blue-border)] focus:ring-offset-2 focus:ring-offset-[#060606] disabled:cursor-wait disabled:opacity-60"
            >
              {status === "submitting" ? "Sending" : "Send Request"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
