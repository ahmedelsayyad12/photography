export type CursorState =
  | "explore"
  | "view"
  | "open"
  | "drag"
  | "scroll"
  | "play";

export const cursorLabels: Record<CursorState, string> = {
  explore: "Explore",
  view: "View",
  open: "Open",
  drag: "Drag",
  scroll: "Scroll",
  play: "Play",
};
