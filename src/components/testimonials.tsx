"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  HAIRCUT_BOOKSY_ID,
  type Testimonial,
  type TestimonialStaffFilter,
} from "@/lib/constants";
import { useBooking } from "@/components/booking-context";
import { useChairSelectionStore } from "@/stores/chair-selection-store";
import MagneticWrap from "@/components/magnetic-wrap";

function filterReviews(
  list: Testimonial[],
  filter: TestimonialStaffFilter
): Testimonial[] {
  if (filter === "all") return list;
  return list.filter((r) => r.staffTags.includes(filter));
}

function barberCue(filter: TestimonialStaffFilter): { label: string; id: string } | null {
  if (filter === "nate") return { label: "Nate", id: HAIRCUT_BOOKSY_ID.nate };
  if (filter === "jimmy") return { label: "Jimmy", id: HAIRCUT_BOOKSY_ID.jimmy };
  return null;
}

function chairHeadline(filter: TestimonialStaffFilter): string {
  if (filter === "jimmy") return "Reviews for Jimmy's chair";
  if (filter === "nate") return "Reviews for Nate's chair";
  return "Reviews across the shop";
}

function TestimonialsBookingStrip({
  filter,
  onBook,
}: {
  filter: TestimonialStaffFilter;
  onBook: (booksyId: string) => void;
}) {
  const cue = barberCue(filter);

  if (cue) {
    return (
      <div
        className="mb-8 flex flex-col gap-4 rounded-2xl border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
        style={{
          borderColor: "rgba(227, 66, 52, 0.28)",
          background: "linear-gradient(120deg, rgba(227,66,52,0.08), rgba(20,20,20,0.6))",
        }}
      >
        <div>
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.28em]"
            style={{ color: "var(--vintage-gold)" }}
          >
            Booking
          </p>
          <p className="mt-1 text-sm font-medium" style={{ color: "var(--foreground)" }}>
            Showing reviews for {cue.label} — same chair, online.
          </p>
        </div>
        <button
          type="button"
          aria-label={`Book a haircut with ${cue.label} on Booksy`}
          onClick={() => onBook(cue.id)}
          className="min-h-[44px] shrink-0 rounded-xl border px-5 py-2.5 text-center text-[11px] font-bold uppercase tracking-[0.12em] transition-opacity hover:opacity-90 active:scale-[0.99] touch-manipulation"
          style={{
            borderColor: "var(--cardinal-red)",
            background: "var(--cardinal-red)",
            color: "#fff",
            fontFamily: "var(--font-mono)",
          }}
        >
          Book {cue.label}
        </button>
      </div>
    );
  }

  return (
    <div
      className="mb-8 flex flex-col gap-4 rounded-2xl border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
      style={{
        borderColor: "var(--border)",
        background: "linear-gradient(165deg, rgba(22,22,22,0.95), rgba(10,10,10,0.98))",
      }}
    >
      <div className="max-w-md">
        <p
          className="text-[10px] font-semibold uppercase tracking-[0.28em]"
          style={{ color: "var(--muted-foreground)" }}
        >
          One tap — not on every card
        </p>
        <p className="mt-1 text-sm leading-snug" style={{ color: "var(--foreground)" }}>
          Pick a barber here after you read the room. Cards stay clean so quotes stay the hero.
        </p>
      </div>
      <div className="flex flex-wrap gap-2 sm:justify-end">
        <button
          type="button"
          aria-label="Book a haircut with Jimmy on Booksy"
          onClick={() => onBook(HAIRCUT_BOOKSY_ID.jimmy)}
          className="min-h-[44px] min-w-[120px] rounded-xl border px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors touch-manipulation active:scale-[0.99]"
          style={{
            borderColor: "var(--border)",
            color: "var(--foreground)",
            fontFamily: "var(--font-mono)",
            background: "rgba(255,255,255,0.03)",
          }}
        >
          Book Jimmy
        </button>
        <button
          type="button"
          aria-label="Book a haircut with Nate on Booksy"
          onClick={() => onBook(HAIRCUT_BOOKSY_ID.nate)}
          className="min-h-[44px] min-w-[120px] rounded-xl border px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors touch-manipulation active:scale-[0.99]"
          style={{
            borderColor: "var(--border)",
            color: "var(--foreground)",
            fontFamily: "var(--font-mono)",
            background: "rgba(255,255,255,0.03)",
          }}
        >
          Book Nate
        </button>
      </div>
    </div>
  );
}

export default function Testimonials({ reviews }: { reviews: Testimonial[] }) {
  const selectedBarber = useChairSelectionStore((s) => s.selectedBarber);
  const { openDrawer } = useBooking();
  const visible = useMemo(
    () => filterReviews(reviews, selectedBarber),
    [reviews, selectedBarber]
  );

  return (
    <section
      id="testimonials"
      className="border-t py-16 px-4 sm:px-6 md:py-24 lg:py-32"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className="mx-auto max-w-7xl">
        <p
          className="mb-3 text-xs font-semibold uppercase tracking-[0.3em]"
          style={{ color: "var(--vintage-gold)" }}
        >
          Social proof
        </p>
        <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              className="text-3xl font-black leading-tight sm:text-4xl md:text-5xl"
              style={{ fontFamily: "var(--font-playfair)", color: "var(--foreground)" }}
            >
              Bento
              <br />
              <span style={{ color: "var(--cardinal-red)" }}>Testimonials</span>
            </h2>
            <p
              className="mt-3 text-sm font-medium"
              style={{ color: "var(--muted-foreground)" }}
            >
              {chairHeadline(selectedBarber)} — use the chair toggle above Services to switch.
            </p>
          </div>
        </div>

        <TestimonialsBookingStrip filter={selectedBarber} onBook={(id) => openDrawer(id)} />

        <div className="relative w-full overflow-hidden">
          <motion.div layout className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {visible.map((r) => (
                <motion.article
                  key={r.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col rounded-xl border p-4 sm:p-5 md:p-6"
                  style={{
                    borderColor: "var(--border)",
                    background: "linear-gradient(165deg, rgba(20,20,20,0.95), rgba(8,8,8,0.98))",
                  }}
                >
                  <MagneticWrap className="flex flex-1 flex-col">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      {r.confirmedClient ? (
                        <span
                          className="rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest"
                          style={{
                            background: "rgba(212,175,55,0.12)",
                            color: "var(--vintage-gold)",
                            border: "1px solid rgba(212,175,55,0.35)",
                          }}
                        >
                          Confirmed client
                        </span>
                      ) : null}
                      <span
                        className="text-[10px] uppercase tracking-widest"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        {r.source}
                      </span>
                    </div>
                    <p
                      className="text-base font-medium leading-snug sm:text-lg md:text-xl"
                      style={{ fontFamily: "var(--font-playfair)", color: "var(--foreground)" }}
                    >
                      “{r.quote}”
                    </p>
                    <div
                      className="mt-3 space-y-0.5 border-t pt-3 text-xs sm:mt-4 sm:pt-4"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <p className="font-semibold" style={{ color: "var(--foreground)" }}>
                        {r.author}
                      </p>
                      {r.date ? (
                        <p style={{ color: "var(--muted-foreground)" }}>{r.date}</p>
                      ) : null}
                      {r.serviceName || r.staffName ? (
                        <p
                          className="text-[11px] leading-relaxed"
                          style={{ color: "var(--muted-foreground)" }}
                        >
                          {r.serviceName ? `${r.serviceName}` : ""}
                          {r.serviceName && r.staffName ? " · " : ""}
                          {r.staffName ? `Staff: ${r.staffName}` : ""}
                        </p>
                      ) : null}
                    </div>
                  </MagneticWrap>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
