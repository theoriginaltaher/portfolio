import { defineArrayMember, defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post", title: "Post", type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (rule) => rule.required() }),
    defineField({ name: "excerpt", type: "text", rows: 3, validation: (rule) => rule.required().max(240) }),
    defineField({ name: "publishedAt", type: "datetime", validation: (rule) => rule.required() }),
    defineField({ name: "readingTime", type: "number", validation: (rule) => rule.required().positive().integer() }),
    defineField({ name: "body", type: "array", of: [defineArrayMember({ type: "block" })], validation: (rule) => rule.required() }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", validation: (rule) => rule.required() })] }),
  ],
});
