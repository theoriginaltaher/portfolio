import type { PortableTextBlock } from "@portabletext/types";
import type { Project, SystemProject } from "@/src/types";

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
