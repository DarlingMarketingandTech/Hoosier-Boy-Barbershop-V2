"use client";

import { useEffect, useRef } from "react";
import { SERVICES, SHOP_META } from "@/lib/constants";

interface BookingDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function BookingDrawer({ open, onClose }: BookingDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  /* Close on Escape key */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  /* Focus trap: move focus into drawer when opened */
  useEffect(() => {
    if (open) {
      drawerRef.current?.focus();
    }
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="drawer-overlay"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet panel */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Book an appointment"
        tabIndex={-1}
        className="fixed right-0 top-0 h-full w-full max-w-md z-50 flex flex-col outline-none"
        style={{ background: "var(--card)", borderLeft: "1px solid var(--border)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b"
          style={{ borderColor: "var(--border)" }}>
          <div>
            <h2
              className="text-xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-playfair)", color: "var(--foreground)" }}
            >
              Book Your Visit
            </h2>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
              Select a service to get started
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close booking drawer"
            className="flex items-center justify-center w-9 h-9 rounded-full transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2"
            style={{ color: "var(--muted-foreground)" }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M14 4L4 14M4 4l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Service list */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {SERVICES.map((service) => (
            <div key={service.id} className="sera-card rounded-lg p-4 cursor-pointer group">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-sm font-semibold leading-snug"
                    style={{ color: "var(--foreground)" }}
                  >
                    {service.name}
                  </h3>
                  <p
                    className="text-xs mt-1 leading-relaxed line-clamp-2"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {service.description}
                  </p>
                  <p className="text-xs mt-2" style={{ color: "var(--muted-foreground)" }}>
                    {service.duration} min
                  </p>
                </div>
                <span
                  className="shrink-0 text-base font-bold tabular-nums"
                  style={{ color: "var(--vintage-gold)" }}
                >
                  ${service.price}
                </span>
              </div>
              <button
                className="mt-3 w-full py-2 rounded text-xs font-semibold tracking-wide uppercase transition-colors"
                style={{
                  background: "var(--cardinal-red)",
                  color: "#fff",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "var(--cardinal-red-hover)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "var(--cardinal-red)")
                }
                onClick={() =>
                  window.open(
                    `${SHOP_META.bookingUrl}?service=${service.id}`,
                    "_self"
                  )
                }
              >
                Select
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className="px-6 py-4 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="text-xs text-center" style={{ color: "var(--muted-foreground)" }}>
            {SHOP_META.hours.display} · {SHOP_META.phone}
          </p>
        </div>
      </div>
    </>
  );
}
