import Link from "next/link";
import { PageFrame } from "@/components/pages/PageFrame";

export default function AlbumNotFound() {
  return <PageFrame><main className="site-shell py-32"><h1 className="text-4xl font-bold">Collection unavailable</h1><p className="my-6 text-[#aaa]">This collection may have moved or is no longer published.</p><Link className="gallery-control" href="/projects/media">Explore Media Gallery →</Link></main></PageFrame>;
}
