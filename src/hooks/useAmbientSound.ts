"use client";

import { useCallback, useEffect, useRef } from "react";

/** Lightweight cinematic ambient drone via Web Audio API (no external files). */
export function useAmbientSound(enabled: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const pannerRef = useRef<StereoPannerNode | null>(null);
  const nodesRef = useRef<OscillatorNode[]>([]);

  const fade = useCallback((target: number, duration = 1.2) => {
    const gain = gainRef.current;
    const ctx = ctxRef.current;
    if (!gain || !ctx) return;
    const now = ctx.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(gain.gain.value, now);
    gain.gain.linearRampToValueAtTime(target, now + duration);
  }, []);

  useEffect(() => {
    if (!enabled) {
      fade(0, 0.8);
      return;
    }

    const ctx = ctxRef.current ?? new AudioContext();
    ctxRef.current = ctx;

    if (nodesRef.current.length === 0) {
      const master = ctx.createGain();
      master.gain.value = 0;

      const panner = ctx.createStereoPanner();
      panner.pan.value = 0;
      pannerRef.current = panner;

      master.connect(panner);
      panner.connect(ctx.destination);
      gainRef.current = master;

      const freqs = [55, 82.5, 110, 164.81];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = i === 0 ? "sine" : "triangle";
        osc.frequency.value = freq;
        const g = ctx.createGain();
        g.gain.value = 0.018 / (i + 1);
        osc.connect(g);
        g.connect(master);
        osc.start();
        nodesRef.current.push(osc);
      });

      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.08;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.004;
      lfo.connect(lfoGain);
      lfoGain.connect(master.gain);
      lfo.start();
    }

    if (ctx.state === "suspended") void ctx.resume();
    fade(0.12, 2);

    let rafId = 0;
    const updateSpatial = () => {
      const panner = pannerRef.current;
      const audioCtx = ctxRef.current;
      if (panner && audioCtx) {
        const pan = parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--tunnel-audio-pan"
          ) || "0"
        );
        panner.pan.setTargetAtTime(pan, audioCtx.currentTime, 0.1);
      }
      rafId = requestAnimationFrame(updateSpatial);
    };
    rafId = requestAnimationFrame(updateSpatial);

    return () => {
      cancelAnimationFrame(rafId);
      fade(0, 0.6);
    };
  }, [enabled, fade]);

  useEffect(() => {
    return () => {
      nodesRef.current.forEach((n) => {
        try {
          n.stop();
        } catch {
          /* already stopped */
        }
      });
      nodesRef.current = [];
      void ctxRef.current?.close();
      ctxRef.current = null;
    };
  }, []);

  const playAccent = useCallback((frequency = 220, duration = 0.15) => {
    if (!enabled || !ctxRef.current || !gainRef.current) return;
    const ctx = ctxRef.current;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.frequency.value = frequency;
    osc.type = "sine";
    g.gain.value = 0.03;
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(g);
    g.connect(gainRef.current);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  }, [enabled]);

  return { playAccent };
}
