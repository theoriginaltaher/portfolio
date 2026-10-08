import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MediaGallery } from "@/components/projects/MediaGallery";
import { AlbumBrowser } from "@/components/projects/AlbumBrowser";
import type { MediaAlbum, MediaAsset } from "@/src/types/media";

const items: MediaAsset[] = [
  { id: "first", type: "image", src: "/one.jpg", title: "Opening frame", alt: "Opening ceremony" },
  { id: "second", type: "image", src: "/two.jpg", title: "Closing frame", alt: "Closing ceremony" },
  { id: "film", type: "video", src: "/film.mp4", title: "Event film", alt: "Event film", poster: "/poster.jpg" },
];

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () { this.setAttribute("open", ""); };
  HTMLDialogElement.prototype.close = function () { this.removeAttribute("open"); };
  Element.prototype.scrollIntoView = vi.fn();
  Element.prototype.scrollTo = vi.fn();
});

it("opens the selected image, supports keyboard navigation and zoom, and restores scroll on close", async () => {
  const user = userEvent.setup();
  render(<MediaGallery items={items} title="Test collection" />);
  const opener = screen.getByRole("button", { name: "View Opening frame" });
  await user.click(opener);
  const viewer = screen.getByRole("dialog");
  expect(document.body.style.overflow).toBe("hidden");
  expect(within(viewer).getByRole("heading")).toHaveTextContent("Opening frame");
  await user.click(within(viewer).getByRole("button", { name: "Zoom image" }));
  expect(within(viewer).getByRole("button", { name: "Fit image" })).toHaveAttribute("aria-pressed", "true");
  fireEvent.keyDown(viewer, { key: "ArrowRight" });
  expect(within(viewer).getByRole("heading")).toHaveTextContent("Closing frame");
  expect(within(viewer).getByRole("button", { name: "Zoom image" })).toHaveAttribute("aria-pressed", "false");
  fireEvent.keyDown(viewer, { key: "End" });
  expect(viewer.querySelector("video")).toHaveAttribute("controls");
  fireEvent.keyDown(viewer, { key: "ArrowRight" });
  expect(viewer.querySelector("video")).toBeNull();
  expect(within(viewer).getByRole("heading")).toHaveTextContent("Opening frame");
  fireEvent(viewer, new Event("cancel", { cancelable: true }));
  expect(screen.queryByRole("dialog")).toBeNull();
  expect(document.body.style.overflow).toBe("");
});

it("handles failed full-size media with an explicit retry", async () => {
  const user = userEvent.setup();
  render(<MediaGallery items={[items[0]]} title="Test collection" />);
  await user.click(screen.getByRole("button", { name: "View Opening frame" }));
  const viewer = screen.getByRole("dialog");
  fireEvent.error(within(viewer).getByAltText("Opening ceremony"));
  expect(within(viewer).getByRole("status")).toHaveTextContent("couldn’t be loaded");
  await user.click(within(viewer).getByRole("button", { name: "Try again" }));
  expect(within(viewer).getByAltText("Opening ceremony")).toBeInTheDocument();
});

it("loads video only when opened and removes the player when closed", async () => {
  const user = userEvent.setup();
  const { container } = render(<MediaGallery items={[items[2]]} title="Films" />);
  expect(container.querySelector("video")).toBeNull();
  await user.click(screen.getByRole("button", { name: "Play Event film" }));
  expect(container.querySelector("video")).toHaveAttribute("preload", "metadata");
  await user.click(screen.getByRole("button", { name: "Close media viewer" }));
  expect(container.querySelector("video")).toBeNull();
});

it("filters and searches albums together and resets an empty result", async () => {
  const user = userEvent.setup();
  const albums: MediaAlbum[] = [
    { title: "Ceremony", slug: "ceremony", date: "2025", category: "Photography", description: "Event coverage", coverAlt: "Ceremony", tags: ["School"], items: [items[0]] },
    { title: "Sports film", slug: "film", date: "2026", category: "Video", description: "Athletics", coverAlt: "Film", tags: ["Sports"], items: [items[2]] },
  ];
  render(<AlbumBrowser albums={albums} />);
  await user.click(screen.getByRole("button", { name: /Video/ }));
  expect(screen.queryByRole("heading", { name: /Ceremony/ })).toBeNull();
  await user.type(screen.getByRole("searchbox"), "missing");
  expect(screen.getByRole("heading", { name: "No matching collections" })).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Clear filters" }));
  expect(screen.getByRole("heading", { name: /Ceremony/ })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Sports film/ })).toBeInTheDocument();
});
