import { defineField, defineType } from "sanity";

export const certificationType = defineType({
  name: "certification",
  title: "Certifications",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "issuer", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "issuedOn", type: "string" }),
    defineField({ name: "credentialId", type: "string" }),
    defineField({ name: "credentialUrl", type: "url" }),
    defineField({ name: "order", type: "number", validation: (rule) => rule.required().integer() }),
  ],
  preview: { select: { title: "name", subtitle: "issuer" } },
});
