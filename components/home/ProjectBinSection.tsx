"use client";

import Link from "next/link";
import { useState } from "react";
import { SectionLabel } from "./SectionLabel";
import type { Project } from "@/src/types";

const pathwayDefinitions = [
  {
    code: "Systems",
    title: "Digital Systems",
    description:
      "Web platforms, practical tools, and digital workflows built for real teams and everyday use.",
    href: "/projects/systems",
    meta: "Web, automation, and workflow design",
  },
  {
    code: "Media",
    title: "Media Gallery",
    description: "Photography, video, and event stories shaped into clear visual records.",
    href: "/projects/media",
    meta: "Albums, photography, and video",
  },
  {
    code: "Experience",
    title: "Experience",
    description: "The roles, teams, and community work that shaped how I lead and collaborate.",
    href: "/experience",
    meta: "Leadership, community, and practice",
  },
  {
    code: "Writing",
    title: "Writing",
    description: "Notes on creative technology, media work, and lessons from building things.",
    href: "/blog",
    meta: "Notes, essays, and observations",
  },
];

export function ProjectBinSection({ projects }: { projects: Project[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const systems = projects.filter((project) => project.category === "systems");
  const media = projects.filter((project) => project.category === "media");
  const pathways = pathwayDefinitions.map((pathway, index) => {
    if (index === 0 && systems[0]) {
      return { ...pathway, description: systems[0].shortDescription, meta: `${systems.length} published systems` };
    }
    if (index === 1 && media[0]) {
      return { ...pathway, description: media[0].shortDescription, meta: `${media.length} published media projects` };
    }
    return pathway;
  });
  return (
    <section className="border-b hairline bg-[#060606] py-12 sm:py-14 md:py-20" id="projects">
      <div className="site-shell max-w-[1440px]">
        <div className="mb-8 flex flex-col justify-between gap-3 sm:mb-10 md:flex-row md:items-end">
          <SectionLabel label="Selected work" />
          <p className="max-w-md text-sm leading-6 text-[var(--muted)]">
            A selection of technical, creative, and collaborative work.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:flex xl:gap-3" onMouseLeave={() => setActiveIndex(null)}>
          {pathways.map((item, index) => (
            <Link
              key={item.title}
              href={item.href}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex(null)}
              className={
                `group panel relative flex min-h-[220px] flex-col overflow-hidden p-5 transition-[flex-grow,border-color,background-color] duration-500 ease-out sm:min-h-[235px] sm:p-6 xl:basis-0 ${activeIndex === null ? "xl:flex-1" : activeIndex === index ? "xl:flex-[1.65] xl:bg-[var(--panel-raised)] xl:border-[var(--border-strong)]" : "xl:flex-[.78]"}`
              }
            >
              <p className="mb-7 text-xs font-semibold text-[var(--blue-quiet)]">
                {item.code}
              </p>
              <h3 className="text-[clamp(1.35rem,2vw,1.65rem)] font-black tracking-[-0.04em]">
                {item.title}
              </h3>
              <p className="mt-3 pretty text-[15px] leading-6 text-[var(--muted)]">
                {item.description}
              </p>

              <p className="mt-auto border-t border-white/8 pt-4 text-xs leading-5 text-[var(--dim)]">{item.meta}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
