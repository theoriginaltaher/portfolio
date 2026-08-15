import { defineField, defineType } from "sanity";

export const courseType = defineType({
  name: "course",
  title: "Courses",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "reference", type: "string" }),
    defineField({ name: "order", type: "number", validation: (rule) => rule.required().integer() }),
  ],
});
