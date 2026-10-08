"use client";

import { useEffect, useRef, useState } from "react";
import type { MediaAsset } from "@/src/types/media";
import { MediaImage } from "./MediaImage";

function ViewerMedia({ item, zoomed }: { item: MediaAsset; zoomed: boolean }) {
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [attempt, setAttempt] = useState(0);
  if (failed) return <div className="viewer-message" role="status"><p>This {item.type === "video" ? "film" : "image"} couldn’t be loaded.</p><button className="gallery-control" onClick={() => { setFailed(false); setLoading(true); setAttempt(n => n + 1); }}>Try again</button></div>;
  if (item.type === "video") return <video key={attempt} className="viewer-video" src={item.src} poster={item.poster} controls autoPlay playsInline preload="metadata" onError={() => setFailed(true)} aria-label={item.title} crossOrigin={item.captionsUrl ? "anonymous" : undefined}>{item.captionsUrl && <track kind="captions" src={item.captionsUrl} srcLang="en" label="English" default />}Your browser does not support this video.</video>;
  return <>
    {loading && <span className="viewer-loading" role="status">Loading image…</span>}
    {/* Native dimensions are needed for zoom; thumbnails use Next Image. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img key={attempt} src={item.src} alt={item.alt} className={zoomed ? "viewer-image is-zoomed" : "viewer-image"} draggable={false} onLoad={() => setLoading(false)} onError={() => setFailed(true)} />
  </>;
}

export function MediaViewer({ items, initialIndex, title, onClose }: { items: MediaAsset[]; initialIndex: number; title: string; onClose: () => void }) {
  const [index, setIndex] = useState(initialIndex);
  const [zoomed, setZoomed] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [notice, setNotice] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const fullscreenRoot = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const selectedThumb = useRef<HTMLButtonElement>(null);
  const gesture = useRef<{ x: number; y: number; left: number; top: number } | null>(null);
  const item = items[index];
  function navigate(next: number) { setIndex((next + items.length) % items.length); setZoomed(false); setNotice(""); stage.current?.scrollTo(0, 0); }
  useEffect(() => {
    const element = dialog.current;
    const opener = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element?.showModal();
    const update = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", update);
    return () => { document.removeEventListener("fullscreenchange", update); element?.close(); document.body.style.overflow = overflow; opener?.focus({ preventScroll: true }); };
  }, []);
  useEffect(() => { selectedThumb.current?.scrollIntoView({ block: "nearest", inline: "nearest" }); }, [index]);
  async function toggleFullscreen() {
    try { if (document.fullscreenElement) await document.exitFullscreen(); else if (fullscreenRoot.current?.requestFullscreen) await fullscreenRoot.current.requestFullscreen(); else setNotice("Fullscreen is unavailable in this browser. The viewer already fills your screen."); }
    catch { setNotice("Fullscreen is unavailable in this browser."); }
  }
  return <dialog ref={dialog} className="media-viewer" aria-labelledby="viewer-title" onCancel={event => { event.preventDefault(); onClose(); }} onKeyDown={event => {
    if (event.key === "Tab") {
      const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], video[controls], input, [tabindex="0"]')).filter(control => control.getClientRects().length > 0);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      return;
    }
    if ((event.target as HTMLElement).closest("video, input")) return;
    if (event.key === "ArrowRight") { event.preventDefault(); navigate(index + 1); }
    if (event.key === "ArrowLeft") { event.preventDefault(); navigate(index - 1); }
    if (event.key === "Home") { event.preventDefault(); navigate(0); }
    if (event.key === "End") { event.preventDefault(); navigate(items.length - 1); }
  }}>
    <div ref={fullscreenRoot} className="viewer-surface">
    <header className="viewer-header">
      <div className="min-w-0"><p className="viewer-collection">{title}</p><h2 id="viewer-title" className="truncate font-semibold">{item.title}</h2></div>
      <div className="viewer-actions">
        {item.type === "image" && <button className="gallery-control" onClick={() => { setZoomed(!zoomed); stage.current?.scrollTo(0, 0); }} aria-pressed={zoomed}>{zoomed ? "Fit image" : "Zoom image"}</button>}
        <button className="gallery-control viewer-fullscreen" onClick={toggleFullscreen}>{fullscreen ? "Exit fullscreen" : "Fullscreen"}</button>
        <button className="gallery-control viewer-close" onClick={onClose} aria-label="Close media viewer" autoFocus>Close <span aria-hidden="true">×</span></button>
      </div>
    </header>
    <div className={`viewer-main${item.type === "video" ? " is-video" : ""}`}>
      {items.length > 1 && <button className="viewer-arrow viewer-prev" aria-label="Previous item" onClick={() => navigate(index - 1)}>←</button>}
      <div ref={stage} className={`viewer-stage${zoomed ? " is-zoomed" : ""}`} onPointerDown={event => {
        if (item.type === "video") return;
        gesture.current = { x: event.clientX, y: event.clientY, left: event.currentTarget.scrollLeft, top: event.currentTarget.scrollTop };
        if (zoomed && event.pointerType === "mouse") event.currentTarget.setPointerCapture(event.pointerId);
      }} onPointerMove={event => {
        if (!zoomed || !gesture.current || event.pointerType !== "mouse") return;
        event.currentTarget.scrollLeft = gesture.current.left - (event.clientX - gesture.current.x);
        event.currentTarget.scrollTop = gesture.current.top - (event.clientY - gesture.current.y);
      }} onPointerUp={event => {
        const start = gesture.current;
        gesture.current = null;
        if (!start || zoomed || item.type === "video") return;
        const delta = event.clientX - start.x;
        if (Math.abs(delta) > 60 && Math.abs(delta) > Math.abs(event.clientY - start.y) * 1.5) navigate(index + (delta < 0 ? 1 : -1));
      }} onPointerCancel={() => { gesture.current = null; }}>
        <ViewerMedia key={item.id} item={item} zoomed={zoomed} />
      </div>
      {items.length > 1 && <button className="viewer-arrow viewer-next" aria-label="Next item" onClick={() => navigate(index + 1)}>→</button>}
    </div>
    <footer className="viewer-footer">
      <div className="viewer-caption"><p aria-live="polite" aria-atomic="true">{index + 1} / {items.length}<span className="ml-4">{item.caption || item.title}</span></p><span className="viewer-hint">{zoomed ? "Drag or scroll to explore" : "← → Browse · Esc Close"}</span></div>
      {notice && <p role="status" className="text-sm">{notice}</p>}
      {items.length > 1 && <div className="viewer-thumbnails" aria-label="Choose media item">{items.map((entry, i) => <button key={entry.id} ref={i === index ? selectedThumb : undefined} className="viewer-thumbnail" aria-label={`View ${i + 1}: ${entry.title}`} aria-current={i === index ? "true" : undefined} onClick={() => navigate(i)}><MediaImage src={entry.type === "video" ? entry.poster : entry.src} alt="" sizes="80px" />{entry.type === "video" && <span className="thumbnail-play" aria-hidden="true">▶</span>}</button>)}</div>}
    </footer>
    </div>
  </dialog>;
}

export function MediaGallery({ items, title, contained = false }: { items: MediaAsset[]; title: string; contained?: boolean }) {
  const [active, setActive] = useState<number | null>(null);
  const [limit, setLimit] = useState(24);
  if (!items.length) return <p className="py-12 text-[var(--muted)]">No media is available in this collection yet.</p>;
  return <>
    <div className={`media-grid${contained ? " media-grid-contained" : ""}`}>{items.slice(0, limit).map((item, index) => <figure key={item.id}>
      <button className="media-tile group" onClick={() => setActive(index)} aria-label={`${item.type === "video" ? "Play" : "View"} ${item.title}`}>
        <MediaImage src={item.type === "video" ? item.poster : item.src} alt={item.alt} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className={contained ? "object-contain p-3" : "object-cover transition-transform duration-300 group-hover:scale-[1.025] motion-reduce:transform-none"} priority={index === 0} />
        <span className="media-tile-action" aria-hidden="true">{item.type === "video" ? "▶ Play film" : "↗ View image"}</span>
      </button>
      <figcaption className="media-tile-caption"><span>{item.title}</span><span className="shrink-0 text-[#999]">{String(index + 1).padStart(2, "0")}</span></figcaption>
    </figure>)}</div>
    {limit < items.length && <div className="mt-10 text-center"><button className="gallery-control" onClick={() => setLimit(n => n + 24)}>Show more ({items.length - limit} remaining)</button></div>}
    {active !== null && <MediaViewer items={items} initialIndex={active} title={title} onClose={() => setActive(null)} />}
  </>;
}
