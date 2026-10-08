import { evaluate, parse } from "groq-js";
import { ALL_PROJECT_SLUGS_QUERY, MEDIA_ALBUMS_QUERY, PROJECT_BY_SLUG_QUERY, SYSTEMS_PROJECTS_QUERY } from "@/src/lib/sanity/queries";

const dataset = [
  { _id: "asset", _type: "sanity.imageAsset", url: "https://cdn.sanity.io/image.jpg", metadata: { dimensions: { width: 1200, height: 800 } } },
  { _id: "public", _type: "project", slug: { current: "public" }, category: "systems", published: true, media: [{ _key: "visible", type: "image", image: { asset: { _ref: "asset" } } }, { _key: "hidden", hidden: true, type: "image", image: { asset: { _ref: "asset" } } }] },
  { _id: "hidden", _type: "project", slug: { current: "hidden" }, category: "systems", published: false },
  { _id: "album", _type: "mediaAlbum", slug: { current: "album" }, published: true, items: [{ _key: "visible", type: "image", image: { asset: { _ref: "asset" } } }, { _key: "hidden", type: "image", hidden: true, image: { asset: { _ref: "asset" } } }] },
  { _id: "hidden-album", _type: "mediaAlbum", slug: { current: "hidden-album" }, published: false },
  { _id: "drafts.album", _type: "mediaAlbum", slug: { current: "draft-album" }, published: true },
];
async function query(source: string, params = {}) { return (await evaluate(parse(source), { dataset, params })).get(); }

it("excludes hidden projects from listings, direct URLs, and sitemap slugs", async () => {
  expect((await query(SYSTEMS_PROJECTS_QUERY)).map((item: { slug: string }) => item.slug)).toEqual(["public"]);
  expect(await query(PROJECT_BY_SLUG_QUERY, { slug: "hidden" })).toBeNull();
  expect(await query(PROJECT_BY_SLUG_QUERY, { slug: "missing" })).toBeNull();
  expect(await query(ALL_PROJECT_SLUGS_QUERY)).toEqual([{ slug: "public" }]);
});

it("does not return hidden media assets or unpublished/draft albums", async () => {
  const albums = await query(MEDIA_ALBUMS_QUERY);
  expect(albums).toHaveLength(1);
  expect(albums[0].slug).toBe("album");
  expect(albums[0].items.map((item: { id: string }) => item.id)).toEqual(["visible"]);
  const project = await query(PROJECT_BY_SLUG_QUERY, { slug: "public" });
  expect(project.media.map((item: { id: string }) => item.id)).toEqual(["visible"]);
});
