import { defineField, defineType } from "sanity";

export const skillType = defineType({
  name: "skill", title: "Skill", type: "document",
  fields: [
    defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "order", type: "number", validation: (rule) => rule.required().integer() }),
  ],
});
