import { defineArrayMember, defineField, defineType } from "sanity";

export const educationType = defineType({
  name: "education",
  title: "Education",
  type: "document",
  fields: [
    defineField({ name: "school", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "qualification", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "startDate", type: "string" }),
    defineField({ name: "endDate", type: "string" }),
    defineField({ name: "description", type: "text", rows: 4 }),
    defineField({ name: "activities", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "order", type: "number", validation: (rule) => rule.required().integer() }),
  ],
  preview: { select: { title: "qualification", subtitle: "school" } },
});
