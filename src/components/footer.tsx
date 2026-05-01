import { SHOP_META } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="px-6 py-12 border-t"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Wordmark */}
        <div className="flex flex-col items-center md:items-start leading-none">
          <span
            className="text-base font-black tracking-[0.12em] uppercase"
            style={{ fontFamily: "var(--font-playfair)", color: "var(--vintage-gold)" }}
          >
            Hoosier Boy
          </span>
          <span
            className="text-[9px] tracking-[0.28em] uppercase mt-0.5"
            style={{ color: "var(--muted-foreground)" }}
          >
            Barbershop
          </span>
        </div>

        {/* Info */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-xs"
          style={{ color: "var(--muted-foreground)" }}>
          <span>{SHOP_META.address.city}, {SHOP_META.address.state}</span>
          <span
            className="hidden md:block w-px h-3"
            style={{ background: "var(--border)" }}
            aria-hidden="true"
          />
          <a href={`tel:${SHOP_META.phone}`} className="hover:text-[var(--vintage-gold)] transition-colors">
            {SHOP_META.phone}
          </a>
          <span
            className="hidden md:block w-px h-3"
            style={{ background: "var(--border)" }}
            aria-hidden="true"
          />
          <span>{SHOP_META.hours.display}</span>
        </div>

        {/* Copyright */}
        <p className="text-[10px] tracking-wide" style={{ color: "var(--muted-foreground)" }}>
          © {year} Hoosier Boy Barbershop
        </p>
      </div>
    </footer>
  );
}
