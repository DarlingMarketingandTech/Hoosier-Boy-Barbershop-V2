"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";
import { X } from "lucide-react";

export interface LookbookSlide {
  id: string;
  /** Pre-built Cloudinary delivery URL (server-generated). */
  src: string;
  alt: string;
}

interface LookbookProps {
  slides: LookbookSlide[];
  /** How many tiles to show in the main grid before “View more”. */
  gridVisibleCount?: number;
}

const DEFAULT_GRID_COUNT = 9;

/**
 * Editorial lookbook — grid from `hoosier-boy-barbershop/results`
 * (public IDs resolved server-side via Admin Search). Full set opens in a portfolio overlay.
 */
export default function Lookbook({
  slides,
  gridVisibleCount = DEFAULT_GRID_COUNT,
}: LookbookProps) {
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const titleId = useId();

  const close = useCallback(() => setPortfolioOpen(false), []);

  useEffect(() => {
    if (!portfolioOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [portfolioOpen, close]);

  if (!slides.length) {
    return null;
  }

  const gridSlides = slides.slice(0, gridVisibleCount);
  const hasMore = slides.length > gridVisibleCount;

  return (
    <section
      id="lookbook"
      className="overflow-hidden py-24 md:py-32"
      style={{ background: "var(--background)" }}
    >
      <div className="mx-auto mb-12 max-w-7xl px-6">
        <p
          className="mb-4 text-xs font-semibold tracking-[0.3em] uppercase"
          style={{ color: "var(--vintage-gold)" }}
        >
          The Lookbook
        </p>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2
            className="text-4xl leading-tight font-black md:text-5xl"
            style={{ fontFamily: "var(--font-playfair)", color: "var(--foreground)" }}
          >
            The Work
          </h2>
          <p
            className="max-w-xs text-sm leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            A portfolio forged behind the chair. Every cut, a statement.
          </p>
        </div>
        <span className="sera-divider mt-6" aria-hidden="true" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:gap-4 md:gap-5 lg:grid-cols-3">
          {gridSlides.map((slide, index) => (
            <li key={slide.id} className="min-w-0">
              <figure className="group relative m-0">
                <div
                  className="relative w-full overflow-hidden rounded-md bg-[var(--card)] ring-1 ring-[var(--border)]/60"
                  style={{ aspectRatio: "4 / 5" }}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 320px"
                    className="aspect-[4/5] h-full w-full rounded-md object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    loading={index < 3 ? "eager" : "lazy"}
                    quality={88}
                  />
                </div>
              </figure>
            </li>
          ))}
        </ul>

        {hasMore ? (
          <div className="mt-10 flex justify-center md:mt-12">
            <button
              type="button"
              onClick={() => setPortfolioOpen(true)}
              className="min-h-[44px] rounded-md border px-8 py-3 text-xs font-semibold uppercase tracking-[0.22em] transition-colors duration-300 hover:opacity-90"
              style={{
                borderColor: "var(--border)",
                background: "var(--card)",
                color: "var(--vintage-gold)",
                fontFamily: "var(--font-playfair)",
              }}
            >
              View full portfolio
            </button>
          </div>
        ) : null}
      </div>

      {portfolioOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/88 p-4 pt-10 pb-16 sm:p-6 sm:pt-14"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            className="relative w-full max-w-6xl rounded-lg border p-5 sm:p-8"
            style={{
              background: "var(--background)",
              borderColor: "var(--border)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.55)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-3 top-3 z-[2] flex h-11 w-11 items-center justify-center rounded-md border transition-colors hover:opacity-90 sm:right-5 sm:top-5"
              style={{
                borderColor: "var(--border)",
                background: "var(--card)",
                color: "var(--foreground)",
              }}
              aria-label="Close portfolio"
            >
              <X className="h-5 w-5" strokeWidth={2} />
            </button>

            <h3
              id={titleId}
              className="mb-2 pr-14 text-2xl font-black sm:text-3xl"
              style={{ fontFamily: "var(--font-playfair)", color: "var(--foreground)" }}
            >
              The Work
            </h3>
            <p className="mb-8 max-w-xl text-sm" style={{ color: "var(--muted-foreground)" }}>
              {slides.length} cuts from the chair — Noblesville, Indiana.
            </p>

            <ul className="m-0 grid list-none grid-cols-2 gap-2 p-0 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-4">
              {slides.map((slide, index) => (
                <li key={slide.id} className="min-w-0">
                  <div
                    className="relative w-full overflow-hidden rounded-md bg-[var(--card)] ring-1 ring-[var(--border)]/50"
                    style={{ aspectRatio: "4 / 5" }}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
                      className="aspect-[4/5] h-full w-full object-cover"
                      loading={index < 8 ? "eager" : "lazy"}
                      quality={88}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </section>
  );
}
