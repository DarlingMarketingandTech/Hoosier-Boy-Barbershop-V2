"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * MagneticCursor — desktop-only custom cursor.
 * Renders a small dot that follows the pointer with spring physics.
 * When hovering [data-cursor] elements, expands and shows a contextual label.
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Lazy initializer — runs once on mount, safe from SSR
  const [isVisible] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: fine)").matches;
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring config: tight for the dot, looser for the blob feel
  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Detect [data-cursor] targets for contextual label
      const target = e.target as HTMLElement;
      const magneticEl = target.closest<HTMLElement>("[data-cursor]");
      if (magneticEl) {
        setLabel(magneticEl.dataset.cursor ?? null);
        setIsHovered(true);
      } else {
        setLabel(null);
        setIsHovered(false);
      }
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    if (!isVisible) return;
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [onMouseMove, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: "none",
        mixBlendMode: "difference",
      }}
      animate={{
        width: isHovered ? 72 : 12,
        height: isHovered ? 72 : 12,
        backgroundColor: isHovered ? "#d4af37" : "#f0ece4",
        borderRadius: "9999px",
      }}
      transition={{ type: "spring", damping: 22, stiffness: 280, mass: 0.4 }}
    >
      {label && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.15 }}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#0a0a0a",
            mixBlendMode: "normal",
          }}
        >
          {label}
        </motion.span>
      )}
    </motion.div>
  );
}
