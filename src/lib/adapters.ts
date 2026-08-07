import type { PortableTextBlock } from "@portabletext/types";
import type { MediaItem, SystemProject } from "@/data/projects";
import type { Project } from "@/src/types";

export function portableTextToPlainText(blocks?: PortableTextBlock[]) {
  if (!blocks) return "";
  return blocks
    .map((block) => {
      if (block._type !== "block" || !("children" in block)) return "";
      return block.children
        .map((child) => ("text" in child && typeof child.text === "string" ? child.text : ""))
        .join("");
    })
    .filter(Boolean)
    .join("\n\n");
}

export function toSystemProject(project: Project, index: number): SystemProject {
  return {
    slug: project.slug,
    title: project.title,
    category: "systems",
    description: project.shortDescription,
    fullDescription: portableTextToPlainText(project.fullDescription) || project.shortDescription,
    tools: project.tools,
    status: project.featured ? "Featured system" : "Published system",
    year: project.year,
    signal: `SYS / ${String(index + 1).padStart(2, "0")}`,
    featured: project.featured,
    published: project.published,
  };
}

export function toMediaItems(projects: Project[]): MediaItem[] {
  const spans: MediaItem["span"][] = ["tall", "wide", "standard", "wide", "standard", "tall"];
  return projects.flatMap((project) => {
    const images = [project.featuredImage, ...(project.gallery ?? [])].filter(
      (image): image is NonNullable<typeof image> => Boolean(image?.asset?.url),
    );

    return images.map((image, imageIndex) => ({
      id: `${project._id}-${imageIndex}`,
      title: image.alt || project.title,
      project: project.title,
      year: project.year,
      src: image.asset?.url || "",
      alt: image.alt || `${project.title} media frame`,
      focalPoint: image.hotspot
        ? `${Math.round(image.hotspot.x * 100)}% ${Math.round(image.hotspot.y * 100)}%`
        : "50% 50%",
      span: spans[imageIndex % spans.length],
    }));
  });
}
