export type GalleryCategory =
  | "all"
  | "portraits"
  | "fashion"
  | "street"
  | "nature"
  | "weddings"
  | "editorial"
  | "black-white";

export interface Photo {
  id: string;
  title: string;
  category: Exclude<GalleryCategory, "all">;
  src: string;
  blurDataURL: string;
  width: number;
  height: number;
  location?: string;
  year?: string;
  camera?: string;
  featured?: boolean;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  image: string;
  count: number;
  category: Exclude<GalleryCategory, "all">;
}

export interface HorizontalPanel {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface Award {
  id: string;
  title: string;
  publication: string;
  year: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}
