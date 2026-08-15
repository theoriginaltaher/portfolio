import { defineField, defineType } from "sanity";

export const recommendationType = defineType({
  name: "recommendation",
  title: "Recommendations",
  type: "document",
  fields: [
    defineField({ name: "personName", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "organisation", type: "string" }),
    defineField({ name: "quote", type: "text", rows: 6, validation: (rule) => rule.required() }),
    defineField({ name: "receivedAt", type: "string" }),
    defineField({ name: "order", type: "number", validation: (rule) => rule.required().integer() }),
    defineField({ name: "published", type: "boolean", initialValue: true }),
  ],
  preview: { select: { title: "personName", subtitle: "organisation" } },
});
