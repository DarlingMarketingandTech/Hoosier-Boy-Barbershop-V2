"use client";

import { Drawer } from "vaul";
import { BOOKSY_PROFILE_URL } from "@/lib/booksy";
import { useBooking } from "@/components/booking-context";

export default function BookingDrawer() {
  const { drawerOpen, closeDrawer } = useBooking();

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
          className="fixed right-0 top-0 z-[101] flex h-full min-h-0 w-full max-w-md flex-col outline-none"
          style={{
            background: "var(--card)",
            borderLeft: "1px solid var(--border)",
            boxShadow: "-24px 0 64px rgba(0,0,0,0.45)",
          }}
        >
          <div
            className="flex shrink-0 items-center justify-between border-b px-6 py-4"
            style={{ borderColor: "var(--border)" }}
          >
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
                className="mt-0.5 text-xs"
                style={{ color: "var(--muted-foreground)" }}
              >
                We will open our official Booksy profile in a new tab so you can pick your date and
                time.
              </Drawer.Description>
            </div>
            <Drawer.Close asChild>
              <button
                type="button"
                aria-label="Close booking drawer"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full transition-colors hover:bg-white/10"
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

          <div className="flex min-h-0 flex-1 flex-col px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2">
            <div className="flex-1 w-full min-h-[50vh] flex flex-col items-center justify-center bg-zinc-900 rounded-t-xl p-8 text-center">
              <div className="mb-6 rounded-full bg-[#D4AF37]/10 p-5 text-[#D4AF37]">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>

              <h3 className="text-2xl font-playfair text-[#f0ece4] mb-2">Secure Your Spot</h3>
              <p className="text-sm text-zinc-400 mb-8 max-w-xs">
                You are being securely routed to our official Booksy profile to select your date and
                time.
              </p>

              <a
                href={BOOKSY_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeDrawer}
                className="inline-flex min-h-[56px] w-full max-w-xs items-center justify-center rounded-full bg-[#f0ece4] px-8 text-base font-bold text-[#080808] transition-all hover:scale-105 active:scale-95"
              >
                Open Scheduler
              </a>

              <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                Opens in a secure new tab
              </p>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
