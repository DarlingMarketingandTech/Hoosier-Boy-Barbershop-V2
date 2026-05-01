"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface LookbookSlide {
  id: string;
  /** Delivery URL (e.g. Cloudinary) */
  src: string;
  alt: string;
  caption: string;
  style: string;
}

interface LookbookProps {
  slides: LookbookSlide[];
}

/**
 * Editorial lookbook — centered-focus Embla carousel fed by Cloudinary `/results`.
 */
export default function Lookbook({ slides }: LookbookProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!slides.length) {
    return null;
  }

  return (
    <section
      id="lookbook"
      className="py-24 md:py-32 overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      <div className="px-6 max-w-7xl mx-auto mb-12">
        <p
          className="text-xs font-semibold tracking-[0.3em] uppercase mb-4"
          style={{ color: "var(--vintage-gold)" }}
        >
          The Lookbook
        </p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2
            className="text-4xl md:text-5xl font-black leading-tight"
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

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y select-none" style={{ gap: "1.5rem" }}>
          {slides.map((slide, index) => {
            const isActive = index === selectedIndex;
            return (
              <div
                key={slide.id}
                className="relative shrink-0 overflow-hidden transition-all duration-700"
                style={{
                  width: "clamp(280px, 78vw, 1000px)",
                  height: "clamp(340px, 55vw, 680px)",
                  filter: isActive ? "none" : "brightness(0.4) saturate(0.3)",
                  transform: isActive ? "scale(1)" : "scale(0.96)",
                  transition: "filter 0.6s ease, transform 0.6s ease",
                  borderRadius: "4px",
                  background: "var(--card)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  draggable={false}
                />

                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
                  }}
                  aria-hidden="true"
                />

                <div
                  className="absolute bottom-0 left-0 right-0 px-8 py-8 transition-opacity duration-500"
                  style={{ opacity: isActive ? 1 : 0 }}
                >
                  <p
                    className="text-[10px] font-semibold tracking-[0.28em] uppercase mb-2"
                    style={{ color: "var(--vintage-gold)" }}
                  >
                    {slide.style}
                  </p>
                  <h3
                    className="text-2xl md:text-3xl font-black"
                    style={{
                      fontFamily: "var(--font-playfair)",
                      color: "var(--foreground)",
                    }}
                  >
                    {slide.caption}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="px-6 max-w-7xl mx-auto mt-8 flex items-center justify-between">
        <div className="flex items-center gap-2" role="tablist" aria-label="Lookbook slides">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              role="tab"
              aria-selected={i === selectedIndex}
              aria-label={`Go to slide ${i + 1}: ${slide.caption}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === selectedIndex ? "24px" : "6px",
                height: "6px",
                background:
                  i === selectedIndex ? "var(--vintage-gold)" : "var(--muted)",
              }}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous slide"
            className="flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-200 disabled:opacity-30"
            style={{
              borderColor: "var(--border)",
              color: "var(--muted-foreground)",
            }}
            onMouseOver={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.borderColor = "var(--vintage-gold)";
                e.currentTarget.style.color = "var(--vintage-gold)";
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--muted-foreground)";
            }}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next slide"
            className="flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-200 disabled:opacity-30"
            style={{
              borderColor: "var(--border)",
              color: "var(--muted-foreground)",
            }}
            onMouseOver={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.borderColor = "var(--vintage-gold)";
                e.currentTarget.style.color = "var(--vintage-gold)";
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--muted-foreground)";
            }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
