import {
  MessageSquare,
  Bell,
  BookOpen,
  CalendarClock,
  FileText,
  GraduationCap,
  Workflow,
  ClipboardList,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const items: { icon: LucideIcon; label: string }[] = [
  { icon: MessageSquare, label: "AI-assisted customer communication" },
  { icon: Bell, label: "Automated lead follow-up" },
  { icon: BookOpen, label: "Internal knowledge assistants" },
  { icon: CalendarClock, label: "Scheduling and admin workflows" },
  { icon: FileText, label: "Proposal and estimate drafting" },
  { icon: GraduationCap, label: "Team AI training and setup" },
  { icon: Workflow, label: "CRM and workflow automation" },
  { icon: ClipboardList, label: "Business process documentation" },
];

export default function WhatWeAutomate() {
  return (
    <section id="what-we-automate" className="bg-[var(--background)] py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-[var(--brand-dark)]">
            What We Can Help Automate
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mt-4">
            Most small businesses are sitting on hours of time they could get back. Here's where we
            typically find it.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-6 hover:shadow-md transition-shadow"
            >
              <div className="shrink-0 w-10 h-10 rounded-xl bg-[var(--brand-teal-light)] flex items-center justify-center">
                <Icon className="w-5 h-5 text-[var(--brand-teal)]" />
              </div>
              <p className="text-[var(--brand-dark)] font-medium leading-snug">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
