"use client";

import Link from "next/link";

export default function ProjectsError({ reset }: { reset: () => void }) {
  return <main className="site-shell py-32"><h1 className="text-4xl font-bold">The collection couldn’t load.</h1><p className="my-6 text-[#aaa]">Please try again in a moment.</p><div className="flex flex-wrap gap-4"><button className="gallery-control" onClick={reset}>Try again</button><Link className="gallery-control" href="/">Return home</Link></div></main>;
}
