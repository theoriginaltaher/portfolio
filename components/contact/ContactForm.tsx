"use client";

import { useState } from "react";

type Fields = { name: string; email: string; subject: string; message: string };
type FormStatus = "idle" | "submitting" | "success" | "error";
const initialFields: Fields = { name: "", email: "", subject: "", message: "" };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const update = (key: keyof Fields, value: string) => { setFields((current) => ({ ...current, [key]: value })); setErrors((current) => ({ ...current, [key]: undefined })); };
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof Fields, string>> = {};
    (Object.keys(fields) as (keyof Fields)[]).forEach((key) => { if (!fields[key].trim()) nextErrors[key] = "This field is required."; });
    if (fields.email && !emailPattern.test(fields.email)) nextErrors.email = "Enter a valid email address.";
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); return; }
    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(fields) });
      if (!response.ok) throw new Error("Request failed");
      setFields(initialFields); setStatus("success");
    } catch { setStatus("error"); }
  };

  const inputClass = "mt-2 min-h-12 w-full border border-[var(--border-strong)] bg-transparent px-4 text-base text-[var(--text)] outline-none transition-colors focus:border-[var(--accent)]";
  return <form onSubmit={submit} noValidate className="space-y-6" aria-label="Contact form">
    {(["name", "email", "subject"] as const).map((key) => <div key={key}><label htmlFor={key} className="text-sm font-bold capitalize">{key}</label><input id={key} name={key} type={key === "email" ? "email" : "text"} value={fields[key]} onChange={(event) => update(key, event.target.value)} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `${key}-error` : undefined} className={inputClass} />{errors[key] ? <p id={`${key}-error`} className="mt-2 text-sm text-red-400">{errors[key]}</p> : null}</div>)}
    <div><label htmlFor="message" className="text-sm font-bold">Message</label><textarea id="message" name="message" rows={7} value={fields.message} onChange={(event) => update("message", event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} className={`${inputClass} py-3`} />{errors.message ? <p id="message-error" className="mt-2 text-sm text-red-400">{errors.message}</p> : null}</div>
    <button type="submit" disabled={status === "submitting"} className="min-h-12 bg-[var(--accent)] px-7 font-bold text-[#0d0d0d] transition-colors hover:bg-[var(--accent-strong)] disabled:cursor-wait disabled:opacity-60">{status === "submitting" ? "Sending…" : "Send message"}</button>
    <div aria-live="polite">{status === "success" ? <p className="text-sm font-bold text-[var(--accent)]">Message sent. I&apos;ll be in touch soon.</p> : null}{status === "error" ? <p className="text-sm text-red-400">Something went wrong. Please try again or email directly.</p> : null}</div>
  </form>;
}
