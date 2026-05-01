"use client";

import { useEffect, useState } from "react";
import { isOpenAt } from "@/lib/hours";

export default function LiveStatusBadge() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const refresh = () => setOpen(isOpenAt(new Date()));
    refresh();
    const id = window.setInterval(refresh, 30_000);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-semibold tracking-[0.18em] uppercase"
      style={{
        background: open ? "rgba(227,66,52,0.12)" : "rgba(136,136,136,0.08)",
        border: open
          ? "1px solid rgba(227,66,52,0.35)"
          : "1px solid rgba(255,255,255,0.08)",
        color: open ? "var(--foreground)" : "var(--muted-foreground)",
      }}
    >
      <span
        className={open ? "text-cardinal-red animate-pulse" : ""}
        aria-hidden="true"
      >
        {open ? "●" : "○"}
      </span>
      {open ? "OPEN NOW" : "CLOSED"}
      <span className="sr-only">
        {open
          ? "Hoosier Boy Barbershop is open right now."
          : "Hoosier Boy Barbershop is closed right now."}
      </span>
    </div>
  );
}
