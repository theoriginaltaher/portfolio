import { defineArrayMember, defineField, defineType } from "sanity";

export const mediaAlbumType = defineType({
  name: "mediaAlbum", title: "Media album", type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: r => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: r => r.required() }),
    defineField({ name: "published", title: "Show on website", type: "boolean", initialValue: false, description: "Turn off and Publish to hide this album, including its direct URL." }),
    defineField({ name: "category", type: "string", options: { list: ["Photography", "Video", "Graphics & PR"] }, validation: r => r.required() }),
    defineField({ name: "date", title: "Year / season", type: "string", validation: r => r.required() }),
    defineField({ name: "description", type: "text", rows: 3, validation: r => r.required().max(400) }),
    defineField({ name: "tags", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "order", type: "number", initialValue: 0, validation: r => r.required().integer() }),
    defineField({ name: "items", title: "Album items", type: "array", of: [defineArrayMember({ type: "mediaItem" })], description: "Drag to reorder. The first visible item is the default cover. Open an item to hide it without deleting it.", validation: r => r.required().min(1) }),
  ],
  orderings: [{ title: "Website order", name: "websiteOrder", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", category: "category", published: "published" }, prepare: ({ title, category, published }) => ({ title, subtitle: `${published ? "Visible" : "Hidden"} · ${category}` }) },
});
