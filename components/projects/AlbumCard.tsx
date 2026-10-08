import Link from "next/link";
import type { MediaAlbum } from "@/src/types/media";
import { MediaImage } from "./MediaImage";

export function AlbumCard({ album }: { album: MediaAlbum }) {
  return <article className="album-card group"><Link href={`/projects/media/${album.slug}`}>
    <div className="album-cover"><MediaImage src={album.coverImage} alt={album.coverAlt} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className={`${album.category === "Graphics & PR" ? "object-contain p-4" : "object-cover"} transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transform-none`} /><span className="album-count">{album.category === "Video" ? "▶ " : ""}{album.items.length} {album.category === "Video" ? (album.items.length === 1 ? "film" : "films") : (album.items.length === 1 ? "image" : "images")}</span></div>
    <div className="album-meta"><span>{album.category}</span><span>{album.date}</span></div>
    <h2>{album.title}<span aria-hidden="true">↗</span></h2>
    <p className="album-description">{album.description}</p>
  </Link></article>;
}
