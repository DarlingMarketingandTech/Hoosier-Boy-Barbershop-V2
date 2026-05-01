import Link from "next/link";
import { NSHR_SERVICES, SHOP_META } from "@/lib/constants";

export default function NshrSection() {
  return (
    <section
      id="nshr"
      className="relative py-24 md:py-32 px-6 overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212,175,55,0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.35) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-12 md:mb-16">
          <p
            className="text-xs font-semibold tracking-[0.3em] uppercase mb-4"
            style={{ color: "var(--vintage-gold)" }}
          >
            Specialist Division
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <h2
                className="text-4xl md:text-5xl font-black leading-tight mb-4"
                style={{
                  fontFamily: "var(--font-playfair)",
                  color: "var(--foreground)",
                }}
              >
                Non-Surgical
                <br />
                <span style={{ color: "var(--vintage-gold)" }}>Hair Replacement</span>
              </h2>
              <p
                className="text-sm md:text-base leading-relaxed"
                style={{ color: "var(--muted-foreground)" }}
              >
                Nate Shepherd leads Hoosier Boy&apos;s NSHR program — measured installs,
                breathable adhesives, and maintenance rhythm built like equipment service,
                not guesswork. Consult first. Install once the map is right.
              </p>
            </div>
            <p
              className="text-[11px] tracking-[0.22em] uppercase shrink-0"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--vintage-gold)",
                opacity: 0.85,
              }}
            >
              PRECISION LAB · NSHR-PROGRAM // NOBLESVILLE, IN
            </p>
          </div>
          <span className="sera-divider mt-8" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NSHR_SERVICES.map((svc) => (
            <article
              key={svc.id}
              className="relative rounded-sm p-7 md:p-8 flex flex-col justify-between min-h-[260px]"
              style={{
                background:
                  "linear-gradient(145deg, rgba(20,20,20,0.96) 0%, rgba(10,10,10,0.98) 100%)",
                border: "1px solid rgba(212,175,55,0.35)",
                boxShadow:
                  "inset 0 1px 0 rgba(212,175,55,0.12), 0 24px 48px rgba(0,0,0,0.35)",
              }}
            >
              <div>
                <p
                  className="text-[10px] font-semibold tracking-[0.28em] uppercase mb-3"
                  style={{ color: "var(--vintage-gold)" }}
                >
                  Tier · Specialist
                </p>
                <h3
                  className="text-xl md:text-2xl font-black mb-3"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    color: "var(--foreground)",
                  }}
                >
                  {svc.name}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {svc.description}
                </p>
              </div>

              <div className="mt-8 pt-5" style={{ borderTop: "1px solid rgba(212,175,55,0.15)" }}>
                <p
                  className="text-[11px] leading-relaxed tracking-wide"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--muted-foreground)",
                  }}
                >
                  Service Type: {svc.code} {'//'} Duration: {svc.durationMin}min
                  <br />
                  Pricing: {svc.priceUsd != null ? `$${svc.priceUsd} USD` : "TBD — finalize with Nate"}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Link
            href={SHOP_META.bookingUrl}
            className="inline-flex px-8 py-3.5 rounded text-xs font-bold tracking-[0.12em] uppercase transition-all duration-200"
            style={{
              border: "1px solid rgba(212,175,55,0.45)",
              color: "var(--vintage-gold)",
            }}
          >
            Request NSHR Consultation
          </Link>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            Mention NSHR when booking — consultations are private and unhurried.
          </p>
        </div>
      </div>
    </section>
  );
}
