/**
 * Browser extensions (password managers, form fillers, etc.) often inject
 * attributes like `fdprocessedid` before React hydrates, causing false-positive
 * hydration warnings. React's escape hatch for that class of mismatch.
 */
export const suppressExtensionHydration = {
  suppressHydrationWarning: true,
} as const;
