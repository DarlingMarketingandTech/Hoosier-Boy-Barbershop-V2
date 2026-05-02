"use client";

import { useCallback, useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export default function PwaInstallBanner() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onBip = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", onBip);
    return () => window.removeEventListener("beforeinstallprompt", onBip);
  }, []);

  const install = useCallback(async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice.catch(() => undefined);
    setDeferred(null);
    setVisible(false);
  }, [deferred]);

  if (!visible || dismissed || !deferred) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-85 px-3 pb-[calc(4.25rem+env(safe-area-inset-bottom,0))] pt-2 lg:hidden pointer-events-none"
      aria-live="polite"
    >
      <div
        className="pointer-events-auto mx-auto flex max-w-lg items-center justify-between gap-3 rounded-2xl border px-4 py-3 shadow-2xl backdrop-blur-xl"
        style={{
          borderColor: "var(--border)",
          background: "rgba(12,12,12,0.92)",
        }}
      >
        <p className="text-[11px] leading-snug" style={{ color: "var(--foreground)" }}>
          <span className="font-semibold">Install the app</span>
          <span className="block opacity-80">Add Hoosier Boy to your home screen for one-tap booking.</span>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            className="rounded-lg px-3 py-2 text-[10px] font-bold uppercase tracking-wide"
            style={{
              border: "1px solid var(--border)",
              color: "var(--muted-foreground)",
            }}
            onClick={() => {
              setDismissed(true);
              setVisible(false);
            }}
          >
            Later
          </button>
          <button
            type="button"
            className="rounded-lg px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-white"
            style={{ background: "var(--cardinal-red)" }}
            onClick={() => void install()}
          >
            Install
          </button>
        </div>
      </div>
    </div>
  );
}
