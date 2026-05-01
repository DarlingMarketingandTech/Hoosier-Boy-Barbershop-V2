"use client";

import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";

import { type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay,
    },
  }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" as const, delay },
  }),
};

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      {/* Subtle radial backdrop */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 55%, rgba(227,66,52,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Decorative horizontal rule — top */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="absolute top-[30%] left-0 right-0 h-px origin-left"
        style={{ background: "linear-gradient(to right, transparent, var(--border), transparent)" }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Overline label */}
        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="text-xs font-semibold tracking-[0.35em] uppercase mb-8"
          style={{ color: "var(--vintage-gold)" }}
        >
          Indianapolis, Indiana · Est. 2018
        </motion.p>

        {/* Main heading */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.35}
          className="font-black leading-none uppercase"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(3.5rem, 14vw, 11rem)",
            letterSpacing: "-0.02em",
            color: "var(--foreground)",
          }}
        >
          Hoosier
          <br />
          <span style={{ color: "var(--cardinal-red)" }}>Boy</span>
        </motion.h1>

        {/* Gold divider */}
        <motion.span
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0.6}
          className="mx-auto mt-6 mb-6 block"
          style={{
            width: "3rem",
            height: "2px",
            background: "var(--vintage-gold)",
          }}
          aria-hidden="true"
        />

        {/* Sub-heading */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.7}
          className="text-lg md:text-2xl font-medium tracking-[0.08em]"
          style={{
            fontFamily: "var(--font-playfair)",
            color: "var(--muted-foreground)",
            fontStyle: "italic",
          }}
        >
          {SITE_CONFIG.tagline}
        </motion.p>

        {/* CTA row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.85}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#services"
            className="px-8 py-3.5 text-sm font-bold tracking-[0.12em] uppercase rounded transition-all duration-200"
            style={{ background: "var(--cardinal-red)", color: "#fff" }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--cardinal-red-hover)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--cardinal-red)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            View Services
          </a>
          <a
            href="#barbers"
            className="px-8 py-3.5 text-sm font-medium tracking-[0.12em] uppercase rounded border transition-all duration-200"
            style={{
              borderColor: "var(--border)",
              color: "var(--muted-foreground)",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--vintage-gold)";
              (e.currentTarget as HTMLElement).style.color = "var(--vintage-gold)";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.color = "var(--muted-foreground)";
            }}
          >
            Meet the Team
          </a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8, repeat: Infinity, repeatType: "mirror" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span
          className="text-[10px] tracking-[0.25em] uppercase"
          style={{ color: "var(--muted-foreground)" }}
        >
          Scroll
        </span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <rect x="1" y="1" width="14" height="22" rx="7" stroke="var(--muted)" strokeWidth="1.2" />
          <rect x="7" y="5" width="2" height="6" rx="1" fill="var(--vintage-gold)" />
        </svg>
      </motion.div>
    </section>
  );
}
