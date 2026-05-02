"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import LiveStatusBadge from "@/components/live-status-badge";
import { useBooking } from "@/components/booking-context";
import MagneticWrap from "@/components/magnetic-wrap";
import { SITE_CONFIG, SHOP_META } from "@/lib/constants";
import { formatHeroHoursBadge } from "@/lib/hours";
import { DESIGN_BG } from "@/lib/design-assets";
import { getMasterLogoUrlHero } from "@/components/ui/media-assets";

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
  const { openDrawer } = useBooking();
  const logoSrc = getMasterLogoUrlHero();
  const [hoursBadge, setHoursBadge] = useState(() =>
    formatHeroHoursBadge(new Date())
  );

  useEffect(() => {
    const tick = () => setHoursBadge(formatHeroHoursBadge(new Date()));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <Image
          src={DESIGN_BG.heroWorkstation}
          alt=""
          fill
          priority
          quality={88}
          sizes="100vw"
          className="object-cover object-[58%_42%] scale-105 sm:scale-100"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,8,8,0.72) 0%, rgba(8,8,8,0.82) 42%, rgba(8,8,8,0.9) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 85% 65% at 50% 38%, rgba(8,8,8,0.15) 0%, rgba(8,8,8,0.55) 100%)",
          }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 55%, rgba(227,66,52,0.07) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="absolute top-[30%] left-0 right-0 z-[1] h-px origin-left"
        style={{ background: "linear-gradient(to right, transparent, var(--border), transparent)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0.05}
          className="mb-8"
        >
          <Image
            src={logoSrc}
            alt="Hoosier Boy Barbershop crest"
            width={861}
            height={902}
            priority
            className="w-[min(52vw,280px)] md:w-[min(38vw,340px)] h-auto drop-shadow-[0_12px_48px_rgba(212,175,55,0.12)]"
            sizes="(max-width: 768px) 52vw, 340px"
          />
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="flex flex-wrap items-center justify-center gap-3 mb-6"
        >
          <LiveStatusBadge />
          <span
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-[0.2em] uppercase"
            style={{
              background: "rgba(212,175,55,0.08)",
              border: "1px solid rgba(212,175,55,0.2)",
              color: "var(--vintage-gold)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "var(--vintage-gold)" }}
              aria-hidden="true"
            />
            {hoursBadge}
          </span>
        </motion.div>

        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="text-xs font-semibold tracking-[0.35em] uppercase mb-8"
          style={{ color: "var(--vintage-gold)" }}
        >
          {SHOP_META.address.city}, {SHOP_META.address.state} · Est. 2018
        </motion.p>

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

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.85}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticWrap>
            <button
              type="button"
              onClick={() => openDrawer(null)}
              data-cursor="Book"
              className="px-8 py-3.5 text-sm font-bold tracking-[0.12em] uppercase rounded transition-all duration-200"
              style={{ background: "var(--cardinal-red)", color: "#fff" }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--cardinal-red-hover)";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--cardinal-red)";
              }}
            >
              Book Now
            </button>
          </MagneticWrap>
          <a
            href="#services"
            data-cursor="View"
            className="px-8 py-3.5 text-sm font-bold tracking-[0.12em] uppercase rounded transition-all duration-200 border"
            style={{
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--vintage-gold)";
              (e.currentTarget as HTMLElement).style.color = "var(--vintage-gold)";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.color = "var(--foreground)";
            }}
          >
            View Services
          </a>
          <a
            href="#barbers"
            data-cursor="View"
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

      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8, repeat: Infinity, repeatType: "mirror" }}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
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
