import { defineArrayMember, defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project", title: "Digital project", type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (rule) => rule.required() }),
    defineField({ name: "category", type: "string", initialValue: "systems", options: { list: [{ title: "Digital Systems", value: "systems" }], layout: "radio" }, description: "For photography, films, and graphics, create a Media album instead.", validation: (rule) => rule.required() }),
    defineField({ name: "shortDescription", type: "text", rows: 3, validation: (rule) => rule.required().max(240) }),
    defineField({ name: "fullDescription", type: "array", of: [defineArrayMember({ type: "block" })] }),
    defineField({ name: "media", title: "Screenshots and films", type: "array", of: [defineArrayMember({ type: "mediaItem" })], description: "The first visible item is used on the Digital Systems page. Drag to reorder; open an item to hide it." }),
    defineField({ name: "externalUrl", title: "Live website", type: "url", validation: r => r.uri({ scheme: ["https"] }) }),
    defineField({ name: "featuredImage", title: "Legacy cover image", type: "image", hidden: ({ document }) => Boolean(document?.media), options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", validation: (rule) => rule.required() })] }),
    defineField({ name: "gallery", title: "Legacy gallery", type: "array", hidden: ({ document }) => Boolean(document?.media), of: [defineArrayMember({ type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", validation: (rule) => rule.required() })] })] }),
    defineField({ name: "year", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "role", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "tools", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "order", type: "number", validation: (rule) => rule.required().integer() }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "published", title: "Show on website", type: "boolean", initialValue: false, description: "Turn off and Publish to hide this project, including its direct URL." }),
  ],
  preview: { select: { title: "title", published: "published", media: "media.0.image", legacy: "featuredImage" }, prepare: ({ title, published, media, legacy }) => ({ title, subtitle: published ? "Visible on website" : "Hidden from website", media: media || legacy }) },
});
