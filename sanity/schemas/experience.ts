import { defineField, defineType } from "sanity";

export const experienceType = defineType({
  name: "experience", title: "Experience", type: "document",
  fields: [
    defineField({ name: "role", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "organisation", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "dateRange", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", type: "text", rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: "category", type: "string", options: { list: ["work", "leadership"], layout: "radio" }, validation: (rule) => rule.required() }),
    defineField({ name: "order", type: "number", validation: (rule) => rule.required().integer() }),
    defineField({ name: "current", type: "boolean", initialValue: false }),
  ],
});
