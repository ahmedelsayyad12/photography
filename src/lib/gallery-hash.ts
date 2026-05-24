import type { GalleryCategory } from "@/types";

const validCategories: GalleryCategory[] = [
  "all",
  "portraits",
  "fashion",
  "street",
  "nature",
  "weddings",
  "editorial",
  "black-white",
];

export function parseGalleryCategoryFromHash(): GalleryCategory | null {
  if (typeof window === "undefined") return null;

  const raw = window.location.hash.slice(1);
  if (!raw.startsWith("work")) return null;

  const query = raw.includes("?") ? raw.split("?")[1] : "";
  if (!query) return null;

  const category = new URLSearchParams(query).get("category");
  if (category && validCategories.includes(category as GalleryCategory)) {
    return category as GalleryCategory;
  }

  return null;
}

export function galleryCategoryHref(category: Exclude<GalleryCategory, "all">) {
  return `#work?category=${category}`;
}
