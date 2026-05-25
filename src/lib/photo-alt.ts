import { siteConfig } from "@/data/photography";
import type { Photo } from "@/types";

export function photoAlt(photo: Photo): string {
  const place = photo.location ? `, ${photo.location}` : "";
  return `${photo.title} — ${photo.category} photography by ${siteConfig.name}${place}`;
}
