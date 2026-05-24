"use client";

import { createContext, useContext } from "react";

export interface ScrollState {
  velocity: number;
  direction: number;
  progress: number;
  scrollY: number;
}

const defaultState: ScrollState = {
  velocity: 0,
  direction: 0,
  progress: 0,
  scrollY: 0,
};

export const ScrollContext = createContext<ScrollState>(defaultState);

export function useScrollVelocity() {
  return useContext(ScrollContext);
}
