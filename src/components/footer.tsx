import Image from "next/image";
import { INSTAGRAM_PROFILE_URL, SHOP_META } from "@/lib/constants";
import { getMasterLogoUrlNavbar } from "@/components/ui/media-assets";

export default function Footer() {
  const logoSrc = getMasterLogoUrlNavbar();
  const year = new Date().getFullYear();

  const addressLine = [
    SHOP_META.address.city,
    SHOP_META.address.state,
  ].join(", ");

  return (
    <footer
      className="px-6 py-12 border-t"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center md:items-start gap-3 sm:gap-4 leading-none">
          <Image
            src={logoSrc}
            alt="Hoosier Boy Barbershop logo"
            width={861}
            height={902}
            className="h-9 w-auto opacity-90"
            sizes="80px"
          />
          <div className="flex flex-col items-center md:items-start">
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
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-xs text-center md:text-left"
          style={{ color: "var(--muted-foreground)" }}>
          <span>
            {SHOP_META.address.street}
            {SHOP_META.address.suite ? `, ${SHOP_META.address.suite}` : ""}
            <span className="hidden md:inline">
              <br />
            </span>
            <span className="md:hidden"> · </span>
            {addressLine} {SHOP_META.address.zip}
          </span>
          <span
            className="hidden md:block w-px h-3"
            style={{ background: "var(--border)" }}
            aria-hidden="true"
          />
          <a href={`tel:${SHOP_META.phone.replace(/\D/g, "")}`} className="hover:text-vintage-gold transition-colors">
            {SHOP_META.phone}
          </a>
          <span
            className="hidden md:block w-px h-3"
            style={{ background: "var(--border)" }}
            aria-hidden="true"
          />
          <a
            href={`mailto:${SHOP_META.email}`}
            className="hover:text-vintage-gold transition-colors break-all max-w-[200px] md:max-w-none"
          >
            {SHOP_META.email}
          </a>
          <span
            className="hidden md:block w-px h-3"
            style={{ background: "var(--border)" }}
            aria-hidden="true"
          />
          <span className="font-mono text-zinc-300 max-w-[min(100%,22rem)] text-center md:text-left">
            {SHOP_META.hours.display}
          </span>
          <span
            className="hidden md:block w-px h-3"
            style={{ background: "var(--border)" }}
            aria-hidden="true"
          />
          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-vintage-gold transition-colors"
          >
            Instagram
          </a>
        </div>

        <p className="text-[10px] tracking-wide" style={{ color: "var(--muted-foreground)" }}>
          © {year} Hoosier Boy Barbershop
        </p>
      </div>
    </footer>
  );
}
