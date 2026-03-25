import { useLayoutEffect, useRef } from "react";
import { CALENDLY_BOOKING_URL, ensureCalendlyLoaded } from "@/lib/calendly";

export default function CalendlyInlineEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const parent = containerRef.current;
    if (!parent) return;

    let cancelled = false;

    void (async () => {
      try {
        await ensureCalendlyLoaded();
      } catch {
        return;
      }
      if (cancelled || !parent) return;
      parent.innerHTML = "";
      window.Calendly?.initInlineWidget?.({
        url: CALENDLY_BOOKING_URL,
        parentElement: parent,
      });
    })();

    return () => {
      cancelled = true;
      parent.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="calendly-inline-widget"
      {...{ "data-url": CALENDLY_BOOKING_URL }}
      {...{ "data-auto-load": "true" }}
      style={{ minWidth: 320, height: 900 }}
    />
  );
}
