# Build Plan: Emerson & Quinn Website

## 1. Overview

A single-page marketing website for Emerson & Quinn, a consulting firm that helps small family-run businesses improve operations with AI and practical systems. The site is fully public (no auth gate), communicates brand values, and drives visitors to book a consultation via Calendly. Form submissions are persisted in Convex and trigger a Resend email notification to the owner.

After booking via Calendly, visitors are redirected to `/before-we-meet` — a guided audio intake flow where they describe their business situation. The audio is transcribed via OpenAI Whisper, a structured summary is generated via GPT, and both the raw transcript and summary are persisted in Convex. Users may edit the summary before finalizing.

The template's gate screen, voting widget, and Telegram/voting plumbing are removed. The CSS design tokens are replaced with an E&Q brand palette (teal primary, slate-blue secondary, warm white background). All copy is final — no placeholders.

---

## 2. File Changes Required

### File: `src/index.css`
- Action: MODIFY
- Purpose: Replace color tokens and font with E&Q brand palette; keep Tailwind directives.
- Key changes:
  - Remove `@import` for Plus Jakarta Sans; add `@import` for Inter (weights 400, 500, 600, 700, 800)
  - Replace CSS variable block in `:root`:
    - `--brand-teal: #0f766e` (primary CTA, step numbers, accents)
    - `--brand-teal-light: #ccfbf1` (section backgrounds)
    - `--brand-slate: #334155` (secondary text, card borders)
    - `--brand-dark: #0f172a` (headings)
    - `--background: #fafaf9` (warm off-white)
    - `--foreground: #1e293b`
  - Update `body` `font-family` to `"Inter", ui-sans-serif, system-ui, sans-serif`
  - Add `html { scroll-behavior: smooth; }` for anchor navigation

### File: `index.html`
- Action: MODIFY
- Purpose: Update page metadata and add analytics placeholder.
- Key changes:
  - `<title>` → `Emerson & Quinn – Small Business Operations & AI Consulting`
  - `<meta name="description">` → `Emerson & Quinn helps small, family-run businesses build better systems and put AI to work — without the jargon.`
  - `<meta name="author">` → `Emerson & Quinn`
  - Update all `og:*` and `twitter:*` tags to match new title/description; remove `og:url` and `og:image` (no live URL yet)
  - Add Google Analytics stub just before `</head>`:
    ```html
    <!-- Analytics: replace G-XXXXXXXXXX with your GA4 measurement ID -->
    <script>window.gtag = window.gtag || function() { (window.dataLayer = window.dataLayer || []).push(arguments); };</script>
    ```

### File: `src/App.tsx`
- Action: MODIFY
- Purpose: Remove gate/voting scaffolding; render marketing site and before-we-meet page via router.
- Key changes:
  - Remove imports: `useState`, `useCallback`, `VoteATron3000`, `VoteATronErrorBoundary`, `GateScreen`
  - Remove `GATE_STORAGE_KEY` constant and `useGateAccess` function
  - Add imports: `BrowserRouter`, `Routes`, `Route` from `react-router-dom`
  - Add import: `BeforeWeMeet` from `./pages/BeforeWeMeet`
  - Render:
    ```tsx
    <ConvexProvider client={convex}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/before-we-meet" element={<BeforeWeMeet />} />
        </Routes>
      </BrowserRouter>
    </ConvexProvider>
    ```
  - Keep `convex` import from `./lib/convexClient`; keep `Index` import from `./pages/Index`

### File: `src/pages/Index.tsx`
- Action: MODIFY (full rewrite)
- Purpose: Assemble all marketing section components into the single-page layout.
- Key changes:
  - Import and render in order: `SiteNav`, `Hero`, `HowWeWork`, `WhyWeDoThis`, `Industries`, `Results`, `ContactSection`, `SiteFooter`
  - No local state — all state lives inside ContactSection

### File: `convex/schema.ts`
- Action: MODIFY
- Purpose: Add `contactSubmissions` and `appointmentPrep` tables.
- Key changes: Add both table definitions (see Section 3)

### File: `convex/contact.ts`
- Action: CREATE
- Purpose: Convex backend for the contact form — persist submission and schedule owner notification email.

### File: `convex/appointmentPrep.ts`
- Action: CREATE
- Purpose: Convex backend for the `/before-we-meet` flow — generate audio upload URL, transcribe audio via OpenAI Whisper, summarize via GPT, persist all three data fields with strict immutability rules.

### File: `src/components/SiteNav.tsx`
- Action: CREATE
- Purpose: Sticky navigation bar with logo and anchor links; mobile hamburger. Primary CTA links to Calendly URL.

### File: `src/components/Hero.tsx`
- Action: CREATE
- Purpose: Full-width hero with headline, subheadline, and primary CTA button linking to Calendly URL.

### File: `src/components/HowWeWork.tsx`
- Action: CREATE
- Purpose: 3-step numbered process section.

### File: `src/components/WhyWeDoThis.tsx`
- Action: CREATE
- Purpose: Values/purpose section with personal tone.

### File: `src/components/Industries.tsx`
- Action: CREATE
- Purpose: 4-card grid of industries served.

### File: `src/components/Results.tsx`
- Action: CREATE
- Purpose: Outcome bullet list section.

### File: `src/components/ContactSection.tsx`
- Action: CREATE
- Purpose: Bottom CTA copy + contact form with Convex + Resend wiring.

### File: `src/components/SiteFooter.tsx`
- Action: CREATE
- Purpose: Simple footer with copyright.

### File: `src/pages/BeforeWeMeet.tsx`
- Action: CREATE
- Purpose: Multi-step audio intake page rendered at `/before-we-meet`. Guides the user through recording, processing, reviewing, and finalizing a pre-meeting summary. Steps: `initial` → `recording` → `processing` → `review` → `done`.

### Files to leave untouched
- `convex/resend.ts` — `sendEmail` action is reused as-is
- `convex/leads.ts` — kept for template compatibility, unused by marketing site
- `convex/http.ts` — kept as-is
- `convex/tracking.ts`, `convex/votes.ts`, `convex/telegram.ts`, `convex/openai.ts` — kept, unused by marketing site; `openai.ts` may be referenced for API key pattern
- All `src/components/ui/*` — kept; ContactSection uses `Input`, `Textarea`, `Label`; BeforeWeMeet uses `Textarea`
- `src/lib/convexClient.ts`, `src/utils/*`, `src/main.tsx` — kept, unchanged

---

## 3. Convex Schema Changes

Add to `convex/schema.ts` inside `defineSchema({...})`:

```typescript
contactSubmissions: defineTable({
  name: v.string(),
  email: v.string(),
  businessType: v.string(),   // one of the 5 select options
  message: v.string(),
  createdAt: v.number(),
}).index("by_createdAt", ["createdAt"]),

appointmentPrep: defineTable({
  transcript_raw: v.string(),       // immutable after creation; source of truth
  summary_generated: v.string(),    // immutable after creation; AI-generated from transcript_raw
  summary_final: v.string(),        // mutable; initialized to summary_generated; updated on user Done
  createdAt: v.number(),
}).index("by_createdAt", ["createdAt"]),
```

No changes to existing tables (`events`, `data`, `votes`, `leads`).

---

## 4. Convex Functions

### `contact/insertSubmission` (internalMutation)
- Purpose: Persist a validated contact form submission to `contactSubmissions`.
- Args:
  ```typescript
  {
    name: v.string(),
    email: v.string(),
    businessType: v.string(),
    message: v.string(),
  }
  ```
- Returns: `void`
- Logic:
  1. Insert `{ name, email, businessType, message, createdAt: Date.now() }` into `contactSubmissions`

### `contact/submitContact` (action)
- Purpose: Public-facing action called by the contact form. Validates input, stores submission, schedules owner notification email.
- No `"use node"` directive — uses only Web APIs and Convex scheduler.
- Args:
  ```typescript
  {
    name: v.string(),
    email: v.string(),
    businessType: v.string(),
    message: v.string(),
  }
  ```
- Returns: `{ success: true as const }` or throws with a user-facing error message.
- Logic:
  1. Trim all string inputs.
  2. Validate: `name` non-empty, `email` matches `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`, `businessType` non-empty, `message` non-empty, `message.length <= 2000`. Throw descriptive Error strings on failure.
  3. Call `await ctx.runMutation(internal.contact.insertSubmission, { name, email, businessType, message })`.
  4. Read `process.env.CONTACT_NOTIFY_EMAIL`. If set, schedule the notification email:
     ```typescript
     await ctx.scheduler.runAfter(0, api.resend.sendEmail, {
       to: process.env.CONTACT_NOTIFY_EMAIL,
       subject: `New inquiry from ${name} — Emerson & Quinn`,
       html: buildNotificationHtml({ name, email, businessType, message }),
     });
     ```
  5. Return `{ success: true as const }`.
- `buildNotificationHtml` (unexported file-local function): builds a simple HTML string with all four fields. Each value is passed through `escapeHtml()`:
  ```typescript
  function escapeHtml(s: string): string {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function buildNotificationHtml(args: { name: string; email: string; businessType: string; message: string }): string {
    return `<p><strong>Name:</strong> ${escapeHtml(args.name)}</p>
  <p><strong>Email:</strong> ${escapeHtml(args.email)}</p>
  <p><strong>Business Type:</strong> ${escapeHtml(args.businessType)}</p>
  <p><strong>Message:</strong></p>
  <p>${escapeHtml(args.message).replace(/\n/g, "<br>")}</p>`;
  }
  ```

---

### `appointmentPrep/generateAudioUploadUrl` (mutation)
- Purpose: Returns a short-lived Convex storage upload URL for the client to PUT the recorded audio blob.
- Args: none
- Returns: `string` (the upload URL)
- Logic:
  1. `return await ctx.storage.generateUploadUrl();`

### `appointmentPrep/createSession` (internalMutation)
- Purpose: Create the initial `appointmentPrep` record with the raw transcript immediately after transcription completes, before summarization begins. Returns the new record's ID.
- Args:
  ```typescript
  { transcript_raw: v.string() }
  ```
- Returns: `Id<"appointmentPrep">`
- Logic:
  1. `return await ctx.db.insert("appointmentPrep", { transcript_raw, summary_generated: "", summary_final: "", createdAt: Date.now() });`
  - Note: `summary_generated` and `summary_final` are initialized to empty string and will be patched by `applySummary` immediately after. They are never left empty for longer than the duration of one action.

### `appointmentPrep/applySummary` (internalMutation)
- Purpose: Patch an existing `appointmentPrep` record with the AI-generated summary. Sets both `summary_generated` and `summary_final` to the generated value. This mutation must never overwrite `transcript_raw`.
- Args:
  ```typescript
  {
    id: v.id("appointmentPrep"),
    summary: v.string(),
  }
  ```
- Returns: `void`
- Logic:
  1. `await ctx.db.patch(id, { summary_generated: summary, summary_final: summary });`

### `appointmentPrep/updateFinalSummary` (mutation)
- Purpose: Public-facing mutation called when the user clicks Done after optionally editing the summary. Updates only `summary_final`. Never touches `transcript_raw` or `summary_generated`.
- Args:
  ```typescript
  {
    id: v.id("appointmentPrep"),
    summary_final: v.string(),
  }
  ```
- Returns: `void`
- Logic:
  1. Validate: `id` must refer to an existing `appointmentPrep` document; throw if not found.
  2. `await ctx.db.patch(id, { summary_final });`
  - Explicitly does **not** include `transcript_raw` or `summary_generated` in the patch object.

### `appointmentPrep/processAudio` (action)
- Purpose: Main action orchestrating the full intake pipeline: fetch audio from Convex storage, transcribe via OpenAI Whisper, save `transcript_raw` to DB immediately, generate structured summary via GPT, save summary, return session ID and summary for the UI.
- Directive: `"use node";` at top of file (required for FormData / OpenAI API calls).
- Args:
  ```typescript
  { storageId: v.string() }
  ```
- Returns: `{ sessionId: string; summary: string }`
- Logic:
  1. Get the audio download URL: `const audioUrl = await ctx.storage.getUrl(storageId as Id<"_storage">);` — throw `"Audio not found in storage"` if null.
  2. Fetch audio bytes: `const audioResponse = await fetch(audioUrl); const audioBlob = await audioResponse.blob();`
  3. Build FormData for Whisper: `const form = new FormData(); form.append("file", audioBlob, "recording.webm"); form.append("model", "whisper-1");`
  4. POST to OpenAI Whisper: `POST https://api.openai.com/v1/audio/transcriptions` with `Authorization: Bearer ${process.env.OPENAI_API_KEY}`. Parse JSON response; extract `transcript = data.text.trim()`. Throw `"Transcription failed"` if empty.
  5. Persist raw transcript immediately (before summarization):
     ```typescript
     const sessionId = await ctx.runMutation(internal.appointmentPrep.createSession, { transcript_raw: transcript });
     ```
  6. Generate structured summary via OpenAI Chat Completions (`gpt-4o-mini`):
     - System prompt: `"You are helping prepare for a small business consulting meeting. Based on the following transcript, produce a clean, organized summary covering: (1) the business context, (2) key challenges or pain points, and (3) goals or what they want to improve. Keep it to 150–250 words. Use plain language and preserve the owner's voice."`
     - User message: the `transcript` string.
  7. Extract `summary = chatResponse.choices[0].message.content.trim()`. Throw `"Summary generation failed"` if empty.
  8. Persist summary to the record created in step 5:
     ```typescript
     await ctx.runMutation(internal.appointmentPrep.applySummary, { id: sessionId, summary });
     ```
  9. Return `{ sessionId: sessionId.toString(), summary }`.
- Error handling: wrap steps 4–8 in try/catch; rethrow with user-facing message so the frontend can display it in the error state.

---

## 5. React Components & Pages

### `SiteNav`
- File: `src/components/SiteNav.tsx`
- Props: none
- State: `mobileOpen: boolean` (hamburger toggle)
- Behavior:
  - Sticky top nav, `z-50`, white background with subtle bottom border
  - Logo: text `"Emerson & Quinn"` in `font-semibold` at `text-[var(--brand-teal)]`, `href="#top"`
  - Desktop links (hidden on mobile via `hidden md:flex`): `href="#how-we-work"` How We Work, `href="#why-us"` Why Us, `href="#industries"` Industries, `href="#results"` Results — `text-slate-600 hover:text-[var(--brand-teal)] transition-colors`
  - Primary CTA: `<a href={CALENDLY_URL}>` styled as small filled teal button `"Book a Consultation"`. `CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL ?? "#contact"`.
  - Mobile: Lucide `Menu` / `X` icon toggles `mobileOpen`; dropdown renders same links full-width
  - Clicking any mobile link sets `mobileOpen(false)`
- Key UI: `sticky top-0 backdrop-blur-sm bg-white/90 border-b border-slate-100 px-6 py-4`

### `Hero`
- File: `src/components/Hero.tsx`
- Props: none
- State: none
- Key UI:
  - `id="top"`, `pt-32 pb-24` (accounts for sticky nav), `bg-[var(--background)]`, `relative overflow-hidden`
  - Decorative teal blob: `absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[var(--brand-teal-light)] opacity-60 blur-3xl pointer-events-none`
  - Content container: `max-w-4xl mx-auto px-6`
  - Eyebrow: `"Consulting for Family-Run Businesses"` — `text-sm font-semibold tracking-widest uppercase text-[var(--brand-teal)] mb-4`
  - `<h1>`: `"We Help Small Businesses Run Smarter."` — `text-5xl sm:text-6xl font-extrabold text-[var(--brand-dark)] leading-tight`
  - Subheadline: `"Emerson & Quinn partners with family-run businesses to build better systems, reduce chaos, and put practical AI to work — without the jargon."` — `text-xl text-slate-600 max-w-2xl mt-6 leading-relaxed`
  - CTA row (`flex flex-wrap gap-4 items-center mt-10`):
    - Primary: `<a href={CALENDLY_URL} className="px-8 py-4 rounded-xl font-semibold text-white bg-[var(--brand-teal)] hover:bg-teal-800 transition-colors shadow-md">Book a Free Consultation</a>`. `CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL ?? "#contact"`.
    - Secondary: `<a href="#how-we-work" className="text-[var(--brand-teal)] font-medium hover:underline">See how we work →</a>`

### `HowWeWork`
- File: `src/components/HowWeWork.tsx`
- Props: none
- State: none
- Key UI:
  - `id="how-we-work"`, `bg-white`, `py-24`
  - Header block centered: `<h2>` `"How We Work"` `text-4xl font-bold text-[var(--brand-dark)]`; subtitle `"We keep it simple. No complicated frameworks, no 90-day engagement decks. Just a clear process built around your business."` `text-lg text-slate-500 max-w-2xl mx-auto mt-4`
  - Grid `grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto px-6`:
    - **01 — Listen & Learn**: `"We start by understanding your business from the inside out — your people, your bottlenecks, your goals. No assumptions."`
    - **02 — Collaborate & Improve**: `"We work alongside you, not above you, to build systems that fit how your team actually operates."`
    - **03 — Grow & Measure**: `"We track what matters, adjust as you scale, and make sure the improvements stick long after we're done."`
  - Each card: `rounded-2xl border border-slate-100 p-8 bg-[var(--background)] hover:shadow-md transition-shadow`
  - Step number: `text-5xl font-extrabold text-[var(--brand-teal)] opacity-40 mb-4` (e.g., `"01"`)
  - Step title: `text-xl font-bold text-[var(--brand-dark)] mb-3`
  - Step body: `text-slate-600 leading-relaxed`

### `WhyWeDoThis`
- File: `src/components/WhyWeDoThis.tsx`
- Props: none
- State: none
- Key UI:
  - `id="why-us"`, `bg-[var(--brand-teal-light)]`, `py-24`
  - Grid `grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto px-6`
  - Left column:
    - `<h2>` `"Why We Do This"` `text-4xl font-bold text-[var(--brand-dark)]`
    - Teal rule: `<div className="w-12 h-1 bg-[var(--brand-teal)] rounded mt-4 mb-6" />`
    - Para 1: `"We've seen what happens when small businesses are handed cookie-cutter software and a 200-page manual. Tools that don't fit. Staff who don't use them. Money wasted."`
    - Para 2: `"We built Emerson & Quinn to do the opposite: show up, listen hard, and build solutions that grow with the business — not the other way around."`
    - Para 3: `"We're not a big agency. We're a small team that cares about the kind of businesses that keep communities running."`
    - Each para: `text-slate-700 leading-relaxed mb-4`
  - Right column:
    - Pull-quote block: `border-l-4 border-[var(--brand-teal)] pl-6`
    - Quote text: `text-2xl font-medium text-[var(--brand-slate)] italic leading-snug` — `"The best system is the one your team will actually use."`

### `Industries`
- File: `src/components/Industries.tsx`
- Props: none
- State: none
- Key UI:
  - `id="industries"`, `bg-white`, `py-24`
  - Header centered: `<h2>` `"Industries We Serve"` `text-4xl font-bold text-[var(--brand-dark)]`; subtitle `"We work where things get complicated — and we know your world well enough to help."` `text-lg text-slate-500 mt-4 mb-16`
  - Grid `grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto px-6`
  - 4 cards:
    1. Icon `Wrench` (lucide) — **Trades & Home Services** — `"Scheduling, dispatch, and customer follow-up that keeps jobs moving and phones ringing."`
    2. Icon `Building2` (lucide) — **Property Management** — `"Maintenance tracking, tenant communication, and reporting without the spreadsheet chaos."`
    3. Icon `HeartPulse` (lucide) — **Wellness & Fitness** — `"Booking, retention, and staff coordination that lets you focus on your clients."`
    4. Icon `HardHat` (lucide) — **Construction & Contractors** — `"Project tracking, subcontractor coordination, and job costing that keeps every site on budget."`
  - Card: `rounded-2xl border border-slate-100 p-8 bg-[var(--background)] flex flex-col gap-4`
  - Icon wrapper: `w-12 h-12 rounded-xl bg-[var(--brand-teal-light)] flex items-center justify-center`; icon `className="w-6 h-6 text-[var(--brand-teal)]"`
  - Card title: `text-xl font-bold text-[var(--brand-dark)]`
  - Card body: `text-slate-600 leading-relaxed`

### `Results`
- File: `src/components/Results.tsx`
- Props: none
- State: none
- Key UI:
  - `id="results"`, `bg-[var(--brand-teal-light)]`, `py-24`
  - Grid `grid grid-cols-1 md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto px-6`
  - Left column:
    - `<h2>` `"What Our Partners See"` `text-4xl font-bold text-[var(--brand-dark)]`
    - `<p>` `"We don't promise transformation overnight. We promise real, measurable progress on the things that matter to your team."` `text-lg text-slate-600 mt-4 max-w-sm`
  - Right column: `<ul className="space-y-5 mt-2">` with 5 items:
    1. `"Fewer missed follow-ups and dropped leads"`
    2. `"Consistent processes that don't break when someone calls out"`
    3. `"Staff who know what to do without being micromanaged"`
    4. `"Less time in email, more time doing actual work"`
    5. `"Reporting that tells you what's actually happening in your business"`
  - Each list item: `<li className="flex items-start gap-3">` with `<CheckCircle2 className="w-6 h-6 text-[var(--brand-teal)] mt-0.5 shrink-0" />` and `<span className="text-lg text-[var(--brand-dark)] font-medium">{text}</span>`

### `ContactSection`
- File: `src/components/ContactSection.tsx`
- Props: none
- State:
  - `name`, `email`, `businessType`, `message` — `string`, initialized to `""`
  - `status: "idle" | "loading" | "success" | "error"` — initialized to `"idle"`
  - `errorMessage: string` — initialized to `""`
- Behavior:
  - `const submitContact = useAction(api.contact.submitContact);`
  - `handleSubmit(e)`: `e.preventDefault()`, client-side check all fields non-empty (set error if not), set `status="loading"`, call `submitContact({ name, email, businessType, message })`, on success set `status="success"` and clear all fields, on catch set `status="error"` and `errorMessage = err.message`
  - When `status === "success"`: replace form with success state (see below)
- Key UI:
  - `id="contact"`, `bg-white`, `py-24`
  - Container: `max-w-2xl mx-auto px-6`
  - Intro block:
    - `<h2>` `"Let's Talk"` `text-4xl font-bold text-[var(--brand-dark)]`
    - `<p>` `"The first conversation is free — no pitch, just a real look at what might help. Fill out the form and we'll be in touch within one business day."` `text-lg text-slate-600 mt-4 mb-10`
  - Form (`<form onSubmit={handleSubmit} className="space-y-6">`):
    - Name: `<label>` + `<Input type="text" value={name} onChange=... placeholder="Your name" required />`
    - Email: `<label>` + `<Input type="email" value={email} onChange=... placeholder="you@example.com" required />`
    - Business Type: `<label>` + `<select value={businessType} onChange=... className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-teal)]">` with options: `""` (disabled placeholder `"— Select your industry —"`), `"Trades & Home Services"`, `"Property Management"`, `"Wellness & Fitness"`, `"Construction & Contractors"`, `"Other"`
    - Message: `<label>` + `<Textarea value={message} onChange=... placeholder="Tell us a bit about your business and what you're dealing with." rows={5} />`
    - Submit: `<button type="submit" disabled={status==="loading"} className="w-full py-3 rounded-xl font-semibold text-white bg-[var(--brand-teal)] hover:bg-teal-800 disabled:opacity-60 transition-colors">` text: `status === "loading" ? "Sending…" : "Send a Message"`
    - Error: `{status === "error" && <p className="text-red-600 text-sm mt-2">{errorMessage}</p>}`
  - Success state (`status === "success"`): centered `<div className="text-center py-12">` with:
    - `<CheckCircle2 className="w-16 h-16 text-[var(--brand-teal)] mx-auto mb-4" />`
    - `<h3 className="text-2xl font-bold text-[var(--brand-dark)]">Message received!</h3>`
    - `<p className="text-slate-600 mt-3">Thanks for reaching out. We'll get back to you within one business day.</p>`

### `SiteFooter`
- File: `src/components/SiteFooter.tsx`
- Props: none
- State: none
- Key UI:
  - `bg-[var(--brand-dark)] text-slate-400 py-10 text-center`
  - `<p className="text-sm">© 2025 Emerson & Quinn. All rights reserved.</p>`
  - `<p className="text-xs mt-2 text-slate-500">Helping small businesses run smarter.</p>`

### `src/pages/Index.tsx` (rewritten)
```tsx
import SiteNav from "@/components/SiteNav";
import Hero from "@/components/Hero";
import HowWeWork from "@/components/HowWeWork";
import WhyWeDoThis from "@/components/WhyWeDoThis";
import Industries from "@/components/Industries";
import Results from "@/components/Results";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";

export default function Index() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <main>
        <Hero />
        <HowWeWork />
        <WhyWeDoThis />
        <Industries />
        <Results />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
```

### `src/pages/BeforeWeMeet.tsx`
- File: `src/pages/BeforeWeMeet.tsx`
- Props: none
- Convex hooks:
  - `const generateAudioUploadUrl = useMutation(api.appointmentPrep.generateAudioUploadUrl);`
  - `const processAudio = useAction(api.appointmentPrep.processAudio);`
  - `const updateFinalSummary = useMutation(api.appointmentPrep.updateFinalSummary);`
- State:
  - `step: "initial" | "recording" | "processing" | "review" | "done"` — initialized to `"initial"`
  - `sessionId: string | null` — initialized to `null`
  - `summary: string` — initialized to `""` — the editable summary_final value
  - `recordingSeconds: number` — initialized to `0` — incremented by a setInterval while recording
  - `error: string | null` — initialized to `null`
- Refs:
  - `mediaRecorderRef: useRef<MediaRecorder | null>(null)`
  - `audioChunksRef: useRef<Blob[]>([])`
  - `timerIntervalRef: useRef<ReturnType<typeof setInterval> | null>(null)`
- Behavior:

  **`startRecording()`**:
  1. Call `navigator.mediaDevices.getUserMedia({ audio: true })`.
  2. Create `new MediaRecorder(stream)`. Store in `mediaRecorderRef.current`.
  3. Reset `audioChunksRef.current = []`.
  4. `mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data); }`
  5. `mediaRecorder.start()`.
  6. Set `step = "recording"`, `recordingSeconds = 0`.
  7. Start interval: `timerIntervalRef.current = setInterval(() => setRecordingSeconds(s => s + 1), 1000)`.
  8. On catch: set `error = "Microphone access was denied. Please allow microphone access and try again."`.

  **`stopRecording()`**:
  1. Clear timer interval; reset `recordingSeconds = 0`.
  2. `mediaRecorderRef.current.stop()`.
  3. Set `step = "processing"`.
  4. `mediaRecorderRef.current.onstop = async () => { ... }`:
     a. Build `audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" })`.
     b. Get upload URL: `const uploadUrl = await generateAudioUploadUrl()`.
     c. PUT audio blob: `await fetch(uploadUrl, { method: "PUT", headers: { "Content-Type": "audio/webm" }, body: audioBlob })`.
     d. Extract `storageId` from PUT response JSON: `const { storageId } = await putResponse.json()`.
     e. Call `const result = await processAudio({ storageId })`.
     f. Set `sessionId = result.sessionId`, `summary = result.summary`, `step = "review"`.
     g. On catch: set `error = err.message ?? "Something went wrong processing your recording."`, `step = "initial"`.

  **`handleDone()`**:
  1. If `sessionId` is null, return early.
  2. `await updateFinalSummary({ id: sessionId as Id<"appointmentPrep">, summary_final: summary })`.
  3. Set `step = "done"`.
  4. On catch: set `error = "Failed to save. Please try again."`.

  **`handleReRecord()`**:
  1. Set `step = "initial"`, `sessionId = null`, `summary = ""`, `error = null`, `recordingSeconds = 0`.

- Key UI — page wrapper: `min-h-screen bg-[var(--background)] flex flex-col items-center justify-center px-6 py-16`
- Content container: `max-w-xl w-full`

  **Step: `initial`**
  - `<h1 className="text-4xl font-extrabold text-[var(--brand-dark)] text-center mb-4">"Before we meet…"</h1>`
  - `<p className="text-center text-slate-600 text-lg leading-relaxed mb-10">"Just talk it through.<br/>Share what's going on in your business — what's working, what's not, and what you'd like to improve.<br/><br/>Don't worry about organizing it — we'll clean it up for you."</p>`
  - Record button: `<button onClick={startRecording} className="flex items-center gap-3 mx-auto px-8 py-4 rounded-xl font-semibold text-white bg-[var(--brand-teal)] hover:bg-teal-800 transition-colors shadow-md text-lg">` with `<Mic className="w-6 h-6" />` and text `"Start Recording"`.
  - Supporting line: `<p className="text-center text-slate-400 text-sm mt-6">"Most people talk for about a minute or two."</p>`
  - Error: `{error && <p className="text-red-600 text-sm text-center mt-4">{error}</p>}`

  **Step: `recording`**
  - Timer display: `<p className="text-center text-5xl font-mono font-bold text-[var(--brand-teal)] mb-8">{formatTime(recordingSeconds)}</p>` where `formatTime(s: number): string` formats as `MM:SS` — e.g., `Math.floor(s/60).toString().padStart(2,"0") + ":" + (s%60).toString().padStart(2,"0")`.
  - Pulsing indicator: `<div className="flex items-center justify-center gap-2 mb-6"><span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" /><span className="text-slate-500 text-sm font-medium">Recording…</span></div>`
  - Stop button: `<button onClick={stopRecording} className="flex items-center gap-3 mx-auto px-8 py-4 rounded-xl font-semibold text-white bg-red-500 hover:bg-red-700 transition-colors shadow-md text-lg">` with `<Square className="w-6 h-6 fill-white" />` and text `"Stop Recording"`.

  **Step: `processing`**
  - `<div className="text-center">`
  - `<Loader2 className="w-12 h-12 text-[var(--brand-teal)] mx-auto mb-6 animate-spin" />`
  - `<p className="text-xl font-semibold text-[var(--brand-dark)]">"Got it — organizing your thoughts…"</p>`
  - `</div>`

  **Step: `review`**
  - `<h2 className="text-3xl font-bold text-[var(--brand-dark)] mb-2">"Here's what we heard:"</h2>`
  - `<p className="text-slate-500 mb-6">"We cleaned this up based on what you shared. Feel free to edit or add anything."</p>`
  - `<Textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={10} className="w-full mb-8 text-slate-700 leading-relaxed" />`
  - Action row `<div className="flex flex-col sm:flex-row gap-4">`:
    - Done (primary): `<button onClick={handleDone} className="flex-1 py-3 rounded-xl font-semibold text-white bg-[var(--brand-teal)] hover:bg-teal-800 transition-colors">"Done"</button>`
    - Re-record (secondary): `<button onClick={handleReRecord} className="flex-1 py-3 rounded-xl font-semibold text-slate-600 border border-slate-200 hover:border-slate-400 transition-colors bg-white">"Re-record"</button>`
  - Error: `{error && <p className="text-red-600 text-sm mt-3">{error}</p>}`

  **Step: `done`**
  - `<div className="text-center py-12">`
  - `<CheckCircle2 className="w-16 h-16 text-[var(--brand-teal)] mx-auto mb-6" />`
  - `<p className="text-xl font-semibold text-[var(--brand-dark)] leading-relaxed">"Perfect — this gives us a great starting point.<br/>We'll review this before we meet so we can focus on what matters most."</p>`
  - `</div>`

- Lucide icons used: `Mic`, `Square`, `Loader2`, `CheckCircle2` — all imported from `lucide-react`.

---

## 6. Environment Variables

### Client-side (`VITE_` prefix, `.env.local` for dev)
- `VITE_CONVEX_URL` — Convex deployment URL (required; already set by template setup)
- `VITE_CALENDLY_URL` — Full Calendly scheduling link (e.g., `https://calendly.com/emersonquinn/consultation`). Used by `SiteNav` and `Hero` CTAs. If unset, both CTAs fall back to `"#contact"`.
- `VITE_CHALLENGE_ID` — Kept from template; unused by marketing site, harmless if absent

### Convex server-side (set via `npx convex env set KEY value`)
- `RESEND_API_KEY` — Resend API key; required for owner email notification
- `RESEND_FROM` — Verified sender address (e.g., `hello@emersonquinn.com`); required for email
- `CONTACT_NOTIFY_EMAIL` — Owner email that receives contact form notifications; if unset, email step is skipped but submission still persists
- `OPENAI_API_KEY` — Required for Whisper transcription and GPT summarization on the `/before-we-meet` flow. If unset, `processAudio` will throw at the Whisper API call.

### Unused by marketing site (leave unset or keep existing values)
- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_WEBHOOK_SECRET` — Not needed
- `RECAPTCHA_SECRET_KEY` — Not needed

---

## 7. Build Sequence

Follow this order exactly.

1. **`src/index.css`** — Swap Google Fonts import to Inter (weights 400;500;600;700;800), replace all `:root` CSS variable values with E&Q brand tokens, update `body` font-family, add `html { scroll-behavior: smooth; }`.

2. **`index.html`** — Update `<title>`, `<meta name="description">`, `<meta name="author">`, all `og:*` and `twitter:*` tags; add gtag stub comment block before `</head>`.

3. **`convex/schema.ts`** — Add `contactSubmissions` table and `appointmentPrep` table with all fields and indexes as specified in Section 3.

4. **`convex/contact.ts`** — Create with `insertSubmission` (internalMutation) and `submitContact` (action, no `"use node"`). Import `internal` and `api` from `./_generated/api`; import `internalMutation` and `action` from `./_generated/server`; import `v` from `convex/values`.

5. **`convex/appointmentPrep.ts`** — Create with `"use node"` directive. Implement `generateAudioUploadUrl` (mutation), `createSession` (internalMutation), `applySummary` (internalMutation), `updateFinalSummary` (mutation), and `processAudio` (action). Import `internal` and `api` from `./_generated/api`; import `internalMutation`, `mutation`, and `action` from `./_generated/server`; import `v` from `convex/values`; import `Id` from `./_generated/dataModel`.

6. **Run codegen** — Execute `npx convex codegen` to regenerate `convex/_generated/api.ts` so `api.contact.submitContact`, `api.appointmentPrep.generateAudioUploadUrl`, `api.appointmentPrep.processAudio`, and `api.appointmentPrep.updateFinalSummary` are available to the frontend.

7. **`src/App.tsx`** — Add `BrowserRouter`, `Routes`, `Route`; add `BeforeWeMeet` import; render both routes (`/` and `/before-we-meet`) inside `ConvexProvider`.

8. **`src/components/SiteNav.tsx`** — Sticky nav with desktop anchor links + mobile hamburger. Primary CTA uses `VITE_CALENDLY_URL` env var with `#contact` fallback.

9. **`src/components/Hero.tsx`** — Hero section with final copy, teal blob, two CTAs. Primary CTA uses `VITE_CALENDLY_URL` env var with `#contact` fallback.

10. **`src/components/HowWeWork.tsx`** — 3 numbered cards with final copy.

11. **`src/components/WhyWeDoThis.tsx`** — Two-column layout with paragraphs and pull-quote.

12. **`src/components/Industries.tsx`** — 4-card grid with Lucide icons and final copy.

13. **`src/components/Results.tsx`** — Two-column layout with 5 outcome bullets and Lucide checkmarks.

14. **`src/components/ContactSection.tsx`** — Contact form wired to `api.contact.submitContact`. All 4 states: idle, loading, success, error.

15. **`src/components/SiteFooter.tsx`** — Simple dark footer.

16. **`src/pages/Index.tsx`** — Full rewrite assembling all 7 section components.

17. **`src/pages/BeforeWeMeet.tsx`** — Multi-step audio intake page with 5 steps: initial, recording, processing, review, done. Wired to Convex `generateAudioUploadUrl`, `processAudio`, and `updateFinalSummary`.

18. **`npm run build`** — Must exit 0 with no TypeScript errors.

19. **Manual smoke test** (`npm run dev` + `npx convex dev` in parallel):
    - All 6 sections render on `/`; smooth-scroll anchors work
    - Mobile nav opens/closes correctly
    - Contact form submits; success state appears; `contactSubmissions` row appears in Convex dashboard
    - Owner notification email arrives (if `CONTACT_NOTIFY_EMAIL` + `RESEND_API_KEY` set)
    - Navigating to `/before-we-meet` renders the initial screen
    - Recording, stopping, processing, reviewing, and completing the flow all transition correctly
    - `appointmentPrep` row appears in Convex dashboard with all three fields populated
    - Editing the summary and clicking Done updates only `summary_final` in Convex; `transcript_raw` and `summary_generated` are unchanged
    - Re-record resets to initial state

---

## 8. Test Criteria

### Build
- `npm run build` exits 0, no TypeScript errors, no missing module warnings
- `npx convex codegen` exits 0 (schema + `contact` + `appointmentPrep` modules generate cleanly)

### Layout (marketing site `/`)
- All 6 section `id` anchors present: `top`, `how-we-work`, `why-us`, `industries`, `results`, `contact`
- Nav CTA `"Book a Consultation"` links to `VITE_CALENDLY_URL` (or `#contact` if unset)
- Hero CTA `"Book a Free Consultation"` links to `VITE_CALENDLY_URL` (or `#contact` if unset)
- Hero secondary link `"See how we work →"` scrolls to `#how-we-work`
- No layout breaks at 375px, 768px, 1280px viewport widths

### Contact Form
- Submitting with any empty field shows a client-side validation error without calling Convex
- Valid submission → button shows `"Sending…"` → success state appears
- New document appears in `contactSubmissions` table in Convex dashboard
- If `CONTACT_NOTIFY_EMAIL` + `RESEND_API_KEY` are set, owner notification email arrives within 30 seconds
- Success state is terminal for that session (form is replaced, not shown again)

### Before We Meet (`/before-we-meet`)
- Page renders at `/before-we-meet` with correct initial copy
- Clicking `"Start Recording"` prompts for microphone access; on grant, transitions to recording step
- Recording step shows timer incrementing in MM:SS format and a red pulsing indicator
- Clicking `"Stop Recording"` transitions to processing step immediately
- Processing step shows spinner and `"Got it — organizing your thoughts…"` copy
- On completion, review step shows pre-filled editable `<Textarea>` with AI summary
- Editing the textarea updates local state only (no Convex call until Done)
- Clicking `"Done"` calls `updateFinalSummary` and transitions to done step
- Done step shows checkmark and final confirmation copy
- In Convex dashboard, `appointmentPrep` record has:
  - `transcript_raw`: populated, non-empty
  - `summary_generated`: populated, non-empty, identical to initial value of `summary_final`
  - `summary_final`: reflects any edits made before Done; never equal to empty string after Done
- After Done, a second Convex query confirms `transcript_raw === summary_generated` only coincidentally — they are stored as separate fields and `transcript_raw` is never touched by `updateFinalSummary`
- Clicking `"Re-record"` returns to initial state; new recording creates a new `appointmentPrep` record (previous record is not deleted or modified)
- Microphone denied → error message appears on initial step; recording step never entered

### No Regressions
- `GateScreen` and `VoteATron3000` are not rendered anywhere in the DOM
- No `console.error` for unresolved Convex subscriptions at page load
- `/` route renders the marketing site; `/before-we-meet` renders the intake page; no 404s on either route in production build

---

## 9. Deployment Notes

### Convex
```bash
npx convex deploy
npx convex env set RESEND_API_KEY re_xxxxxxxxxxxx
npx convex env set RESEND_FROM hello@emersonquinn.com
npx convex env set CONTACT_NOTIFY_EMAIL owner@emersonquinn.com
npx convex env set OPENAI_API_KEY sk-xxxxxxxxxxxx
```
The `contactSubmissions` and `appointmentPrep` tables are created automatically on first deploy after the schema change.

### Vercel (frontend)
- Build command: `npm run build` | Output directory: `dist`
- Environment variables:
  - `VITE_CONVEX_URL` = production Convex URL from dashboard
  - `VITE_CALENDLY_URL` = full Calendly scheduling URL (e.g., `https://calendly.com/emersonquinn/consultation`)
  - `VITE_CHALLENGE_ID` is optional; set to `"emerson-quinn"` to suppress any env warnings

### Calendly
- In Calendly event settings, under **Confirmation page**, select **Redirect to an external site** and set the URL to `{APP_URL}/before-we-meet` (e.g., `https://emersonquinn.com/before-we-meet`).
- No query parameter handling is required; each visit to `/before-we-meet` is an independent session.

### Resend
- The sender domain in `RESEND_FROM` must be verified in the Resend dashboard before emails will deliver.
- `convex/resend.ts` `sendEmail` handles missing config gracefully (returns `{ success: false }` without throwing) — contact submission will persist in Convex even if the email notification fails.
