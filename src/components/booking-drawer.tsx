"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Drawer } from "vaul";
import {
  DRAWER_BOOKABLE,
  SALES_TAX_RATE,
  SHOP_META,
  type DrawerBookableRow,
} from "@/lib/constants";
import { getBooksyServiceBookingUrl } from "@/lib/booksy";
import { useBooking } from "@/components/booking-context";

const SHIFTS = [
  { id: "morning" as const, label: "Morning", hint: "8–12" },
  { id: "afternoon" as const, label: "Afternoon", hint: "12–5" },
  { id: "evening" as const, label: "Evening", hint: "5–8" },
];

function fmtMoney(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function nextFortnight(): Date[] {
  const out: Date[] = [];
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  for (let i = 0; i < 14; i++) {
    const x = new Date(d);
    x.setDate(d.getDate() + i);
    out.push(x);
  }
  return out;
}

export default function BookingDrawer() {
  const { drawerOpen, closeDrawer, preselectedBooksyServiceId } = useBooking();
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [shift, setShift] = useState<(typeof SHIFTS)[number]["id"]>("morning");
  const [emblaRef] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
  const dates = useMemo(() => nextFortnight(), []);

  useEffect(() => {
    if (!drawerOpen) return;
    if (preselectedBooksyServiceId) {
      const row = DRAWER_BOOKABLE.find(
        (b) => b.booksyServiceId === preselectedBooksyServiceId
      );
      setSelectedKey(row?.key ?? null);
    } else {
      setSelectedKey(null);
    }
  }, [drawerOpen, preselectedBooksyServiceId]);

  const selected: DrawerBookableRow | null = useMemo(
    () => DRAWER_BOOKABLE.find((b) => b.key === selectedKey) ?? null,
    [selectedKey]
  );

  const taxAndTotal = useMemo(() => {
    if (selected?.price == null) return null;
    const tax = Math.round(selected.price * SALES_TAX_RATE * 100) / 100;
    const total = Math.round((selected.price + tax) * 100) / 100;
    return { tax, total };
  }, [selected]);

  const onContinue = useCallback(() => {
    if (!selected?.booksyServiceId) return;
    window.open(
      getBooksyServiceBookingUrl(selected.booksyServiceId),
      "_blank",
      "noopener,noreferrer"
    );
    closeDrawer();
  }, [closeDrawer, selected]);

  return (
    <Drawer.Root
      open={drawerOpen}
      onOpenChange={(o) => {
        if (!o) closeDrawer();
      }}
      direction="right"
      shouldScaleBackground={false}
      setBackgroundColorOnScale={false}
    >
      <Drawer.Portal>
        <Drawer.Overlay
          className="fixed inset-0 z-[100] bg-black/55 backdrop-blur-[2px]"
          style={{ pointerEvents: "auto" }}
        />
        <Drawer.Content
          className="fixed right-0 top-0 z-[101] flex h-full w-full max-w-md flex-col outline-none"
          style={{
            background: "var(--card)",
            borderLeft: "1px solid var(--border)",
            boxShadow: "-24px 0 64px rgba(0,0,0,0.45)",
          }}
        >
          <div className="flex items-center justify-between border-b px-6 py-4"
            style={{ borderColor: "var(--border)" }}>
            <div>
              <Drawer.Title
                className="text-lg font-bold tracking-tight"
                style={{
                  fontFamily: "var(--font-playfair)",
                  color: "var(--foreground)",
                }}
              >
                Book Your Visit
              </Drawer.Title>
              <Drawer.Description
                className="text-xs mt-0.5"
                style={{ color: "var(--muted-foreground)" }}
              >
                Sera-style flow · Indiana tax estimate 5%
              </Drawer.Description>
            </div>
            <Drawer.Close asChild>
              <button
                type="button"
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/10"
                style={{ color: "var(--muted-foreground)" }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path
                    d="M14 4L4 14M4 4l10 10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </Drawer.Close>
          </div>

          <div className="border-b px-4 py-4" style={{ borderColor: "var(--border)" }}>
            <p
              className="mb-2 text-[10px] font-semibold uppercase tracking-[0.28em]"
              style={{ color: "var(--vintage-gold)" }}
            >
              Select date
            </p>
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-2">
                {dates.map((d, i) => {
                  const label = d.toLocaleDateString("en-US", { weekday: "short" });
                  const num = d.getDate();
                  const active = i === 0;
                  return (
                    <button
                      key={d.toISOString()}
                      type="button"
                      className="min-w-[4.25rem] shrink-0 rounded border px-2 py-2 text-center transition-colors"
                      style={{
                        borderColor: active ? "var(--vintage-gold)" : "var(--border)",
                        background: active ? "rgba(212,175,55,0.08)" : "transparent",
                        color: "var(--foreground)",
                      }}
                    >
                      <span className="block text-[9px] uppercase tracking-widest opacity-70">
                        {label}
                      </span>
                      <span className="text-lg font-black tabular-nums">{num}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="border-b px-4 py-3" style={{ borderColor: "var(--border)" }}>
            <p
              className="mb-2 text-[10px] font-semibold uppercase tracking-[0.28em]"
              style={{ color: "var(--vintage-gold)" }}
            >
              Preferred window
            </p>
            <div className="flex gap-1 rounded bg-black/25 p-1">
              {SHIFTS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setShift(s.id)}
                  className="flex-1 rounded py-2 text-center text-[10px] font-semibold uppercase tracking-wide transition-colors"
                  style={{
                    background: shift === s.id ? "var(--cardinal-red)" : "transparent",
                    color: shift === s.id ? "#fff" : "var(--muted-foreground)",
                  }}
                >
                  {s.label}
                  <span className="block text-[8px] font-normal opacity-80">{s.hint}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
            <p
              className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em]"
              style={{ color: "var(--vintage-gold)" }}
            >
              Service
            </p>
            <div className="space-y-2">
              {DRAWER_BOOKABLE.map((row) => {
                const on = row.key === selectedKey;
                return (
                  <button
                    key={row.key}
                    type="button"
                    onClick={() => setSelectedKey(row.key)}
                    className="w-full rounded border px-3 py-3 text-left transition-colors"
                    style={{
                      borderColor: on ? "var(--vintage-gold)" : "var(--border)",
                      background: on ? "rgba(212,175,55,0.06)" : "rgba(255,255,255,0.02)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p
                          className="text-sm font-semibold"
                          style={{
                            fontFamily: "var(--font-playfair)",
                            color: "var(--foreground)",
                          }}
                        >
                          {row.name}
                        </p>
                        <p
                          className="mt-1 line-clamp-2 text-xs leading-relaxed"
                          style={{ color: "var(--muted-foreground)" }}
                        >
                          {row.description}
                        </p>
                        <p
                          className="mt-1 text-[10px] uppercase tracking-widest"
                          style={{
                            fontFamily: "var(--font-mono)",
                            color: "var(--muted-foreground)",
                          }}
                        >
                          {row.durationMin} min
                          {row.quoteOnly ? " · Quote in Booksy" : ""}
                        </p>
                      </div>
                      <span
                        className="shrink-0 text-sm font-bold tabular-nums"
                        style={{ color: "var(--vintage-gold)" }}
                      >
                        {row.quoteOnly || row.price == null ? "—" : `$${row.price}`}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className="border-t px-6 py-4"
            style={{
              borderColor: "var(--border)",
              background: "rgba(8,8,8,0.65)",
            }}
          >
            {taxAndTotal && selected ? (
              <div className="mb-4 space-y-1">
                <p className="text-[10px] uppercase tracking-[0.22em]" style={{ color: "var(--muted-foreground)" }}>
                  Subtotal {fmtMoney(selected.price!)} · Est. tax ({Math.round(SALES_TAX_RATE * 100)}%){" "}
                  {fmtMoney(taxAndTotal.tax)}
                </p>
                <p
                  className="text-2xl font-black tabular-nums tracking-tight md:text-3xl"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--foreground)" }}
                >
                  Total: {fmtMoney(taxAndTotal.total)}
                </p>
              </div>
            ) : selected?.quoteOnly ? (
              <p className="mb-4 text-xs" style={{ color: "var(--muted-foreground)" }}>
                Pricing for {selected.name} is finalized in Booksy after consult.
              </p>
            ) : (
              <p className="mb-4 text-xs" style={{ color: "var(--muted-foreground)" }}>
                Select a service to see tax-inclusive total.
              </p>
            )}
            <button
              type="button"
              disabled={!selected}
              onClick={onContinue}
              className="w-full rounded py-3.5 text-xs font-bold uppercase tracking-[0.14em] transition-opacity disabled:opacity-40"
              style={{ background: "var(--cardinal-red)", color: "#fff" }}
            >
              Continue to Booksy
            </button>
            <p className="mt-3 text-center text-[10px]" style={{ color: "var(--muted-foreground)" }}>
              {SHOP_META.hours.display} · {SHOP_META.phone}
            </p>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
