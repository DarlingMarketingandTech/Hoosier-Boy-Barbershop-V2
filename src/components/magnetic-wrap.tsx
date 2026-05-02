"use client";

import { useCallback, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Subtle pointer-follow tilt for primary CTAs (Sera “magnetic” feel).
 */
export default function MagneticWrap({
  children,
  className = "",
  strength = 10,
}: {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees */
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(800px) rotateY(${px * strength}deg) rotateX(${-py * strength}deg)`;
    },
    [strength]
  );

  const reset = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
  }, []);

  const style: CSSProperties = {
    transformStyle: "preserve-3d",
    transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {children}
    </div>
  );
}
