import { BackLink } from "@/components/ui/Primitives";

export default function PostNotFound() { return <main className="site-shell grid min-h-screen place-items-center py-24"><div><p className="text-sm font-bold text-[var(--accent)]">Article not found</p><h1 className="mt-4 text-5xl font-black tracking-[-0.04em]">This note is not in the archive.</h1><div className="mt-10"><BackLink href="/blog">Return to writing</BackLink></div></div></main>; }
