"use client";

import Image from "next/image";
import { useMemo } from "react";
import { LayoutGroup, motion } from "framer-motion";
import { useBooking } from "@/components/booking-context";
import { useChairSelectionStore } from "@/stores/chair-selection-store";
import {
  getServiceRowsForChair,
  type ServiceCategory,
  type TestimonialStaffFilter,
} from "@/lib/constants";
import { DESIGN_BG } from "@/lib/design-assets";

const CHAIR_SEGMENTS: {
  id: TestimonialStaffFilter;
  label: string;
  ariaLabel: string;
}[] = [
  { id: "all", label: "The Shop", ariaLabel: "Show shop pricing for all chairs" },
  { id: "jimmy", label: "Jimmy's Chair", ariaLabel: "Show services and prices for Jimmy's chair" },
  { id: "nate", label: "Nate's Chair", ariaLabel: "Show services and prices for Nate's chair" },
];

function CategoryBadge({ category }: { category: ServiceCategory }) {
  const labels: Record<ServiceCategory, string> = {
    cut: "Haircut",
    shave: "Beard",
    treatment: "Treatment",
    specialist: "Specialist",
  };

  const isSpecialist = category === "specialist";

  return (
    <span
      className="inline-block text-[10px] font-semibold tracking-[0.2em] uppercase px-2 py-0.5 rounded-sm"
      style={
        isSpecialist
          ? {
              background: "rgba(212,175,55,0.08)",
              color: "var(--vintage-gold)",
              border: "1px solid rgba(212,175,55,0.45)",
              boxShadow: "inset 0 1px 0 rgba(212,175,55,0.12)",
            }
          : {
              background: "rgba(212,175,55,0.1)",
              color: "var(--vintage-gold)",
              border: "1px solid rgba(212,175,55,0.2)",
            }
      }
    >
      {labels[category]}
    </span>
  );
}

export default function ServiceGrid() {
  const { openDrawer } = useBooking();
  const selectedBarber = useChairSelectionStore((s) => s.selectedBarber);
  const setSelectedBarber = useChairSelectionStore((s) => s.setSelectedBarber);

  const rows = useMemo(
    () => getServiceRowsForChair(selectedBarber),
    [selectedBarber]
  );

  return (
    <section
      id="services"
      className="relative overflow-hidden py-24 md:py-32 px-6"
      style={{ background: "var(--background)" }}
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <Image
          src={DESIGN_BG.servicesBench}
          alt=""
          fill
          quality={82}
          sizes="100vw"
          className="object-cover object-[40%_55%] opacity-80"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,8,8,0.88) 0%, rgba(8,8,8,0.92) 50%, rgba(8,8,8,0.94) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212,175,55,0.04) 0%, transparent 55%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div
          className="sticky z-30 mb-8 rounded-xl border p-1.5 backdrop-blur-md md:mb-10"
          style={{
            top: "max(5.5rem, calc(env(safe-area-inset-top, 0px) + 4.5rem))",
            borderColor: "var(--border)",
            background: "rgba(8,8,8,0.82)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
          }}
          role="tablist"
          aria-label="Choose shop or barber chair for pricing"
        >
          <LayoutGroup id="chair-segments">
          <div className="relative flex gap-0.5 rounded-lg p-0.5">
            {CHAIR_SEGMENTS.map((seg) => {
              const on = selectedBarber === seg.id;
              return (
                <button
                  key={seg.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="services-menu-grid"
                  id={`chair-tab-${seg.id}`}
                  aria-label={seg.ariaLabel}
                  onClick={() => setSelectedBarber(seg.id)}
                  className="relative z-[1] min-h-[44px] flex-1 rounded-md px-2 py-2 text-center text-[10px] font-bold uppercase tracking-[0.12em] transition-colors sm:text-[11px] sm:tracking-[0.14em]"
                  style={{
                    color: on ? "#080808" : "var(--muted-foreground)",
                  }}
                >
                  {on ? (
                    <motion.span
                      layoutId="chairSegmentBg"
                      className="absolute inset-0 rounded-md"
                      style={{
                        background: "var(--vintage-gold)",
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
                      }}
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  ) : null}
                  <span className="relative z-[2]">{seg.label}</span>
                </button>
              );
            })}
          </div>
          </LayoutGroup>
        </div>

        <div className="mb-14">
          <p
            className="text-xs font-semibold tracking-[0.3em] uppercase mb-4"
            style={{ color: "var(--vintage-gold)" }}
          >
            The Menu
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className="text-4xl md:text-5xl font-black leading-tight"
              style={{ fontFamily: "var(--font-playfair)", color: "var(--foreground)" }}
            >
              Our Services
            </h2>
            <p
              className="max-w-sm text-sm leading-relaxed"
              style={{ color: "var(--muted-foreground)" }}
            >
              Every service is delivered with precision, patience, and product-grade quality.
            </p>
          </div>
          <span className="sera-divider mt-6" aria-hidden="true" />
        </div>

        <div
          id="services-menu-grid"
          role="tabpanel"
          aria-labelledby={`chair-tab-${selectedBarber}`}
          className="grid grid-cols-1 gap-px md:grid-cols-2"
          style={{ background: "var(--border)" }}
        >
          {rows.map((service) => (
            <article
              key={service.id}
              className="sera-card group flex min-h-[240px] flex-col justify-between p-7"
              style={{ border: "none" }}
            >
              <div>
                <div className="mb-3 flex items-start justify-between">
                  <CategoryBadge category={service.category} />
                  <span
                    className="max-w-[55%] text-right text-2xl font-black tabular-nums leading-tight"
                    style={{
                      fontFamily: "var(--font-playfair)",
                      color: "var(--foreground)",
                    }}
                  >
                    {service.quoteOnly ? "Quote" : service.priceLabel}
                  </span>
                </div>
                <h3
                  className="mt-3 mb-2 text-xl font-bold transition-colors duration-300 group-hover:text-vintage-gold"
                  style={{ fontFamily: "var(--font-playfair)", color: "var(--foreground)" }}
                >
                  {service.name}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {service.description}
                </p>
              </div>

              <div
                className="mt-6 flex items-center justify-between border-t pt-4"
                style={{ borderColor: "var(--border)" }}
              >
                <span
                  className="text-[10px] uppercase tracking-widest"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--muted-foreground)",
                  }}
                >
                  QTY: 1 {service.category.toUpperCase()}
                  {service.quoteOnly ? " · Quote in Booksy" : ` · ${service.priceLabel}`}
                </span>
                <button
                  type="button"
                  data-cursor="Book"
                  aria-label={`Book ${service.name} on Booksy`}
                  onClick={() => openDrawer(service.booksyServiceId)}
                  className="min-h-[44px] px-2 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 group-hover:text-vintage-gold touch-manipulation"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Book →
                </button>
              </div>
            </article>
          ))}
        </div>

        <p
          className="mt-10 max-w-xl text-center text-xs leading-relaxed md:text-left"
          style={{ color: "var(--muted-foreground)" }}
        >
          Non-Surgical Hair Replacement lives under our Specialist tier — see the NSHR lab for
          Nate&apos;s consultation-to-maintenance workflow.
        </p>
      </div>
    </section>
  );
}
