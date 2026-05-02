"use client";

import MagneticWrap from "@/components/magnetic-wrap";
import { useBooking } from "@/components/booking-context";

export default function ContactBookCta() {
  const { openDrawer } = useBooking();
  return (
    <MagneticWrap className="inline-flex w-fit">
      <button
        type="button"
        onClick={() => openDrawer(null)}
        className="inline-flex w-fit px-6 py-3 rounded text-xs font-bold tracking-[0.12em] uppercase transition-all duration-200"
        style={{ background: "var(--cardinal-red)", color: "#fff" }}
      >
        Book on Booksy
      </button>
    </MagneticWrap>
  );
}
