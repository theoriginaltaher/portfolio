export type MediaAsset = {
  type: "image" | "video";
  src: string;
  alt: string;
  title?: string;
  featured?: boolean;
  sourceUrl?: string;
};

export type MediaAlbum = {
  title: string;
  slug: string;
  date: string;
  category: "Photography" | "Video" | "Graphics & PR";
  description: string;
  coverImage: string;
  coverAlt: string;
  tags: string[];
  mediaCount: number;
  sourceFolderUrl: string;
  items: MediaAsset[];
};

type DriveAsset = {
  id: string;
  title: string;
  type?: "image" | "video";
  featured?: boolean;
};

type AlbumSeed = Omit<MediaAlbum, "coverImage" | "coverAlt" | "mediaCount" | "items"> & {
  assets: DriveAsset[];
};

const imageUrl = (id: string) => `https://lh3.googleusercontent.com/d/${id}=w2000`;
const fileUrl = (id: string) => `https://drive.google.com/file/d/${id}/view`;
const videoPreviewUrl = (id: string) => `https://drive.google.com/file/d/${id}/preview`;

function album(seed: AlbumSeed): MediaAlbum {
  const { assets, ...metadata } = seed;
  const items = assets.map((asset, index) => ({
    type: asset.type ?? "image",
    src: asset.type === "video" ? videoPreviewUrl(asset.id) : imageUrl(asset.id),
    alt: `${seed.title}: ${asset.title}`,
    title: asset.title,
    featured: asset.featured ?? index === 0,
    sourceUrl: fileUrl(asset.id),
  }));

  return {
    ...metadata,
    coverImage: imageUrl(assets[0].id),
    coverAlt: `${seed.title} collection cover`,
    mediaCount: items.length,
    items,
  };
}

export const mediaAlbums: MediaAlbum[] = [
  album({
    title: "29th Interact Club Installation",
    slug: "interact-installation-29",
    date: "2024/25",
    category: "Photography",
    description: "A formal event record covering the people, proceedings, and atmosphere of the club's 29th annual installation ceremony.",
    tags: ["Event", "Ceremony", "Interact Club"],
    sourceFolderUrl: "https://drive.google.com/drive/folders/1mWZzGTqKWlOJxKxKHzIDCcEESYMHW3U-",
    assets: [
      { id: "1SXT6sG1sOzTYq75agpkgErOcVradsOV3", title: "Opening frame" },
      { id: "1LXx-5KYyoiKuPLTXYGnBYN3ZEQCGD5S_", title: "Ceremony detail" },
      { id: "1XIdZ3iWlYq4JMdMYSAljdQuPAaGG3Uq2", title: "On stage" },
      { id: "1SLlh_aAXyW4yhFjyRXMgrX2l2MhKno5G", title: "Presentation" },
      { id: "1N9dd__Em569jKzFyy8P0oqCWB_tXVToA", title: "Closing frame" },
      { id: "1Y1UXgMQ_gp_z1bwtlA-WCHf9SWcqQ2VW", title: "Arrival" },
    ],
  }),
  album({
    title: "InterHouse Cricket Tournament",
    slug: "interhouse-cricket-2024-25",
    date: "2024/25",
    category: "Photography",
    description: "Match-day coverage built around pace, competition, and the moments between play.",
    tags: ["Sports", "Cricket", "Action"],
    sourceFolderUrl: "https://drive.google.com/drive/folders/1nt2leu4N_zro112MH1iDBnr_HWoxEJDb",
    assets: [
      { id: "1-coxdIBTG4obVMO20MXVDo7Z0gkvm3Gw", title: "At the crease" },
      { id: "1EzYKYsyzRWFmeSMrDvjHisCKhrOSa1MF", title: "Match play" },
      { id: "1uwmtfKvOjXm41Pv5cwgYhYBimQVppH6l", title: "Delivery" },
      { id: "1gH4prPlkjDLJjmKNMpBmgioOGijaPgPS", title: "Field position" },
      { id: "1k8YPunlZ3vF5xOOoaeTsM1eoSk6bKWvt", title: "In motion" },
      { id: "1N_SSwgQJpA1T-nS6lbJKGdPBUeh2on7S", title: "Before play" },
    ],
  }),
  album({
    title: "InterHouse Swimming Meet",
    slug: "interhouse-swimming-2024-25",
    date: "2024/25",
    category: "Photography",
    description: "Poolside coverage of races, starts, finishes, and the energy surrounding the meet.",
    tags: ["Sports", "Swimming", "Event"],
    sourceFolderUrl: "https://drive.google.com/drive/folders/1K4uQx3SjmgtFNaKbQ0M14du3mR-gJAHz",
    assets: [
      { id: "17s02GbBdiru-80BG1k0eiL3FKxbn4HNV", title: "Poolside" },
      { id: "13O2viwFlG89yQNnmn7RC2JRqAQG6oLgc", title: "Race frame" },
      { id: "1UrNxqtzJputFdG8URkQ4iXcBAOZTvs-3", title: "The start" },
      { id: "1x-JEoUDampCbHqXGNDUDUiZUQpHOV0yC", title: "In the lane" },
      { id: "14rPpVuwOrcMJ9BkTbKAkXefVJDR1ib5g", title: "Meet detail" },
      { id: "1DXHJYnEVH6iu89mMx_HNZN9KgVHbKklM", title: "Finish" },
    ],
  }),
  album({
    title: "InterHouse Athletic Meet",
    slug: "interhouse-athletics-2024-25",
    date: "2024/25",
    category: "Photography",
    description: "A selection from the pre-meet and trackside archive, focused on movement, anticipation, and scale.",
    tags: ["Athletics", "Sports", "Documentary"],
    sourceFolderUrl: "https://drive.google.com/drive/folders/1QBMenLq-5-hEGGccgaM2pg2njtC3f6Sn",
    assets: [
      { id: "1BXUebEU0AClzx6TIhVSStfZB5AvYkDmC", title: "Pre-meet 113" },
      { id: "1KIyyLZ39MXtCwR5Q6COHfcuAZfWtHps8", title: "Pre-meet 114" },
      { id: "1x7U98dZJAJosmdq_QO8lp20nxprUMpyE", title: "Pre-meet 115" },
      { id: "1V8WmCBGmEU7bNNoF8G_-OGB4PqC6UFoD", title: "Pre-meet 117" },
      { id: "1VohdQVeCS_bbkR39JmqwsdTz2Uhi6LLk", title: "Pre-meet 129" },
    ],
  }),
  album({
    title: "InterHouse Scrabble Tournament",
    slug: "interhouse-scrabble-2024-25",
    date: "2024/25",
    category: "Photography",
    description: "Quiet, close-range documentation of concentration, competition, and the tabletop details of the tournament.",
    tags: ["Scrabble", "Competition", "School"],
    sourceFolderUrl: "https://drive.google.com/drive/folders/1RXn1PTuQPmvw5oNOC1gV0hT751rL3UdW",
    assets: [
      { id: "1ES6te76bu4FU1arFSTAw3QRaeJ8YSeH4", title: "Opening round" },
      { id: "150T9bKAOWrKyGottkxk0oc6vWw-ffDQw", title: "At the board" },
      { id: "164POXzx91GTAmfSUpHLma992Nk36j-l-", title: "Word play" },
      { id: "14fBYZK3TZ9YJXmBeUO4HqNX63mbzs3fv", title: "Concentration" },
      { id: "19yZ6K4_f0Yfm9Qu7SIW2AfFiSwrO3fwl", title: "Tournament detail" },
    ],
  }),
  album({
    title: "InterHouse Karate Tournament",
    slug: "interhouse-karate-2025-26",
    date: "2025/26",
    category: "Photography",
    description: "A fast-moving event series covering form, reaction, and the final moments of the tournament.",
    tags: ["Karate", "Sports", "Action"],
    sourceFolderUrl: "https://drive.google.com/drive/folders/1mz2F5ba5OxiBzPs356O5wzhckp38gm60",
    assets: [
      { id: "1gTGI7xoOE-Y5chqOR6JYTarubpUSNIu0", title: "Final frame" },
      { id: "1QFqZWGbjr3EwGGcFTN5X4PTqQ9NKSHN0", title: "Closing sequence" },
      { id: "19UQIv728zNPhdaINK7w1VF8bQnjPCjT2", title: "In competition" },
      { id: "1RziVes_e_Gp_B-PR2L95SIGxkzO7rAkJ", title: "Match detail" },
    ],
  }),
  album({
    title: "InterHouse Scrabble Tournament",
    slug: "interhouse-scrabble-2025-26",
    date: "2025/26",
    category: "Photography",
    description: "A second-season edit of the tournament with close portraits, board details, and decisive rounds.",
    tags: ["Scrabble", "Competition", "Portraits"],
    sourceFolderUrl: "https://drive.google.com/drive/folders/1oBSrTYgBkqTqy3b1v32UWdDKxZNQIpx7",
    assets: [
      { id: "1fSfgGxSCOU3i9H7btzNpR9rL1a0Q27L1", title: "Final round" },
      { id: "12xvSmmK_92QlN1PWHGNwAhpHnqkhyf45", title: "Board detail" },
      { id: "1Hq94YxxenLKq2vH69A_tgbgZQLRSA9d9", title: "Decision" },
      { id: "1C4QhU7VYB-ffyBXERmV09N8DUQ9biv_x", title: "Across the table" },
      { id: "1jKIZl9C5g_Q6OsYO-DjiuWEhHactOS1-", title: "In play" },
    ],
  }),
  album({
    title: "InterHouse Swimming Meet",
    slug: "interhouse-swimming-2025-26",
    date: "2025/26",
    category: "Photography",
    description: "A compact edit from the latest swimming meet, balancing race action with the atmosphere around the pool.",
    tags: ["Swimming", "Sports", "Action"],
    sourceFolderUrl: "https://drive.google.com/drive/folders/1nLlPh4XRZucggGU9l8uEQD-Wclr__iDc",
    assets: [
      { id: "1hOtIzN2ilcUDc_vPEa3-hBCOPdPS_KDa", title: "Race two" },
      { id: "1CvoIunA1rj46DlnyhtUyGZygVOmjabtG", title: "Race eighteen" },
      { id: "15c7nnG_rRlETcHtfXGR7bP0IKs5Erbt8", title: "Race twenty-three" },
      { id: "1xu65hcfyUoKgKM7BqHR5vAXTMq741UKM", title: "Opening race" },
      { id: "1P7QswwXuCT61nCvfMrpGm1eUjc6UD7L_", title: "Race three" },
    ],
  }),
  album({
    title: "InterHouse Athletics Meet Films",
    slug: "interhouse-athletics-films-2025-26",
    date: "2025/26",
    category: "Video",
    description: "The trailer and post-event film produced for the InterHouse Athletics Meet.",
    tags: ["Film", "Trailer", "Post-event"],
    sourceFolderUrl: "https://drive.google.com/drive/folders/1_VN1_8dl1KuOzObWo-hkPX9xPz5S3C40",
    assets: [
      { id: "1wpXZwSGg3sMZ_ofPnwFND0kOQiUhVMgT", title: "Post-event film", type: "video" },
      { id: "1QTpOxh4KHX5JrjvrNCeNc-oDebJ81Dif", title: "Trailer", type: "video" },
    ],
  }),
  album({
    title: "YOUTH Series",
    slug: "youth-series-films",
    date: "2023 / 2025",
    category: "Video",
    description: "Campaign trailers from two editions of the ICBSS YOUTH series.",
    tags: ["Campaign", "Trailer", "Youth"],
    sourceFolderUrl: "https://drive.google.com/drive/folders/15sovf4l6kk6wWh-kB6gGXmZCkIbyIBY6",
    assets: [
      { id: "1LYNocaXDtBp08FPRSBZOPETPzf5szVif", title: "YOUTH 2K25 trailer", type: "video" },
      { id: "1tP1YCk-ks7O_ZVKgNOpee2V2HTWISXR3", title: "YOUTH 2K23 trailer", type: "video" },
    ],
  }),
  album({
    title: "Rangers Safety Systems",
    slug: "rangers-safety-systems-films",
    date: "2026",
    category: "Video",
    description: "A set of brand and social films produced for Rangers Safety Systems LLC.",
    tags: ["Brand film", "Social", "Commercial"],
    sourceFolderUrl: "https://drive.google.com/drive/folders/1RgW6o9d_6ynM-nrNDJWXOXVpMdrvmZ0k",
    assets: [
      { id: "1LJHRBniE_VIfGW6N5ISqjtd-tXSksDC2", title: "RS x UAE", type: "video" },
      { id: "1Z-cBDoz2AoB-fF3WuDzLNoeq9xmyDQO-", title: "Heat safety reel", type: "video" },
      { id: "11E_knWmApohP5A0dx1YHqi3VWksmyOHX", title: "Brand story", type: "video" },
    ],
  }),
  album({
    title: "Annual Prize Giving Films",
    slug: "annual-prize-giving-films-2024-25",
    date: "2024/25",
    category: "Video",
    description: "A landscape trailer and event-loop film created for the annual prize giving.",
    tags: ["Event film", "Trailer", "School"],
    sourceFolderUrl: "https://drive.google.com/drive/folders/1W1yUbmurL_3jjp24BhjsenTihL1yM60o",
    assets: [
      { id: "1vT3eYhL_fLJNw-USAdwanEiJbOvfSkpc", title: "Landscape trailer", type: "video" },
      { id: "1l8lgikmU0PR-qYtDU3vWoWOCMN7KjF3_", title: "Event loop", type: "video" },
    ],
  }),
  album({
    title: "Annual Prize Giving Archive",
    slug: "annual-prize-giving-films-2023-24",
    date: "2023/24",
    category: "Video",
    description: "The teaser and looping venue visual from the 2023/24 prize giving archive.",
    tags: ["Archive", "Teaser", "Event film"],
    sourceFolderUrl: "https://drive.google.com/drive/folders/1sSsT1dRl9lXa0HiCkCwxJ3vNJHLfF84a",
    assets: [
      { id: "1LFqjrtBpf4SgWKaQXcYaxwTfWMKA1IZ2", title: "Prize giving teaser", type: "video" },
      { id: "1JaEflGY1fPXywi3Xw2D1ddRBuQKQB42d", title: "Venue loop", type: "video" },
    ],
  }),
  album({
    title: "Into the Hoop",
    slug: "into-the-hoop-graphics",
    date: "2026",
    category: "Graphics & PR",
    description: "Campaign graphics and social artwork for the ICBSS Into the Hoop series.",
    tags: ["Campaign", "Social design", "ICBSS"],
    sourceFolderUrl: "https://drive.google.com/drive/folders/12ToVjV7PDJ1drZMEbIAKgHIQ0JyNKm3a",
    assets: [
      { id: "1RX4Bn8FaFR73YIpUNZ6mY9hCL6-d5YvH", title: "Campaign artwork 03" },
      { id: "1e4L4JHxUMXhHFWZ2LP1Q20nd_qg6P2gN", title: "Campaign artwork P1" },
      { id: "1hLpDkytLn5uV48v4yGVXBI7U6_VGNRw5", title: "Campaign artwork P2" },
      { id: "1GvaqpGtqeSI5sFWIS9OB9SBjEmVMAdX2", title: "Social artwork 01" },
      { id: "138i5i6V7fPaUI2Chphjcgi05waDGoYlE", title: "Social artwork 02" },
    ],
  }),
  album({
    title: "YOUTH Series Graphics",
    slug: "youth-series-graphics",
    date: "2025",
    category: "Graphics & PR",
    description: "Countdown and campaign graphics produced for the ICBSS YOUTH series.",
    tags: ["Countdown", "Campaign", "Social design"],
    sourceFolderUrl: "https://drive.google.com/drive/folders/1MYk0Wmp-ZKFuFcV9yu_NAZL_omCXQiLS",
    assets: [
      { id: "1l6YKbg541CUktSoYqptewM6mgrHrWmaq", title: "One day" },
      { id: "1gEkg4-TfClOTR0_jcfKnqDznT7sSXDqW", title: "Two days" },
      { id: "1tNebdLMjQNHf614ZfK1biYV3P8ENFy2h", title: "Campaign graphic 11" },
      { id: "1BvH-UzW9ruDp3CoSAnb91Amybv1Q5fzD", title: "Campaign graphic 12" },
    ],
  }),
  album({
    title: "ICBSS PR Series",
    slug: "icbss-pr-series",
    date: "2026",
    category: "Graphics & PR",
    description: "A modular set of paired social graphics created for ICBSS announcements and releases.",
    tags: ["PR", "Social design", "Series"],
    sourceFolderUrl: "https://drive.google.com/drive/folders/1IAKnGAqAgkKomZBERc7tdA4cMDVgdGEg",
    assets: [
      { id: "1jzin_KeDN-IIZJWTrVRe2dxCTcbMA0hO", title: "Series 03, panel one" },
      { id: "1KECsgH2lon06GJO0VCsMvMgBtm-NLviu", title: "Series 03, panel two" },
      { id: "1uu1s9G-JNEAof0Bxqmn487QPfOuOriuV", title: "Series 02, panel one" },
      { id: "17Ki5Loe6rdhyx-ryNJZAb8_7Vp7AkyaN", title: "Series 02, panel two" },
      { id: "1y0c-46NGRrKTHWLwXD3givBP8NUoSqyt", title: "Series 01, panel one" },
    ],
  }),
  album({
    title: "Space Digital",
    slug: "space-digital-graphics",
    date: "2026",
    category: "Graphics & PR",
    description: "A concise three-piece visual set developed for Space Digital.",
    tags: ["Brand", "Digital", "Social design"],
    sourceFolderUrl: "https://drive.google.com/drive/folders/1HwpwFSGoz1vb55yZZMFAOqQ40QiLR5Ra",
    assets: [
      { id: "1CNP7hPsDa88mR3wc6c061FYqxECVIk_j", title: "Space Digital 01" },
      { id: "1VMR7WePinOVci9RKoyRcPrhE2a1h5HH_", title: "Space Digital 02" },
      { id: "1A7LSqiClPeUBqHmpU9prenOx8nUW-kv7", title: "Space Digital 03" },
    ],
  }),
  album({
    title: "THC Identity",
    slug: "thc-identity",
    date: "2026",
    category: "Graphics & PR",
    description: "A focused identity asset from the Taher Hussain Creations visual system.",
    tags: ["Identity", "THC", "Brand asset"],
    sourceFolderUrl: "https://drive.google.com/drive/folders/1rUOPeuJeXOmX7Nw5kcnKkYoRwIGrIdNq",
    assets: [{ id: "18bEvjPg_SZRx4TkmlGTa95UasYdTQJ5F", title: "By THC" }],
  }),
  album({
    title: "ICBSS Merch",
    slug: "icbss-merch",
    date: "2024",
    category: "Graphics & PR",
    description: "Role-based merchandise artwork designed for the ICBSS team.",
    tags: ["Merchandise", "Apparel", "ICBSS"],
    sourceFolderUrl: "https://drive.google.com/drive/folders/1H12Dq9J8J3awCevmONpHRYrbHYQYxeZv",
    assets: [
      { id: "1Gn8CggMKcGj5jZGVAGMop7B_J-ZD_NjU", title: "General" },
      { id: "1O7HHRkWXp8AiIAAhfAiOufqfm9GASX68", title: "Editor" },
      { id: "1IpWBAqqg0XK4GZzQRUVHtXBnJezWHhpS", title: "President" },
    ],
  }),
];

export const mediaCategories = ["Photography", "Video", "Graphics & PR"] as const;

export function getMediaAlbum(slug: string) {
  return mediaAlbums.find((item) => item.slug === slug);
}
