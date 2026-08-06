"use client";

import { FormEvent, useState } from "react";

export function ContactComposerSection() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <section className="py-16 md:py-24" id="contact">
      <div className="site-shell max-w-5xl text-center">
        <p className="mb-4 text-[11px] font-black uppercase tracking-[0.2em] text-[var(--red)]">
          New Commit Interface
        </p>
        <h2 className="balanced text-[clamp(2.15rem,6vw,4.25rem)] font-black tracking-[-0.035em]">
          Initialize Collaboration
        </h2>
        <p className="mx-auto mt-6 max-w-2xl pretty text-base leading-7 text-[var(--muted)]">
          Query availability for high-capacity technical partnerships and digital
          infrastructure design. One reply, from me, within 48 hours.
        </p>
        <p className="mt-5 text-[clamp(0.95rem,2vw,1.15rem)] tracking-[-0.01em]">
          <a
            href="mailto:hello@taherhussain.com"
            className="border-b border-[var(--red)] pb-1 text-[var(--text)] transition hover:text-[var(--red)]"
          >
            hello@taherhussain.com
          </a>
        </p>

        <form
          className="panel mx-auto mt-10 max-w-3xl overflow-hidden text-left md:mt-12"
          onSubmit={handleSubmit}
        >
          <div className="flex h-12 items-center justify-between border-b hairline px-5 text-[11px] uppercase tracking-[0.16em] text-[var(--dim)]">
            <span>new_message.txt</span>
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 bg-[#20c56b]" />
              secure
            </span>
          </div>
          <div className="space-y-5 p-6 md:p-8">
            <label className="grid gap-2.5 text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
              <span>Name</span>
              <input
                name="name"
                type="text"
                autoComplete="name"
                required
                className="h-12 border border-white/8 bg-[#121212] px-4 text-base text-[var(--text)] outline-none transition placeholder:text-[#7b8490] focus:border-[var(--blue-border)]"
                placeholder="Your name"
              />
            </label>
            <label className="grid gap-2.5 text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
              <span>Email</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="h-12 border border-white/8 bg-[#121212] px-4 text-base text-[var(--text)] outline-none transition placeholder:text-[#7b8490] focus:border-[var(--blue-border)]"
                placeholder="you@example.com"
              />
            </label>
            <label className="grid gap-2.5 text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
              <span>Subject</span>
              <input
                name="subject"
                type="text"
                required
                className="h-12 border border-white/8 bg-[#121212] px-4 text-base text-[var(--text)] outline-none transition placeholder:text-[#7b8490] focus:border-[var(--blue-border)]"
                placeholder="Project scope or technical requirement"
              />
            </label>
            <label className="grid gap-3 text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
              <span>Message</span>
              <textarea
                name="message"
                required
                rows={7}
                className="resize-y border border-white/8 bg-[#121212] p-4 text-base leading-7 text-[var(--text)] outline-none transition placeholder:text-[#7b8490] focus:border-[var(--blue-border)]"
                placeholder="Define project context, timeline, and operating requirements."
              />
            </label>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t hairline p-5 md:p-6">
            <span
              role={sent ? "status" : undefined}
              className={
                sent
                  ? "text-[11px] uppercase tracking-[0.16em] text-[#20c56b]"
                  : "text-[11px] uppercase tracking-[0.16em] text-[var(--dim)]"
              }
            >
              {sent ? "Message committed, response within 48h" : "Encrypted / Direct"}
            </span>
            <button
              type="submit"
              className="min-h-12 bg-[var(--red)] px-7 text-[11px] font-black uppercase tracking-[0.18em] text-white transition hover:bg-[#9e1c1c] focus:outline-none focus:ring-2 focus:ring-[var(--blue-border)] focus:ring-offset-2 focus:ring-offset-[#060606]"
            >
              Send Request
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
