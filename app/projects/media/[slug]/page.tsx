import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageFrame } from "@/components/pages/PageFrame";
import { getMediaAlbum, mediaAlbums } from "@/src/data/media-albums";

export function generateStaticParams() {
  return mediaAlbums.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const album = getMediaAlbum(params.slug);
  return { title: album ? `${album.title} | Media Gallery` : "Album not found" };
}

export default function MediaAlbumPage({ params }: { params: { slug: string } }) {
  const album = getMediaAlbum(params.slug);
  if (!album) notFound();

  const index = mediaAlbums.findIndex(({ slug }) => slug === album.slug);
  const previous = mediaAlbums[(index - 1 + mediaAlbums.length) % mediaAlbums.length];
  const next = mediaAlbums[(index + 1) % mediaAlbums.length];

  return (
    <PageFrame>
      <main className="min-h-screen bg-[var(--background)] pt-14">
        <header className="site-shell max-w-[1440px] py-12 sm:py-16 lg:py-20">
          <Link
            href="/projects/media"
            className="text-[10px] font-bold uppercase tracking-[.15em] text-[var(--dim)] transition hover:text-[var(--text)]"
          >
            ← Media gallery
          </Link>
          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(260px,.38fr)] lg:items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.18em] text-[var(--red)]">
                {album.category}
              </p>
              <h1 className="balanced mt-5 text-[clamp(3rem,6vw,5.5rem)] font-black leading-[.9] tracking-[-.04em]">
                {album.title}
              </h1>
            </div>
            <div className="border-t border-white/8 pt-4">
              <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[var(--blue-quiet)]">
                {album.date}
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                {album.description}
              </p>
            </div>
          </div>
        </header>

        <section className="site-shell max-w-[1440px] border-y border-white/8 py-3 sm:py-5">
          <div className="relative aspect-[16/8] min-h-[260px] overflow-hidden bg-[var(--panel)]">
            <Image
              src={album.coverImage}
              alt={album.coverAlt}
              fill
              priority
              sizes="(min-width: 1280px) 1440px, 100vw"
              className="object-cover"
            />
          </div>
        </section>

        <section className="site-shell max-w-[1440px] py-12 sm:py-16 lg:py-20">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {album.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-white/8 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.1em] text-[var(--dim)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[var(--dim)]">
              {album.mediaCount} selected {album.category === "Video" ? "films" : "frames"}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {album.items.map((item, itemIndex) => (
              <figure
                key={`${item.src}-${itemIndex}`}
                className={`relative overflow-hidden bg-[var(--panel)] ${item.featured ? "sm:col-span-2 xl:col-span-2" : ""}`}
              >
                <div className={`relative ${item.featured ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                  {item.type === "video" ? (
                    <iframe
                      src={item.src}
                      title={item.alt}
                      loading="lazy"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full border-0"
                    />
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1280px) 45vw, (min-width:640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  )}
                </div>
                {item.title ? (
                  <figcaption className="flex items-center justify-between gap-4 border-t border-white/8 px-4 py-3 text-[10px] font-bold uppercase tracking-[.13em] text-[var(--muted)]">
                    <span>{item.title}</span>
                    {item.sourceUrl ? <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="shrink-0 text-[var(--blue-quiet)] transition hover:text-[var(--text)]">Open source ↗</a> : null}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </section>

        <section className="site-shell max-w-[1440px] pb-12 sm:pb-16 lg:pb-20">
          <a href={album.sourceFolderUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between border-y border-white/8 py-5 text-sm font-bold transition hover:border-[var(--border-strong)] hover:text-[var(--blue-quiet)]">
            <span>View the full collection on Google Drive</span>
            <span aria-hidden="true">↗</span>
          </a>
        </section>

        <nav
          className="site-shell grid max-w-[1440px] gap-px border-t border-[var(--border)] bg-[var(--border)] sm:grid-cols-2"
          aria-label="Album navigation"
        >
          <Link
            href={`/projects/media/${previous.slug}`}
            className="bg-[var(--background)] p-6 transition hover:bg-[var(--panel)]"
          >
            <span className="text-[10px] font-bold uppercase tracking-[.14em] text-[var(--dim)]">
              ← Previous album
            </span>
            <span className="mt-2 block text-xl font-black">{previous.title}</span>
          </Link>
          <Link
            href={`/projects/media/${next.slug}`}
            className="bg-[var(--background)] p-6 text-right transition hover:bg-[var(--panel)]"
          >
            <span className="text-[10px] font-bold uppercase tracking-[.14em] text-[var(--dim)]">
              Next album →
            </span>
            <span className="mt-2 block text-xl font-black">{next.title}</span>
          </Link>
        </nav>
      </main>
    </PageFrame>
  );
}
