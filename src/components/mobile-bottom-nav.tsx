"use client";

import { useBooking } from "@/components/booking-context";
import { INSTAGRAM_PROFILE_URL } from "@/lib/constants";
import {
  CalendarDays,
  Home,
  Scissors,
  Share2,
  Star,
} from "lucide-react";

function vibrateLight() {
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    navigator.vibrate(8);
  }
}

function scrollToHash(href: string) {
  vibrateLight();
  const id = href.replace(/^#/, "");
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (href === "#home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

const tabs = [
  { id: "home", label: "Home", href: "#home", icon: Home },
  { id: "services", label: "Cut", href: "#services", icon: Scissors },
  { id: "book", label: "Book", href: null as string | null, icon: CalendarDays },
  { id: "reviews", label: "Reviews", href: "#testimonials", icon: Star },
  { id: "social", label: "Gram", href: "__instagram__", icon: Share2 },
] as const;

export default function MobileBottomNav() {
  const { openDrawer } = useBooking();

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-80 border-t pb-[env(safe-area-inset-bottom,0px)]"
      style={{
        borderColor: "rgba(255,255,255,0.08)",
        background: "rgba(8,8,8,0.88)",
        backdropFilter: "blur(20px) saturate(160%)",
        WebkitBackdropFilter: "blur(20px) saturate(160%)",
      }}
      aria-label="App navigation"
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-between gap-0 px-1 pt-1">
        {tabs.map(({ id, label, href, icon: Icon }) => {
          const isBook = id === "book";
          return (
            <li key={id} className="flex-1 min-w-0">
              {isBook ? (
                <button
                  type="button"
                  onClick={() => {
                    vibrateLight();
                    openDrawer(null);
                  }}
                  className="flex w-full flex-col items-center gap-0.5 rounded-xl py-2 touch-manipulation active:scale-[0.97] transition-transform"
                  style={{ color: "var(--cardinal-red)" }}
                  aria-label="Open booking"
                >
                  <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                  <span className="text-[9px] font-bold uppercase tracking-[0.14em]">{label}</span>
                </button>
              ) : href === "__instagram__" ? (
                <a
                  href={INSTAGRAM_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full flex-col items-center gap-0.5 rounded-xl py-2 touch-manipulation active:scale-[0.97] transition-transform"
                  style={{ color: "var(--muted-foreground)" }}
                  onClick={vibrateLight}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  <span className="text-[9px] font-semibold uppercase tracking-[0.12em]">{label}</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => href && scrollToHash(href)}
                  className="flex w-full flex-col items-center gap-0.5 rounded-xl py-2 touch-manipulation active:scale-[0.97] transition-transform"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  <span className="text-[9px] font-semibold uppercase tracking-[0.12em]">{label}</span>
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
