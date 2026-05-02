import ContactBookCta from "@/components/contact-book-cta";
import Image from "next/image";
import Link from "next/link";
import { DESIGN_BG } from "@/lib/design-assets";
import {
  Accessibility,
  Baby,
  CarFront,
  CreditCard,
  Wifi,
} from "lucide-react";
import { SHOP_META, WEEKLY_HOURS, type WeekdayLong } from "@/lib/constants";
import LiveStatusBadge from "@/components/live-status-badge";
import { formatHoursSummary } from "@/lib/hours";

const AMENITIES: { icon: typeof CarFront; label: string }[] = [
  { icon: CarFront, label: "Parking available" },
  { icon: CreditCard, label: "Credit cards accepted" },
  { icon: Baby, label: "Child-friendly" },
  { icon: Wifi, label: "Guest Wi-Fi" },
  { icon: Accessibility, label: "Accessible entrance" },
];

function formatShiftLine(day: WeekdayLong): string | null {
  const shifts = WEEKLY_HOURS[day];
  if (!shifts?.length) return null;
  const fmt = (hm: string) => {
    const [h, m] = hm.split(":").map(Number);
    const suffix = h >= 12 ? "PM" : "AM";
    const h12 = ((h + 11) % 12) + 1;
    return `${h12}:${m.toString().padStart(2, "0")} ${suffix}`;
  };
  return shifts.map((s) => `${fmt(s.open)}–${fmt(s.close)}`).join(" · ");
}

const ORDERED_DAYS: WeekdayLong[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function ContactSection() {
  const lines = ORDERED_DAYS.map((day) => {
    const range = formatShiftLine(day);
    const short = day.slice(0, 3).toUpperCase();
    if (!range) return `${short}: Closed`;
    return `${short}: ${range}`;
  });

  const mapsQuery = encodeURIComponent(
    `${SHOP_META.address.street}${SHOP_META.address.suite ? ` ${SHOP_META.address.suite}` : ""}, ${SHOP_META.address.city}, ${SHOP_META.address.state} ${SHOP_META.address.zip}`
  );

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t py-24 md:py-32 px-6"
      style={{
        background: "var(--background)",
        borderColor: "var(--border)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <Image
          src={DESIGN_BG.contactEntry}
          alt=""
          fill
          quality={85}
          sizes="100vw"
          className="object-cover object-[45%_center]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(8,8,8,0.94) 0%, rgba(8,8,8,0.88) 45%, rgba(8,8,8,0.82) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 20% 50%, rgba(8,8,8,0.35) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-start gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <p
            className="text-xs font-semibold tracking-[0.3em] uppercase mb-4"
            style={{ color: "var(--vintage-gold)" }}
          >
            Visit · Noblesville
          </p>
          <h2
            className="text-4xl md:text-5xl font-black leading-tight mb-6"
            style={{
              fontFamily: "var(--font-playfair)",
              color: "var(--foreground)",
            }}
          >
            Contact
            <br />
            <span style={{ color: "var(--cardinal-red)" }}>Us</span>
          </h2>
          <span className="sera-divider mb-8" aria-hidden="true" />

          <address
            className="not-italic text-base leading-relaxed mb-6"
            style={{ color: "var(--muted-foreground)" }}
          >
            {SHOP_META.name}
            <br />
            {SHOP_META.address.street}
            {SHOP_META.address.suite ? (
              <>
                <br />
                {SHOP_META.address.suite}
              </>
            ) : null}
            <br />
            {SHOP_META.address.city}, {SHOP_META.address.state}{" "}
            {SHOP_META.address.zip}
          </address>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <LiveStatusBadge />
            <Link
              href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold tracking-[0.14em] uppercase underline-offset-4 hover:underline"
              style={{ color: "var(--vintage-gold)" }}
            >
              Open in Maps
            </Link>
          </div>

          <div className="flex flex-col gap-4 text-sm">
            <div>
              <p
                className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: "var(--vintage-gold)" }}
              >
                Call us
              </p>
              <a
                href={`tel:${SHOP_META.phone.replace(/\D/g, "")}`}
                className="font-medium hover:text-vintage-gold transition-colors"
                style={{ color: "var(--foreground)" }}
              >
                {SHOP_META.phone}
              </a>
            </div>
            <div>
              <p
                className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: "var(--vintage-gold)" }}
              >
                Email
              </p>
              <a
                href={`mailto:${SHOP_META.email}`}
                className="font-medium break-all hover:text-vintage-gold transition-colors"
                style={{ color: "var(--foreground)" }}
              >
                {SHOP_META.email}
              </a>
            </div>
            <ContactBookCta />
          </div>
        </div>

        <div>
          <p
            className="text-[10px] font-semibold tracking-[0.28em] uppercase mb-4"
            style={{ color: "var(--vintage-gold)" }}
          >
            Hours & Amenities
          </p>
          <p
            className="text-sm mb-6 leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            {formatHoursSummary()}
          </p>
          <ul
            className="space-y-2 mb-10 text-xs md:text-sm font-medium"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--muted-foreground)",
            }}
          >
            {lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>

          <p
            className="text-[10px] tracking-[0.25em] uppercase mb-4"
            style={{ color: "var(--muted-foreground)" }}
          >
            Amenities
          </p>
          <div className="flex flex-wrap gap-6">
            {AMENITIES.map(({ icon: Icon, label }) => (
              <span
                key={label}
                title={label}
                className="flex flex-col items-center gap-2 w-14"
              >
                <Icon
                  size={22}
                  strokeWidth={1.25}
                  style={{ color: "var(--vintage-gold)", opacity: 0.85 }}
                  aria-hidden="true"
                />
                <span className="sr-only">{label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
