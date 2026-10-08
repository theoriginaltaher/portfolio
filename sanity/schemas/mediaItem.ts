import { defineField, defineType } from "sanity";

export const mediaItemType = defineType({
  name: "mediaItem", title: "Image or film", type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: r => r.required() }),
    defineField({ name: "type", title: "Media type", type: "string", initialValue: "image", options: { list: ["image", "video"], layout: "radio" }, validation: r => r.required() }),
    defineField({ name: "hidden", title: "Hide from website", type: "boolean", initialValue: false, description: "Hides this item and removes it from the viewer. Publish the parent document to apply." }),
    defineField({ name: "image", type: "image", options: { hotspot: true }, hidden: ({ parent }) => parent?.type !== "image", validation: r => r.custom((value, context) => (context.parent as { type?: string })?.type === "image" && !value ? "Upload an image." : true) }),
    defineField({ name: "video", title: "Video file", type: "file", options: { accept: "video/mp4,video/webm" }, hidden: ({ parent }) => parent?.type !== "video", validation: r => r.custom((value, context) => (context.parent as { type?: string })?.type === "video" && !value ? "Upload an MP4 or WebM video." : true) }),
    defineField({ name: "poster", title: "Video poster", type: "image", options: { hotspot: true }, hidden: ({ parent }) => parent?.type !== "video" }),
    defineField({ name: "alt", title: "Image description", type: "string", description: "Describe the image for visitors using a screen reader.", validation: r => r.required() }),
    defineField({ name: "caption", type: "text", rows: 2 }),
    defineField({ name: "captions", title: "Video captions (WebVTT)", type: "file", options: { accept: ".vtt" }, hidden: ({ parent }) => parent?.type !== "video" }),
  ],
  preview: { select: { title: "title", type: "type", hidden: "hidden", image: "image", poster: "poster" }, prepare: ({ title, type, hidden, image, poster }) => ({ title, subtitle: `${hidden ? "Hidden" : "Visible"} · ${type}`, media: image || poster }) },
});
