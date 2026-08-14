import Image from "next/image";
import Link from "next/link";
import type { MediaAlbum } from "@/src/data/media-albums";

export function AlbumCard({ album }: { album: MediaAlbum }) {
  return <article className="interactive-lift group border border-[var(--border)] bg-[var(--panel-muted)] hover:border-[var(--border-strong)]">
    <Link href={`/projects/media/${album.slug}`} className="block">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0b0b0b]">
        <Image src={album.coverImage} alt={album.coverAlt} fill sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover saturate-[0.78] transition duration-500 group-hover:scale-[1.015] group-hover:saturate-100" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(6,6,6,.72))]" />
        <p className="absolute bottom-4 left-5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/76">{album.mediaCount} selected {album.category === "Video" ? "films" : "frames"}</p>
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4"><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--blue-quiet)]">{album.category}</p><span className="arrow-shift shrink-0 text-sm text-[var(--dim)]">↗</span></div>
        <h2 className="balanced mt-4 text-[clamp(1.5rem,2.5vw,2.15rem)] font-black leading-[.98] tracking-[-.035em]">{album.title}</h2>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{album.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">{album.tags.map((tag) => <span key={tag} className="border border-white/8 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.1em] text-[var(--dim)]">{tag}</span>)}</div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-white/8 pt-4 text-[10px] font-bold uppercase tracking-[.13em]"><span className="text-[var(--dim)]">{album.date}</span><span className="text-[var(--red)]">View album</span></div>
      </div>
    </Link>
  </article>;
}
