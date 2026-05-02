"use client";

import { useMemo } from "react";
import { Drawer } from "vaul";
import { getDefaultBooksyServiceIdForChair } from "@/lib/constants";
import { getBooksyShortEmbedUrl } from "@/lib/booksy";
import { useBooking } from "@/components/booking-context";
import { useChairSelectionStore } from "@/stores/chair-selection-store";

export default function BookingDrawer() {
  const { drawerOpen, closeDrawer, preselectedBooksyServiceId } = useBooking();
  const selectedBarber = useChairSelectionStore((s) => s.selectedBarber);

  const serviceId = useMemo(() => {
    if (preselectedBooksyServiceId) return preselectedBooksyServiceId;
    return getDefaultBooksyServiceIdForChair(selectedBarber);
  }, [preselectedBooksyServiceId, selectedBarber]);

  const iframeSrc = useMemo(
    () => getBooksyShortEmbedUrl(serviceId),
    [serviceId]
  );

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
                Booksy opens below — scroll to pick your time inside the frame.
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
            <div
              className="relative flex-1 w-full h-[85vh] overflow-y-auto [-webkit-overflow-scrolling:touch] bg-zinc-900 rounded-t-xl"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {drawerOpen ? (
                <iframe
                  key={serviceId}
                  src={iframeSrc}
                  className="absolute inset-0 h-full w-full border-0"
                  title="Book Appointment"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              ) : null}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
