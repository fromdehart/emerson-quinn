export const CALENDLY_BOOKING_URL = "https://calendly.com/emersonandquinn/30min";

export type CalendlyInitInlineWidget = (opts: {
  url: string;
  parentElement: HTMLElement;
}) => void;

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget?: CalendlyInitInlineWidget;
    };
  }
}

const CALENDLY_WIDGET_SRC = "https://assets.calendly.com/assets/external/widget.js";

let loadPromise: Promise<void> | null = null;

function isCalendlyReady() {
  return typeof window !== "undefined" && typeof window.Calendly?.initInlineWidget === "function";
}

/** Ensures Calendly’s widget script is loaded (also preloaded from index.html when possible). */
export async function ensureCalendlyLoaded(): Promise<void> {
  if (typeof window === "undefined") return;
  if (isCalendlyReady()) return;

  if (loadPromise) return loadPromise;

  loadPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${CALENDLY_WIDGET_SRC}"]`,
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Failed to load Calendly widget")), {
        once: true,
      });
      // If the script finished loading before our listener was attached,
      // fall back to a short readiness poll.
      let attempts = 0;
      const maxAttempts = 50; // ~5s @ 100ms
      const timer = window.setInterval(() => {
        if (isCalendlyReady()) {
          window.clearInterval(timer);
          resolve();
          return;
        }
        attempts += 1;
        if (attempts >= maxAttempts) {
          window.clearInterval(timer);
          reject(new Error("Timed out waiting for Calendly widget"));
        }
      }, 100);
      return;
    }

    const script = document.createElement("script");
    script.src = CALENDLY_WIDGET_SRC;
    script.async = true;
    script.type = "text/javascript";
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", () => reject(new Error("Failed to load Calendly widget")), {
      once: true,
    });
    document.head.appendChild(script);
  });

  return loadPromise;
}
