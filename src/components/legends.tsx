import { BARBERS } from "@/lib/constants";

function BarberCard({
  barber,
  index,
}: {
  barber: (typeof BARBERS)[number];
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <article className="flex flex-col md:flex-row items-stretch gap-0 group">
      {/* Image placeholder */}
      <div
        className={`relative w-full md:w-[42%] min-h-[380px] flex-shrink-0 overflow-hidden ${
          isEven ? "md:order-first" : "md:order-last"
        }`}
        style={{ background: "var(--card)" }}
      >
        {/* Gold accent corner */}
        <div
          className="absolute top-0 left-0 w-12 h-12 z-10"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(135deg, var(--vintage-gold) 0%, transparent 60%)",
            opacity: 0.6,
          }}
        />
        {/* Placeholder silhouette */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            width="120"
            height="150"
            viewBox="0 0 120 150"
            fill="none"
            aria-hidden="true"
            opacity={0.08}
          >
            <ellipse cx="60" cy="45" rx="32" ry="36" fill="var(--foreground)" />
            <path
              d="M10 140c0-27.6 22.4-50 50-50s50 22.4 50 50"
              fill="var(--foreground)"
            />
          </svg>
        </div>
        {/* Hover gold overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(to top, rgba(212,175,55,0.08) 0%, transparent 50%)",
          }}
          aria-hidden="true"
        />
        {/* Index label */}
        <span
          className="absolute bottom-4 right-4 text-6xl font-black leading-none select-none"
          style={{
            fontFamily: "var(--font-playfair)",
            color: "rgba(212,175,55,0.08)",
          }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Text content */}
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
        {/* Overline */}
        <p
          className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-4"
          style={{ color: "var(--vintage-gold)" }}
        >
          {barber.title}
        </p>

        {/* Name with red accent */}
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

        {/* Divider */}
        <span className="sera-divider mb-5" aria-hidden="true" />

        {/* Bio */}
        <p
          className="text-sm leading-relaxed mb-6"
          style={{ color: "var(--muted-foreground)" }}
        >
          {barber.bio}
        </p>

        {/* Specialty tag */}
        <div
          className="flex items-center gap-2 text-xs"
          style={{ color: "var(--muted-foreground)" }}
        >
          <span
            className="w-3 h-px"
            style={{ background: "var(--vintage-gold)" }}
            aria-hidden="true"
          />
          <span className="tracking-wide italic">{barber.specialty}</span>
        </div>
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
        {/* Section header */}
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

        {/* Barber cards */}
        <div className="flex flex-col gap-px" style={{ background: "var(--border)" }}>
          {BARBERS.map((barber, index) => (
            <BarberCard key={barber.id} barber={barber} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
