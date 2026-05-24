"use client";

import { cn } from "@/lib/utils";
import { useMagnetic } from "@/hooks/useMagnetic";

interface MagneticButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "outline";
}

export function MagneticButton({
  children,
  className,
  variant = "primary",
  ...props
}: MagneticButtonProps) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic<HTMLButtonElement>();

  const variants = {
    primary:
      "bg-[var(--accent)]/90 text-[var(--background)] hover:bg-[var(--accent)] hover:shadow-[0_0_40px_var(--accent-glow)]",
    ghost:
      "bg-transparent text-[var(--foreground)] hover:bg-white/5 border border-white/10",
    outline:
      "bg-transparent text-[var(--foreground)] border border-white/20 hover:border-[var(--accent)]/50",
  };

  return (
    <button
      ref={ref}
      type="button"
      data-cursor="hover"
      className={cn(
        "magnetic inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium tracking-wide transition-all duration-500 ease-out",
        variants[variant],
        className
      )}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </button>
  );
}
