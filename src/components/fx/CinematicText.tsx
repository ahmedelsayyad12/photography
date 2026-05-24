"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface CinematicTextProps {
  text: string;
  as?: "h1" | "h2" | "p" | "span";
  className?: string;
  delay?: number;
  splitBy?: "char" | "word";
}

export function CinematicText({
  text,
  as: Tag = "span",
  className,
  delay = 0,
  splitBy = "word",
}: CinematicTextProps) {
  const reduced = useReducedMotion();
  const units = splitBy === "char" ? text.split("") : text.split(" ");

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={cn("inline-flex flex-wrap", className)} aria-label={text}>
      {units.map((unit, i) => (
        <span key={`${unit}-${i}`} className="overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0, filter: "blur(6px)" }}
            whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 1,
              delay: delay + i * (splitBy === "char" ? 0.03 : 0.08),
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {unit}
            {splitBy === "word" && i < units.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
