import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings", title: "Site settings", type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "role", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "bio", type: "array", of: [defineArrayMember({ type: "block" })], validation: (rule) => rule.required() }),
    defineField({ name: "portrait", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", validation: (rule) => rule.required() })] }),
    defineField({ name: "email", type: "string", validation: (rule) => rule.required().email() }),
    defineField({ name: "linkedIn", type: "url" }),
    defineField({ name: "metaDescription", type: "text", rows: 3, validation: (rule) => rule.required().max(160) }),
  ],
});
