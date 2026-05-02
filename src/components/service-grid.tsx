"use client";

import Image from "next/image";
import { useBooking } from "@/components/booking-context";
import { SERVICES, type ServiceCategory } from "@/lib/constants";
import { DESIGN_BG } from "@/lib/design-assets";

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px"
          style={{ background: "var(--border)" }}>
          {SERVICES.map((service) => (
            <article
              key={service.id}
              className="sera-card group p-7 flex flex-col justify-between min-h-[240px]"
              style={{ border: "none" }}
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <CategoryBadge category={service.category} />
                  <span
                    className="text-2xl font-black tabular-nums"
                    style={{
                      fontFamily: "var(--font-playfair)",
                      color: "var(--foreground)",
                    }}
                  >
                    {service.price != null ? `$${service.price}` : "—"}
                  </span>
                </div>
                <h3
                  className="text-xl font-bold mt-3 mb-2 group-hover:text-vintage-gold transition-colors duration-300"
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
                className="flex items-center justify-between mt-6 pt-4"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <span
                  className="text-[10px] tracking-widest uppercase"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--muted-foreground)",
                  }}
                >
                  QTY: 1 {service.category.toUpperCase()}
                  {service.price != null ? ` · $${service.price}` : ""}
                </span>
                <button
                  type="button"
                  data-cursor="Book"
                  disabled={!service.booksyServiceId}
                  onClick={() =>
                    service.booksyServiceId &&
                    openDrawer(service.booksyServiceId)
                  }
                  className="text-[10px] font-medium tracking-[0.18em] uppercase transition-colors duration-300 group-hover:text-vintage-gold disabled:opacity-40"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Book →
                </button>
              </div>
            </article>
          ))}
        </div>

        <p
          className="mt-10 text-xs text-center md:text-left max-w-xl leading-relaxed"
          style={{ color: "var(--muted-foreground)" }}
        >
          Non-Surgical Hair Replacement lives under our Specialist tier — see the NSHR lab for Nate&apos;s
          consultation-to-maintenance workflow.
        </p>
      </div>
    </section>
  );
}
