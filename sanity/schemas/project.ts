import { defineArrayMember, defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project", title: "Project", type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (rule) => rule.required() }),
    defineField({ name: "category", type: "string", options: { list: [{ title: "Digital Systems Lab", value: "systems" }, { title: "Media Gallery", value: "media" }], layout: "radio" }, validation: (rule) => rule.required() }),
    defineField({ name: "shortDescription", type: "text", rows: 3, validation: (rule) => rule.required().max(240) }),
    defineField({ name: "fullDescription", type: "array", of: [defineArrayMember({ type: "block" })] }),
    defineField({ name: "featuredImage", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", validation: (rule) => rule.required() })] }),
    defineField({ name: "gallery", type: "array", of: [defineArrayMember({ type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", validation: (rule) => rule.required() })] })] }),
    defineField({ name: "year", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "role", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "tools", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "order", type: "number", validation: (rule) => rule.required().integer() }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "published", type: "boolean", initialValue: false }),
  ],
  preview: { select: { title: "title", subtitle: "category", media: "featuredImage" } },
});
