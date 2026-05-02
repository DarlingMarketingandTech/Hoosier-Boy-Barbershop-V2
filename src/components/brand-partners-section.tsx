import Image from "next/image";
import { BRAND_PARTNERS, BRAND_PARTNERS_INTRO } from "@/lib/constants";

export default function BrandPartnersSection() {
  return (
    <section
      id="brand-partners"
      className="relative overflow-hidden border-t py-24 md:py-32 px-6"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212,175,55,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.4) 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <p
          className="mb-3 text-xs font-semibold uppercase tracking-[0.3em]"
          style={{ color: "var(--vintage-gold)" }}
        >
          Retail · Shelf discipline
        </p>
        <h2
          className="mb-6 text-4xl font-black leading-tight md:text-5xl"
          style={{
            fontFamily: "var(--font-playfair)",
            color: "var(--foreground)",
          }}
        >
          Our Brand
          <br />
          <span style={{ color: "var(--cardinal-red)" }}>Partners</span>
        </h2>

        <p
          className="mb-14 max-w-3xl text-base leading-relaxed md:text-lg"
          style={{ color: "var(--muted-foreground)" }}
        >
          {BRAND_PARTNERS_INTRO}
        </p>

        <span className="sera-divider mb-12 block" aria-hidden="true" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {BRAND_PARTNERS.map((p, i) => (
            <article
              key={p.id}
              className="sera-card group flex flex-col rounded-sm p-6 md:p-7"
              style={{ border: "1px solid var(--border)" }}
            >
              <p
                className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em]"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--vintage-gold)",
                  opacity: 0.85,
                }}
              >
                {String(i + 1).padStart(2, "0")} · Partner lane
              </p>
              {p.logoSrc ? (
                <div className="relative mb-4 aspect-5/2 w-full min-h-[72px]">
                  <Image
                    src={p.logoSrc}
                    alt=""
                    fill
                    className="object-contain object-left"
                    sizes="(max-width: 1024px) 50vw, 20vw"
                  />
                </div>
              ) : (
                <div
                  className="mb-4 flex aspect-5/2 w-full items-center justify-center rounded border border-dashed text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors group-hover:border-vintage-gold/50"
                  style={{
                    borderColor: "rgba(212,175,55,0.25)",
                    color: "var(--muted-foreground)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  Logo optional
                </div>
              )}
              <h3
                className="mb-2 text-lg font-black leading-snug"
                style={{
                  fontFamily: "var(--font-playfair)",
                  color: "var(--foreground)",
                }}
              >
                {p.name}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                {p.tagline}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
