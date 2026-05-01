import Image from "next/image";
import { BARBERS } from "@/lib/constants";
import { getBarberPortraitUrl } from "@/components/ui/media-assets";

function InstagramIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function BarberCard({
  barber,
  index,
}: {
  barber: (typeof BARBERS)[number];
  index: number;
}) {
  const isEven = index % 2 === 0;
  const portraitKey = barber.id === "jimmy" ? "jimmy" : "nate";

  return (
    <article className="flex flex-col md:flex-row items-stretch gap-0 group">
      <div
        className={`relative w-full md:w-[42%] min-h-[380px] shrink-0 overflow-hidden ${
          isEven ? "md:order-first" : "md:order-last"
        }`}
        style={{ background: "var(--card)" }}
      >
        <div
          className="absolute top-0 left-0 w-12 h-12 z-10"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(135deg, var(--vintage-gold) 0%, transparent 60%)",
            opacity: 0.6,
          }}
        />

        <Image
          src={getBarberPortraitUrl(portraitKey, "card")}
          alt={`${barber.name} — Hoosier Boy Barbershop`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 38vw"
          priority={index === 0}
        />

        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(212,175,55,0.12) 0%, transparent 55%)",
          }}
          aria-hidden="true"
        />

        <span
          className="absolute bottom-4 right-4 text-6xl font-black leading-none select-none z-10"
          style={{
            fontFamily: "var(--font-playfair)",
            color: "rgba(212,175,55,0.12)",
          }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div
        className="flex flex-col justify-center px-8 md:px-12 py-10 md:py-14 flex-1"
        style={{
          background: "var(--card)",
          borderTop: "1px solid var(--border)",
          borderRight: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          ...(isEven ? {} : { borderLeft: "1px solid var(--border)", borderRight: "none" }),
        }}
      >
        <p
          className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-4"
          style={{ color: "var(--vintage-gold)" }}
        >
          {barber.title}
        </p>

        <h3
          className="text-3xl md:text-4xl font-black leading-tight mb-5"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          <span style={{ color: "var(--foreground)" }}>
            {barber.name.split(" ")[0]}{" "}
          </span>
          <span style={{ color: "var(--cardinal-red)" }}>
            {barber.name.split(" ").slice(1).join(" ")}
          </span>
        </h3>

        <span className="sera-divider mb-5" aria-hidden="true" />

        <p
          className="text-sm leading-relaxed mb-6"
          style={{ color: "var(--muted-foreground)" }}
        >
          {barber.bio}
        </p>

        <div
          className="flex items-center gap-2 text-xs mb-5"
          style={{ color: "var(--muted-foreground)" }}
        >
          <span
            className="w-3 h-px"
            style={{ background: "var(--vintage-gold)" }}
            aria-hidden="true"
          />
          <span className="tracking-wide italic">{barber.specialty}</span>
        </div>

        <a
          href={`https://instagram.com/${barber.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="View"
          className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.12em] uppercase transition-colors duration-200 hover:text-vintage-gold"
          style={{ color: "var(--muted-foreground)" }}
          aria-label={`Follow ${barber.name} on Instagram`}
        >
          <InstagramIcon size={12} />
          @{barber.instagram}
        </a>
      </div>
    </article>
  );
}

export default function Legends() {
  return (
    <section
      id="barbers"
      className="py-24 md:py-32 px-6"
      style={{ background: "var(--background)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p
            className="text-xs font-semibold tracking-[0.3em] uppercase mb-4"
            style={{ color: "var(--vintage-gold)" }}
          >
            The Legends
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className="text-4xl md:text-5xl font-black leading-tight"
              style={{
                fontFamily: "var(--font-playfair)",
                color: "var(--foreground)",
              }}
            >
              Meet the Barbers
            </h2>
            <p
              className="max-w-sm text-sm leading-relaxed"
              style={{ color: "var(--muted-foreground)" }}
            >
              Two craftsmen. One standard. Perfection behind the chair.
            </p>
          </div>
          <span className="sera-divider mt-6" aria-hidden="true" />
        </div>

        <div className="flex flex-col gap-px" style={{ background: "var(--border)" }}>
          {BARBERS.map((barber, index) => (
            <BarberCard key={barber.id} barber={barber} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
