import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageFrame } from "@/components/pages/PageFrame";
import { MediaGallery } from "@/components/projects/MediaGallery";
import { getMediaAlbum, getMediaAlbums } from "@/src/lib/content";

type Props = { params: Promise<{ slug: string }> };
export const revalidate = 60;
export async function generateStaticParams() { return (await getMediaAlbums()).map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const album = await getMediaAlbum((await params).slug);
  if (!album) return { title: "Album not found", robots: { index: false } };
  return { title: `${album.title} | Media Gallery`, description: album.description, openGraph: { images: album.coverImage ? [{ url: album.coverImage, alt: album.coverAlt }] : [] } };
}
export default async function MediaAlbumPage({ params }: Props) {
  const albums = await getMediaAlbums();
  const { slug } = await params;
  const current = albums.find(item => item.slug === slug);
  if (!current) notFound();
  const index = albums.findIndex(item => item.slug === slug);
  const previous = albums[(index - 1 + albums.length) % albums.length];
  const next = albums[(index + 1) % albums.length];
  return <PageFrame><main className="portfolio-page">
    <header className="site-shell album-header"><Link href="/projects/media" className="archive-back">← Media Gallery</Link><div className="album-heading"><div><p className="album-kicker">{current.category} <span> / {current.date}</span></p><h1>{current.title}</h1></div><p className="archive-intro">{current.description}</p></div>
      <div className="album-info"><div className="album-tags">{current.tags.map(tag => <span key={tag}>{tag}</span>)}</div><span>{current.items.length} {current.category === "Video" ? "films · Select to play" : "images · Select to explore"}</span></div>
    </header>
    <section className="site-shell album-content" aria-label={`${current.title} media`}><MediaGallery items={current.items} title={current.title} contained={current.category === "Graphics & PR"} /></section>
    {albums.length > 1 && <nav className="site-shell album-navigation" aria-label="Album navigation"><Link href={`/projects/media/${previous.slug}`}><span>← Previous collection</span><strong>{previous.title}</strong></Link><Link href={`/projects/media/${next.slug}`}><span>Next collection →</span><strong>{next.title}</strong></Link></nav>}
  </main></PageFrame>;
}
