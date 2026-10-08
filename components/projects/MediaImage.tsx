"use client";

import Image, { type ImageLoaderProps } from "next/image";
import { useState } from "react";

// Sanity already has an image CDN. Resize there to avoid a second server-side download.
function sanityLoader({ src, width, quality }: ImageLoaderProps) {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality || 80));
  url.searchParams.set("fit", "max");
  url.searchParams.set("auto", "format");
  return url.toString();
}

export function MediaImage({ src, alt, sizes = "100vw", className = "object-cover", priority = false }: { src?: string; alt: string; sizes?: string; className?: string; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <span className="media-unavailable"><span aria-hidden="true">▧</span><span>{src ? "Preview unavailable" : "No preview"}</span><span className="text-xs">{alt}</span></span>;
  return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} loader={src.startsWith("https://cdn.sanity.io/images/") ? sanityLoader : undefined} className={className} onError={() => setFailed(true)} />;
}
