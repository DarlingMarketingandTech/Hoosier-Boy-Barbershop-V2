import Image from "next/image";

export interface LookbookSlide {
  id: string;
  /** Pre-built Cloudinary delivery URL (server-generated). */
  src: string;
  alt: string;
  caption: string;
  style: string;
}

interface LookbookProps {
  slides: LookbookSlide[];
}

/**
 * Editorial lookbook — six-up grid from `hoosier-boy-barbershop/results`
 * (public IDs resolved server-side via Admin Search).
 */
export default function Lookbook({ slides }: LookbookProps) {
  if (!slides.length) {
    return null;
  }

  return (
    <section
      id="lookbook"
      className="py-24 md:py-32 overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      <div className="px-6 max-w-7xl mx-auto mb-12">
        <p
          className="text-xs font-semibold tracking-[0.3em] uppercase mb-4"
          style={{ color: "var(--vintage-gold)" }}
        >
          The Lookbook
        </p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2
            className="text-4xl md:text-5xl font-black leading-tight"
            style={{ fontFamily: "var(--font-playfair)", color: "var(--foreground)" }}
          >
            The Work
          </h2>
          <p
            className="max-w-xs text-sm leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            A portfolio forged behind the chair. Every cut, a statement.
          </p>
        </div>
        <span className="sera-divider mt-6" aria-hidden="true" />
      </div>

      <div className="px-6 max-w-7xl mx-auto">
        <ul className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 list-none p-0 m-0">
          {slides.map((slide, index) => (
            <li key={slide.id} className="min-w-0">
              <figure className="group relative m-0">
                <div
                  className="relative w-full overflow-hidden rounded-md bg-[var(--card)] ring-1 ring-[var(--border)]/60"
                  style={{ aspectRatio: "4 / 5" }}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 320px"
                    className="object-cover w-full h-full aspect-[4/5] rounded-md transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    loading={index < 3 ? "eager" : "lazy"}
                    quality={88}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 rounded-md opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 45%, transparent 100%)",
                    }}
                    aria-hidden="true"
                  />
                  <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <p
                      className="text-[9px] sm:text-[10px] font-semibold tracking-[0.28em] uppercase mb-1"
                      style={{ color: "var(--vintage-gold)" }}
                    >
                      {slide.style}
                    </p>
                    <p
                      className="text-base sm:text-lg font-black leading-tight"
                      style={{
                        fontFamily: "var(--font-playfair)",
                        color: "var(--foreground)",
                      }}
                    >
                      {slide.caption}
                    </p>
                  </figcaption>
                </div>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
