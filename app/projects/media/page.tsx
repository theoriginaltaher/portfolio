import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/pages/PageFrame";
import { AlbumBrowser } from "@/components/projects/AlbumBrowser";
import { getMediaAlbums } from "@/src/lib/content";

export const metadata: Metadata = { title: "Media Gallery | Taher Hussain", description: "Photography, films, and graphic design by Taher Hussain. Explore event collections and view the work in full." };
export const revalidate = 60;

export default async function MediaPage() {
  const albums = await getMediaAlbums();
  return <PageFrame><main className="portfolio-page">
    <header className="site-shell archive-header">
      <Link href="/projects" className="archive-back">← Project index</Link>
      <div className="archive-heading"><h1>Media<br /><span>Gallery</span></h1><div><p>On the field. Behind the lens.<br />Across the screen.</p><p className="archive-intro">Photography, films, and graphic design. Explore the people, places, and campaigns in each collection.</p><Link href="/projects/systems" className="archive-crosslink">Explore Digital Systems ↗</Link></div></div>
    </header>
    <section className="site-shell archive-content" aria-label="Media collections"><AlbumBrowser albums={albums} /></section>
  </main></PageFrame>;
}
