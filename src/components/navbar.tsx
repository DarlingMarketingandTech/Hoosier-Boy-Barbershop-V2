"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useBooking } from "@/components/booking-context";
import MagneticWrap from "@/components/magnetic-wrap";
import { getMasterLogoUrlNavbar } from "@/components/ui/media-assets";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Partners", href: "#brand-partners" },
  { label: "Barbers", href: "#barbers" },
  { label: "Lookbook", href: "#lookbook" },
  { label: "Reviews", href: "#testimonials" },
  { label: "About", href: "#story" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { openDrawer } = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logoSrc = getMasterLogoUrlNavbar();

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 glass ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 select-none shrink-0"
            aria-label="Hoosier Boy Barbershop — Home"
          >
            <Image
              src={logoSrc}
              alt="Hoosier Boy Barbershop logo"
              width={861}
              height={902}
              className="h-10 md:h-11 w-auto"
              priority
              sizes="120px"
            />
            <span className="hidden sm:flex flex-col leading-none">
              <span
                className="text-[11px] md:text-xs font-black tracking-[0.14em] uppercase"
                style={{
                  fontFamily: "var(--font-playfair)",
                  color: "var(--vintage-gold)",
                }}
              >
                Hoosier Boy
              </span>
              <span
                className="text-[8px] tracking-[0.26em] uppercase font-medium"
                style={{ color: "var(--muted-foreground)" }}
              >
                Barbershop
              </span>
            </span>
          </Link>

          <nav
            className="hidden lg:flex items-center gap-7"
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[11px] font-medium tracking-[0.15em] uppercase transition-colors"
                style={{ color: "var(--muted-foreground)" }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = "var(--foreground)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.color = "var(--muted-foreground)")
                }
              >
                {item.label}
              </a>
            ))}
          </nav>

          <MagneticWrap className="shrink-0">
            <button
              type="button"
              onClick={() => openDrawer(null)}
              data-cursor="Book"
              className="flex items-center gap-2 px-5 py-2.5 rounded text-xs font-bold tracking-[0.12em] uppercase transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                background: "var(--cardinal-red)",
                color: "#fff",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "var(--cardinal-red-hover)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "var(--cardinal-red)";
              }}
              aria-label="Open booking drawer"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <rect x="1" y="2" width="10" height="9" rx="1" stroke="currentColor" strokeWidth="1.2" />
                <path d="M4 1v2M8 1v2M1 5h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              Book Now
            </button>
          </MagneticWrap>
        </div>
      </header>

    </>
  );
}
