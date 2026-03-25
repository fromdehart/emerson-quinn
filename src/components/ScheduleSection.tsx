import CalendlyInlineEmbed from "@/components/CalendlyInlineEmbed";

export default function ScheduleSection() {
  return (
    <section id="schedule" className="scroll-mt-28 bg-[var(--background)] py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-center text-3xl font-bold text-[var(--brand-dark)] sm:text-4xl">
          Schedule a free consultation
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-slate-600">
          Pick a time that works for you — no pressure, just a conversation.
        </p>
        <CalendlyInlineEmbed />
      </div>
    </section>
  );
}
