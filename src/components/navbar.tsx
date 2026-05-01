"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import BookingDrawer from "./booking-drawer";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 glass ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Wordmark */}
          <Link
            href="/"
            className="flex flex-col leading-none select-none"
            aria-label="Hoosier Boy Barbershop — Home"
          >
            <span
              className="text-lg font-black tracking-[0.12em] uppercase"
              style={{
                fontFamily: "var(--font-playfair)",
                color: "var(--vintage-gold)",
              }}
            >
              Hoosier Boy
            </span>
            <span
              className="text-[9px] tracking-[0.28em] uppercase font-medium"
              style={{ color: "var(--muted-foreground)" }}
            >
              Barbershop
            </span>
          </Link>

          {/* Nav Links */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Primary navigation"
          >
            {["Services", "Barbers", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs font-medium tracking-[0.15em] uppercase transition-colors"
                style={{ color: "var(--muted-foreground)" }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = "var(--foreground)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.color = "var(--muted-foreground)")
                }
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Book Now CTA */}
          <button
            onClick={() => setDrawerOpen(true)}
            data-cursor="Book"
            className="flex items-center gap-2 px-5 py-2.5 rounded text-xs font-bold tracking-[0.12em] uppercase transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              background: "var(--cardinal-red)",
              color: "#fff",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "var(--cardinal-red-hover)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "var(--cardinal-red)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
            aria-label="Open booking drawer"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <rect x="1" y="2" width="10" height="9" rx="1" stroke="currentColor" strokeWidth="1.2" />
              <path d="M4 1v2M8 1v2M1 5h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Book Now
          </button>
        </div>
      </header>

      <BookingDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}
