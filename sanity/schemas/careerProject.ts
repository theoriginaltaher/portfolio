import { defineField, defineType } from "sanity";

export const careerProjectType = defineType({
  name: "careerProject",
  title: "Career projects",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", type: "text", rows: 6, validation: (rule) => rule.required() }),
    defineField({ name: "startDate", type: "string" }),
    defineField({ name: "endDate", type: "string" }),
    defineField({ name: "externalUrl", type: "url" }),
    defineField({ name: "order", type: "number", validation: (rule) => rule.required().integer() }),
    defineField({ name: "published", type: "boolean", initialValue: true }),
  ],
  preview: { select: { title: "title", subtitle: "startDate" } },
});
