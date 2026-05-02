"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { DESIGN_BG } from "@/lib/design-assets";

/**
 * StorySection — "The Bear Repair" scrollytelling narrative.
 * The Cardinal logo silhouette and editorial copy animate in as the user scrolls.
 */
export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  const logoInView = useInView(logoRef, { once: true, margin: "-15%" });
  const copyInView = useInView(copyRef, { once: true, margin: "-15%" });

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative overflow-hidden py-32 md:py-48 px-6"
      style={{ background: "var(--background)" }}
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <Image
          src={DESIGN_BG.storyLogoGlass}
          alt=""
          fill
          quality={82}
          sizes="100vw"
          className="object-cover object-[72%_center] opacity-90"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.88) 48%, rgba(8,8,8,0.78) 100%)",
          }}
        />
      </div>

      {/* Subtle gold gradient bleed */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* ── Cardinal Logo Silhouette (left) ── */}
        <motion.div
          ref={logoRef}
          initial={{ opacity: 0, scale: 0.88, rotate: -6 }}
          animate={
            logoInView
              ? { opacity: 1, scale: 1, rotate: 0 }
              : { opacity: 0, scale: 0.88, rotate: -6 }
          }
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center"
        >
          {/* Decorative ring */}
          <div
            className="absolute rounded-full"
            style={{
              width: "clamp(260px, 40vw, 480px)",
              height: "clamp(260px, 40vw, 480px)",
              border: "1px solid rgba(212,175,55,0.12)",
            }}
            aria-hidden="true"
          />
          {/* Cardinal SVG — editorial placeholder */}
          <svg
            viewBox="0 0 200 200"
            fill="none"
            aria-label="Hoosier Boy Cardinal logo"
            style={{
              width: "clamp(180px, 28vw, 340px)",
              height: "clamp(180px, 28vw, 340px)",
            }}
          >
            {/* Body */}
            <ellipse cx="100" cy="115" rx="42" ry="52" fill="var(--cardinal-red)" opacity="0.9" />
            {/* Head */}
            <circle cx="100" cy="68" r="26" fill="var(--cardinal-red)" opacity="0.9" />
            {/* Crest */}
            <path
              d="M100 42 L108 26 L100 34 L92 20 L100 42Z"
              fill="var(--cardinal-red)"
            />
            {/* Eye */}
            <circle cx="108" cy="65" r="4" fill="#0a0a0a" />
            <circle cx="109.5" cy="63.5" r="1.5" fill="var(--vintage-gold)" />
            {/* Beak */}
            <path d="M114 70 L126 68 L114 74Z" fill="var(--vintage-gold)" />
            {/* Wing detail */}
            <path
              d="M62 120 Q55 90 74 78 Q90 100 100 115 Q80 118 62 120Z"
              fill="#c93628"
              opacity="0.7"
            />
            <path
              d="M138 120 Q145 90 126 78 Q110 100 100 115 Q120 118 138 120Z"
              fill="#c93628"
              opacity="0.7"
            />
            {/* Tail */}
            <path d="M100 167 L90 190 L100 178 L110 190 Z" fill="var(--cardinal-red)" opacity="0.8" />
          </svg>

          {/* Gold glow beneath logo */}
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full blur-3xl"
            style={{
              width: "60%",
              height: "40px",
              background: "rgba(212,175,55,0.18)",
            }}
            aria-hidden="true"
          />
        </motion.div>

        {/* ── Editorial Copy (right) ── */}
        <motion.div
          ref={copyRef}
          initial={{ opacity: 0, x: 32 }}
          animate={copyInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 32 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="flex flex-col gap-6"
        >
          <p
            className="text-xs font-semibold tracking-[0.3em] uppercase"
            style={{ color: "var(--vintage-gold)" }}
          >
            The Craft
          </p>

          <h2
            className="text-4xl md:text-5xl font-black leading-tight"
            style={{ fontFamily: "var(--font-playfair)", color: "var(--foreground)" }}
          >
            The Bear
            <br />
            <span style={{ color: "var(--cardinal-red)" }}>Repair</span>
          </h2>

          <span className="sera-divider" aria-hidden="true" />

          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--muted-foreground)", maxWidth: "42ch" }}
          >
            Our story begins in 2022 when two friends, Jimmy Bissonette and Nathan
            Gouty, had a vision of creating a barbershop that not only offers
            top-quality grooming services but also fosters a sense of community among
            its customers.
          </p>

          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--muted-foreground)", maxWidth: "42ch" }}
          >
            Not every mechanic works on cars. Ours works on men. The Bear Repair
            is the full Hoosier Boy experience — a precision cut, hot-towel beard
            shaping, scalp massage, and a finishing style that lasts. Built for
            the man who doesn&apos;t settle.
          </p>

          {/* Feature list */}
          <ul className="flex flex-col gap-3 mt-2">
            {[
              "Precision Haircut & Scissor Finish",
              "Hot-Towel Beard Shaping",
              "Scalp Massage & Oil Treatment",
              "Pomade Style & Walk-Out Ready",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm"
                style={{ color: "var(--muted-foreground)" }}>
                <span
                  className="w-4 h-px shrink-0"
                  style={{ background: "var(--vintage-gold)" }}
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>

          {/* Monospace data tag */}
          <p
            className="mt-4 text-xs tracking-widest"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--vintage-gold)",
              opacity: 0.7,
            }}
          >
            MENU ANCHOR #SERVICES // CLASSIC CUT FROM $45 // NSHR LAB SEPARATE
          </p>

          <a
            href="#services"
            data-cursor="Book"
            className="mt-2 self-start px-7 py-3 rounded text-xs font-bold tracking-[0.12em] uppercase transition-all duration-200"
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
            View The Menu
          </a>
        </motion.div>
      </div>
    </section>
  );
}
