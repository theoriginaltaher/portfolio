import { defineField, defineType } from "sanity";

export const languageType = defineType({
  name: "language",
  title: "Languages",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "proficiency", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "order", type: "number", validation: (rule) => rule.required().integer() }),
  ],
});
