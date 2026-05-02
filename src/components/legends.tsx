import Image from "next/image";
import { BARBERS } from "@/lib/constants";
import { getBarberPortraitUrl, getTeamPhotoUrl } from "@/components/ui/media-assets";

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

function TeamPhotoBanner() {
  return (
    <div
      className="relative w-full overflow-hidden border border-border"
      style={{
        height: "min(420px, 56vw)",
        background: "var(--card)",
      }}
    >
      <Image
        src={getTeamPhotoUrl()}
        alt="Jimmy and Nate — Hoosier Boy Barbershop"
        fill
        className="object-cover"
        sizes="(max-width: 1280px) 100vw, 1280px"
      />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to top, rgba(8,8,8,0.75) 0%, rgba(8,8,8,0.25) 60%, transparent 100%)",
        }}
      />
      <p
        className="pointer-events-none absolute bottom-6 left-0 right-0 px-4 text-center text-xs font-semibold uppercase tracking-[0.25em] md:bottom-8 md:text-sm"
        style={{
          fontFamily: "var(--font-playfair)",
          color: "rgba(212,175,55,0.92)",
          textShadow: "0 2px 12px rgba(0,0,0,0.6)",
        }}
      >
        Built on Brotherhood. Refined in Noblesville.
      </p>
    </div>
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
    <article
      id={`barber-${barber.id}`}
      className="scroll-mt-[120px] flex flex-col items-stretch gap-0 group md:flex-row"
    >
      <div
        className={`relative aspect-square w-full shrink-0 overflow-hidden md:mx-auto md:w-[42%] md:max-w-md ${
          isEven ? "md:order-first" : "md:order-last"
        }`}
        style={{ background: "var(--card)" }}
      >
        <div
          className="absolute top-0 left-0 z-10 h-12 w-12"
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
          className="aspect-square object-cover grayscale transition-all duration-500 hover:grayscale-0 group-hover:scale-[1.02] group-hover:grayscale-0"
          sizes="(max-width: 768px) 100vw, min(480px, 38vw)"
          priority={index === 0}
        />

        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(to top, rgba(212,175,55,0.12) 0%, transparent 55%)",
          }}
          aria-hidden="true"
        />

        <span
          className="absolute bottom-4 right-4 z-10 select-none text-6xl font-black leading-none"
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
        className="flex flex-1 flex-col justify-center px-8 py-10 md:px-12 md:py-14"
        style={{
          background: "var(--card)",
          borderTop: "1px solid var(--border)",
          borderRight: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          ...(isEven ? {} : { borderLeft: "1px solid var(--border)", borderRight: "none" }),
        }}
      >
        <p
          className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em]"
          style={{ color: "var(--vintage-gold)" }}
        >
          {barber.title}
        </p>

        <h3
          className="mb-5 text-3xl leading-tight font-black md:text-4xl"
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
          className="mb-6 text-sm leading-relaxed"
          style={{ color: "var(--muted-foreground)" }}
        >
          {barber.bio}
        </p>

        <div
          className="mb-5 flex items-center gap-2 text-xs"
          style={{ color: "var(--muted-foreground)" }}
        >
          <span
            className="h-px w-3"
            style={{ background: "var(--vintage-gold)" }}
            aria-hidden="true"
          />
          <span className="italic tracking-wide">{barber.specialty}</span>
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
      className="px-6 py-24 md:py-32"
      style={{ background: "var(--background)" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ color: "var(--vintage-gold)" }}
          >
            The Legends
          </p>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2
              className="text-4xl leading-tight font-black md:text-5xl"
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
          <TeamPhotoBanner />
        </div>
      </div>
    </section>
  );
}
