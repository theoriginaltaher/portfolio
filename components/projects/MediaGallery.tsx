"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { MediaItem } from "@/data/projects";

export function MediaGallery({ items }: { items: MediaItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const move = useCallback(
    (direction: number) => {
      setActiveIndex((current) =>
        current === null ? null : (current + direction + items.length) % items.length,
      );
    },
    [items.length],
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, close, move]);

  const activeItem = activeIndex === null ? null : items[activeIndex];

  return (
    <>
      <div className="media-grid" aria-label="Selected media work">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`media-tile media-tile--${item.span} group relative overflow-hidden bg-[#101010] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--red)]`}
            aria-label={`Open ${item.title} in viewer`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 1024px) 50vw, (min-width: 640px) 65vw, 100vw"
              className="object-cover saturate-[0.82] transition duration-700 ease-out group-hover:scale-[1.018] group-hover:saturate-100"
              style={{ objectPosition: item.focalPoint }}
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 md:p-5">
              <span>
                <span className="block text-sm font-extrabold text-white md:text-base">{item.title}</span>
                <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.13em] text-white/58">{item.project} · {item.year}</span>
              </span>
              <span className="grid h-9 w-9 shrink-0 place-items-center border border-white/28 bg-black/30 text-lg text-white transition group-hover:border-white/65" aria-hidden="true">↗</span>
            </span>
          </button>
        ))}
      </div>

      {activeItem ? (
        <div
          className="dialog-enter fixed inset-0 z-[70] grid bg-black/96 px-4 py-4 md:px-8 md:py-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeItem.title} media viewer`}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) close();
          }}
        >
          <div className="dialog-content-enter mx-auto flex w-full max-w-[1440px] flex-col">
            <div className="flex h-12 items-center justify-between border-b border-white/10 text-[10px] font-bold uppercase tracking-[0.14em] text-white/58">
              <span>Frame {String((activeIndex ?? 0) + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
              <button type="button" onClick={close} className="pressable px-3 py-2 text-white hover:text-[var(--red)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--red)]">Close viewer</button>
            </div>
            <div key={activeItem.id} className="dialog-content-enter relative min-h-0 flex-1">
              <Image src={activeItem.src} alt={activeItem.alt} fill priority sizes="100vw" className="object-contain" />
            </div>
            <div className="flex items-end justify-between gap-4 border-t border-white/10 py-3">
              <div>
                <p className="text-base font-extrabold text-white">{activeItem.title}</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/48">{activeItem.project} · {activeItem.year}</p>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => move(-1)} className="pressable h-10 border border-white/18 px-4 text-white hover:border-white/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--red)]" aria-label="Previous image">←</button>
                <button type="button" onClick={() => move(1)} className="pressable h-10 border border-white/18 px-4 text-white hover:border-white/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--red)]" aria-label="Next image">→</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
