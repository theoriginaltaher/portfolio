import { BackLink } from "@/components/ui/Primitives";

export default function ProjectNotFound() { return <main className="site-shell grid min-h-screen place-items-center py-24"><div><p className="text-sm font-bold text-[var(--accent)]">Project not found</p><h1 className="mt-4 text-5xl font-black tracking-[-0.04em]">This project is not in the archive.</h1><div className="mt-10"><BackLink href="/projects">Return to projects</BackLink></div></div></main>; }
