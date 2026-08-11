import type { Metadata } from "next";
import Link from "next/link";
import { AlbumCard } from "@/components/projects/AlbumCard";
import { PageFrame } from "@/components/pages/PageFrame";
import { mediaAlbums } from "@/src/data/media-albums";

export const metadata: Metadata = {
  title: "Media Gallery | Taher Hussain",
  description: "Event albums, visual archives, and selected media work by Taher Hussain.",
};

export default function MediaPage() {
  return (
    <PageFrame>
      <main className="min-h-screen bg-[var(--background)] pt-14">
        <header className="border-b hairline">
          <div className="site-shell max-w-[1440px] py-16 sm:py-20 lg:py-24">
            <Link href="/projects" className="text-sm font-semibold text-[var(--dim)] transition hover:text-[var(--text)]">← Project index</Link>
            <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,.42fr)] lg:items-end">
              <div>
                <p className="text-sm font-semibold text-[var(--red)]">Media work</p>
                <h1 className="balanced mt-5 text-[clamp(3.25rem,7vw,6rem)] font-black leading-[.88] tracking-[-.04em]">Selected visual stories.</h1>
              </div>
              <p className="text-base leading-7 text-[var(--muted)]">A curated record of event coverage, photography, and production work. Each collection opens into an edited album with its own story.</p>
            </div>
          </div>
        </header>
        <section className="site-shell max-w-[1440px] py-12 sm:py-16 lg:py-20" aria-label="Media albums">
          <div className="mb-8 flex items-center justify-between border-b border-white/8 pb-4 text-sm text-[var(--dim)]"><span>Selected collections</span><span>{mediaAlbums.length} albums</span></div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{mediaAlbums.map((album) => <AlbumCard key={album.slug} album={album} />)}</div>
        </section>
      </main>
    </PageFrame>
  );
}
