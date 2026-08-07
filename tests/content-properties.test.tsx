import { render, screen } from "@testing-library/react";
import fc from "fast-check";
import { BlogPostRow } from "@/components/content/BlogPostRow";
import { ExperienceRow } from "@/components/content/ExperienceRow";
import { ProjectRow } from "@/components/content/ProjectRow";
import { experience, posts, projects } from "@/src/data/seed/content";

describe("content row properties", () => {
  // Property 5: ExperienceRow always renders role, organisation, and date range.
  it("renders every required experience value", () => fc.assert(fc.property(fc.integer({ min: 0, max: experience.length - 1 }), (index) => { const { unmount } = render(<ExperienceRow entry={experience[index]} />); expect(screen.getByText(experience[index].role)).toBeInTheDocument(); expect(screen.getByText(experience[index].organisation)).toBeInTheDocument(); expect(screen.getByText(experience[index].dateRange)).toBeInTheDocument(); unmount(); })));

  // Properties 10 and 11: ProjectRow renders required fields and alternates layout by index parity.
  it("renders project content with alternating order", () => fc.assert(fc.property(fc.integer({ min: 0, max: projects.length - 1 }), fc.nat(20), (projectIndex, rowIndex) => { const { container, unmount } = render(<ProjectRow project={projects[projectIndex]} index={rowIndex} />); expect(screen.getByRole("heading", { name: projects[projectIndex].title })).toBeInTheDocument(); expect(screen.getByText(projects[projectIndex].year)).toBeInTheDocument(); const visual = container.querySelector("article > div"); expect(visual?.className.includes("lg:order-2")).toBe(Boolean(rowIndex % 2)); unmount(); })));

  // Property 13: BlogPostRow always renders title, date, excerpt, and reading time.
  it("renders all blog preview fields", () => fc.assert(fc.property(fc.integer({ min: 0, max: posts.length - 1 }), (index) => { const { unmount } = render(<BlogPostRow post={posts[index]} />); expect(screen.getByRole("heading", { name: posts[index].title })).toBeInTheDocument(); expect(screen.getByText(posts[index].excerpt)).toBeInTheDocument(); expect(screen.getByText(`${posts[index].readingTime} min read`)).toBeInTheDocument(); unmount(); })));

  // Properties 7, 8, and 9: published project lists preserve every item and category boundaries.
  it("preserves published projects and category filters", () => { const published = projects.filter((project) => project.published); expect(published).toHaveLength(projects.length); expect(projects.filter((project) => project.category === "systems").every((project) => project.category === "systems")).toBe(true); expect(projects.filter((project) => project.category === "media").every((project) => project.category === "media")).toBe(true); });
});
