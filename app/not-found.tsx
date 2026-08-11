import { PageFrame } from "@/components/pages/PageFrame";
import { BackLink } from "@/components/ui/Primitives";

export default function NotFound() { return <PageFrame><main className="site-shell grid min-h-[80svh] place-items-center py-24"><div><p className="text-sm font-bold text-[var(--accent)]">404</p><h1 className="mt-4 balanced text-5xl font-black tracking-[-0.04em] sm:text-7xl">We couldn&apos;t find that page.</h1><div className="mt-10"><BackLink href="/">Return home</BackLink></div></div></main></PageFrame>; }
