import fc from "fast-check";
import { navItems } from "@/components/layout/nav-data";
import { schemaTypes } from "@/sanity/schemas";
import { HOME_HERO_PORTRAIT } from "@/src/config/brand";

describe("navigation and schema properties", () => {
  it("keeps the approved camera portrait on the homepage", () => {
    expect(HOME_HERO_PORTRAIT).toBe("/assets/taher-hero-camera.png");
  });

  // Property 2: Every navigation label maps to its required href.
  it("keeps the navigation mapping stable", () => { const expected = [["Home", "/"], ["Experience", "/experience"], ["Projects", "/projects"], ["About", "/about"], ["Blog", "/blog"], ["Contact", "/contact"]]; fc.assert(fc.property(fc.integer({ min: 0, max: expected.length - 1 }), (index) => { expect([navItems[index].label, navItems[index].href]).toEqual(expected[index]); })); });

  // Property 14: Every Sanity schema contains its required fields.
  it("contains every required Sanity field", () => {
    const requirements: Record<string, string[]> = {
      project: ["title", "slug", "category", "shortDescription", "fullDescription", "featuredImage", "gallery", "year", "role", "tools", "order", "featured", "published"],
      careerProject: ["title", "description", "startDate", "endDate", "externalUrl", "order", "published"],
      experience: ["role", "organisation", "location", "dateRange", "description", "category", "order", "current"],
      education: ["school", "qualification", "startDate", "endDate", "description", "activities", "order"],
      certification: ["name", "issuer", "issuedOn", "credentialId", "credentialUrl", "order"],
      course: ["name", "reference", "order"],
      skill: ["label", "order"],
      language: ["name", "proficiency", "order"],
      recommendation: ["personName", "role", "organisation", "quote", "receivedAt", "order", "published"],
      post: ["title", "slug", "excerpt", "publishedAt", "readingTime", "body", "coverImage"],
      siteSettings: ["name", "role", "headline", "location", "bio", "portrait", "email", "linkedIn", "metaDescription"],
    };
    for (const schema of schemaTypes) {
      const fieldNames = (schema.fields || []).map((field) => field.name);
      expect(fieldNames).toEqual(expect.arrayContaining(requirements[schema.name]));
    }
  });
});
