"use client";

import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { useImmersiveOptional } from "@/context/ImmersiveContext";
import { useMousePosition } from "@/hooks/useMousePosition";
import { cn } from "@/lib/utils";

const ImagePlane = dynamic(
  () => import("./ImagePlane").then((m) => m.ImagePlane),
  { ssr: false }
);

interface WebGLImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  nextSrc?: string;
  transition?: number;
  interactive?: boolean;
}

function WebGLCanvas({
  src,
  nextSrc,
  transition,
  interactive,
}: {
  src: string;
  nextSrc?: string;
  transition?: number;
  interactive?: boolean;
}) {
  const { x, y } = useMousePosition();
  const [distortion, setDistortion] = useState(0);
  const mouse = interactive
    ? {
        x: typeof window !== "undefined" ? x / window.innerWidth : 0.5,
        y: typeof window !== "undefined" ? y / window.innerHeight : 0.5,
      }
    : { x: 0.5, y: 0.5 };

  return (
    <div
      className="h-full w-full"
      onMouseEnter={() => setDistortion(1)}
      onMouseLeave={() => setDistortion(0)}
    >
      <Canvas
        camera={{ position: [0, 0, 2.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ImagePlane
            src={src}
            nextSrc={nextSrc}
            distortion={distortion}
            mouse={mouse}
            transition={transition ?? 0}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export function WebGLImage({
  src,
  alt,
  className,
  fill,
  priority,
  sizes = "100vw",
  nextSrc,
  transition = 0,
  interactive = true,
}: WebGLImageProps) {
  const immersive = useImmersiveOptional();
  const webgl = immersive?.webglEnabled ?? false;

  if (!webgl) {
    return (
      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <WebGLCanvas
        src={src}
        nextSrc={nextSrc}
        transition={transition}
        interactive={interactive}
      />
    </div>
  );
}
