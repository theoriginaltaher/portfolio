"use client";

import { useState } from "react";
import { mediaCategories, type MediaAlbum } from "@/src/types/media";
import { AlbumCard } from "./AlbumCard";

export function AlbumBrowser({ albums }: { albums: MediaAlbum[] }) {
  const [category, setCategory] = useState("All work");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("selected");
  const visible = albums.filter(album => (category === "All work" || album.category === category) && `${album.title} ${album.date} ${album.tags.join(" ")} ${album.description}`.toLowerCase().includes(search.trim().toLowerCase()));
  if (sort === "newest") visible.sort((a,b) => (Number(b.date.match(/\d{4}/g)?.at(-1)) || 0) - (Number(a.date.match(/\d{4}/g)?.at(-1)) || 0) || a.title.localeCompare(b.title));
  if (sort === "title") visible.sort((a,b) => a.title.localeCompare(b.title));
  return <>
    <div className="archive-toolbar">
      <div className="archive-filters" role="group" aria-label="Filter collections">{["All work", ...mediaCategories].map(value => <button key={value} className="archive-filter" aria-pressed={category === value} onClick={() => setCategory(value)}>{value}<span>{value === "All work" ? albums.length : albums.filter(album => album.category === value).length}</span></button>)}</div>
      <div className="archive-search-row"><label className="archive-search"><span className="sr-only">Search collections</span><span aria-hidden="true">⌕</span><input type="search" placeholder="Search collections…" value={search} onChange={event => setSearch(event.target.value)} /></label><label><span className="sr-only">Sort collections</span><select className="archive-sort" value={sort} onChange={event => setSort(event.target.value)}><option value="selected">Selected order</option><option value="newest">Newest first</option><option value="title">Title A–Z</option></select></label></div>
    </div>
    <p className="archive-result" role="status">{visible.length} {visible.length === 1 ? "collection" : "collections"}{category !== "All work" ? ` in ${category}` : ""}{search.trim() ? ` matching “${search.trim()}”` : ""}</p>
    {visible.length ? <div className="album-grid">{visible.map(album => <AlbumCard key={album.slug} album={album} />)}</div> : <div className="archive-empty"><h2>{albums.length ? "No matching collections" : "New collections are on the way"}</h2><p>{albums.length ? "Try another title, year, or category." : "Check back for photography, films, and design work."}</p>{albums.length > 0 && <button className="gallery-control" onClick={() => { setCategory("All work"); setSearch(""); }}>Clear filters</button>}</div>}
  </>;
}
