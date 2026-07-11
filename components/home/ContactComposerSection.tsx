export function ContactComposerSection() {
  return (
    <section className="py-24 md:py-32" id="contact">
      <div className="site-shell max-w-5xl text-center">
        <p className="mb-4 text-[11px] font-black uppercase tracking-[0.2em] text-[var(--red)]">
          New Commit Interface
        </p>
        <h2 className="balanced text-5xl font-black tracking-[-0.045em] md:text-7xl">
          Initialize Collaboration
        </h2>
        <p className="mx-auto mt-6 max-w-2xl pretty text-base leading-7 text-[var(--muted)]">
          Query availability for high-capacity technical partnerships and digital
          infrastructure design.
        </p>

        <form className="panel mx-auto mt-16 max-w-3xl overflow-hidden text-left">
          <div className="flex h-12 items-center justify-between border-b hairline px-5 text-[11px] uppercase tracking-[0.16em] text-[var(--dim)]">
            <span>new_message.txt</span>
            <span>secure</span>
          </div>
          <div className="space-y-5 p-6 md:p-8">
            <label className="grid gap-3 text-xs uppercase tracking-[0.14em] text-[var(--muted)] md:grid-cols-[120px_1fr] md:items-center">
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
            <label className="grid gap-3 text-xs uppercase tracking-[0.14em] text-[var(--muted)] md:grid-cols-[120px_1fr] md:items-center">
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
            <label className="grid gap-3 text-xs uppercase tracking-[0.14em] text-[var(--muted)] md:grid-cols-[120px_1fr] md:items-center">
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
          <div className="flex items-center justify-end border-t hairline p-6">
            <button
              type="submit"
              className="h-11 bg-[var(--red)] px-7 text-[11px] font-black uppercase tracking-[0.18em] text-white transition hover:bg-[#9e1c1c] focus:outline-none focus:ring-2 focus:ring-[var(--blue-border)] focus:ring-offset-2 focus:ring-offset-[#060606]"
            >
              Send Request
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
