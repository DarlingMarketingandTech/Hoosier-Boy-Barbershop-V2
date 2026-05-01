import { SERVICES } from "@/lib/constants";

function CategoryBadge({ category }: { category: "cut" | "shave" | "treatment" }) {
  const labels: Record<string, string> = {
    cut: "Haircut",
    shave: "Shave",
    treatment: "Treatment",
  };
  return (
    <span
      className="inline-block text-[10px] font-semibold tracking-[0.2em] uppercase px-2 py-0.5 rounded-sm"
      style={{
        background: "rgba(212,175,55,0.1)",
        color: "var(--vintage-gold)",
        border: "1px solid rgba(212,175,55,0.2)",
      }}
    >
      {labels[category]}
    </span>
  );
}

export default function ServiceGrid() {
  return (
    <section
      id="services"
      className="py-24 md:py-32 px-6"
      style={{ background: "var(--background)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
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

        {/* 2-column grid */}
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
                    ${service.price}
                  </span>
                </div>
                <h3
                  className="text-xl font-bold mt-3 mb-2 group-hover:text-[var(--vintage-gold)] transition-colors duration-300"
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

              {/* Technical data row — monospace 'barber spec' aesthetic */}
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
                  QTY: 1 {service.category.toUpperCase()} · ${service.price}
                </span>
                <span
                  data-cursor="Book"
                  className="text-[10px] font-medium tracking-[0.18em] uppercase transition-colors duration-300 group-hover:text-[var(--vintage-gold)] cursor-pointer"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Book →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
