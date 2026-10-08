import type React from "react";
import "@testing-library/jest-dom/vitest";

// Schema tests inspect definitions, not the Studio runtime. Avoid loading the entire editor.
vi.mock("sanity", () => ({ defineType: (value: unknown) => value, defineField: (value: unknown) => value, defineArrayMember: (value: unknown) => value }));
vi.mock("next-sanity", () => ({ defineQuery: (value: string) => value }));

vi.mock("next/image", () => ({ default: ({ fill, priority, loader, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; priority?: boolean; loader?: unknown }) => {
  void fill; void priority; void loader;
  // Test-only stand-in for Next's optimized image component.
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} alt={props.alt || ""} />;
} }));
vi.mock("next/link", () => ({ default: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props}>{children}</a> }));
