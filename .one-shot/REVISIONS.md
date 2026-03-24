
# Revisions to BUILD_PLAN

## 1. Split `convex/appointmentPrep.ts` into two files — CRITICAL FIX

**What changed:** The single `convex/appointmentPrep.ts` file is split into:
- `convex/appointmentPrep.ts` — mutations only, no `"use node"` directive
- `convex/appointmentPrepActions.ts` — `processAudio` action only, with `"use node"` as the first line

**Why:** Convex forbids the `"use node"` directive in any file that exports a query or mutation. The original plan put `"use node"` at the top of a file that also exported four mutations. This is a guaranteed deployment failure. Convex enforces this at deploy time; the build would succeed but `npx convex deploy` would reject the module.

**Downstream effects:**
- Section 2 (File Changes): Updated `convex/appointmentPrep.ts` description; added `convex/appointmentPrepActions.ts` as a new CREATE entry.
- Section 4 (Convex Functions): Reorganized under two file headings.
- Section 5 (`BeforeWeMeet.tsx`): `processAudio` hook now references `api.appointmentPrepActions.processAudio` instead of `api.appointmentPrep.processAudio`.
- Section 7 (Build Sequence): Step 5 split into steps 5 and 6; all subsequent steps renumbered.
- Section 8 (Test Criteria): Codegen check updated to include `appointmentPrepActions` module.

---

## 2. Eliminated orphaned `appointmentPrep` records — ARCHITECTURE FIX

**What changed:** `processAudio` now runs both transcription (Whisper) and summarization (GPT) before calling `createSession`. The record is written once, with all three fields populated, only after both AI calls succeed.

**Why:** The original plan called `createSession` after transcription but before summarization. If the GPT call failed, the record was left permanently in the database with empty `summary_generated` and `summary_final` fields — despite the plan's claim that they'd "never be empty for longer than one action." The `applySummary` internalMutation is no longer needed and has been removed.

**Downstream effects:**
- `createSession` args now include `summary_generated` and `summary_final` (in addition to `transcript_raw`).
- `applySummary` internalMutation removed from `convex/appointmentPrep.ts` entirely.
- Section 4 `processAudio` logic reordered: steps 5 and 6 (persist transcript, then summarize) become steps 5 and 6 (summarize first, then persist all three fields together).
- Test criterion added: if `processAudio` throws, no `appointmentPrep` record appears in the Convex dashboard.

---

## 3. Added `mediaStreamRef` to stop microphone tracks — ARCHITECTURE FIX

**What changed:** `BeforeWeMeet.tsx` gains a `mediaStreamRef: useRef<MediaStream | null>(null)`. `startRecording` stores the stream there. The `onstop` handler calls `mediaStreamRef.current?.getTracks().forEach(t => t.stop())` before processing the audio blob.

**Why:** Without this, the `MediaStream` from `getUserMedia` was a local variable that went out of scope. The microphone-active indicator in the browser tab remained lit indefinitely after the user stopped recording, because the underlying tracks were never closed.

---

## 4. Added `useEffect` cleanup for timer and microphone — ARCHITECTURE FIX

**What changed:** A cleanup-only `useEffect` with an empty dependency array is added to `BeforeWeMeet.tsx`:
```tsx
useEffect(() => {
  return () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    mediaStreamRef.current?.getTracks().forEach(t => t.stop());
  };
}, []);
```

**Why:** If the user navigates away during the `recording` step, the interval fires against an unmounted component (React state update on unmounted component warning) and the microphone stays open. The cleanup effect prevents both.

---

## 5. Changed `storageId` arg type from `v.string()` to `v.id("_storage")` — CORRECTNESS FIX

**What changed:** `processAudio` args are now `{ storageId: v.id("_storage") }`. The unsafe `storageId as Id<"_storage">` cast inside the function body is removed; `args.storageId` is passed directly to `ctx.storage.getUrl`.

**Why:** `v.string()` strips type information. Using `v.id("_storage")` gives Convex the correct validator, makes the TypeScript types flow through correctly, and removes a `as` cast that could mask type errors.

---

## 6. Added `MediaRecorder` browser support detection — EDGE CASE FIX

**What changed:** `startRecording` now checks `typeof MediaRecorder === "undefined"` before attempting to use it, and wraps `new MediaRecorder(stream)` in its own try/catch. Both paths set an appropriate error message (`"Your browser does not support audio recording. Please try Chrome or Firefox."`) and return early without entering the recording step.

**Why:** Older Safari versions and some Firefox configurations do not support `MediaRecorder`. Without this check, the constructor throws and the error is caught by the `getUserMedia` catch block, producing the misleading message "Microphone access was denied."

---

## 7. Added 5-minute recording limit — MISSING PIECE FIX

**What changed:** A `useEffect` watching `recordingSeconds` calls `stopRecording()` when `step === "recording" && recordingSeconds >= 300`.

**Why:** Without a limit, a user who leaves the tab open accumulates an unbounded audio blob. Very long recordings risk multi-MB uploads and Whisper API timeouts or truncation. Five minutes (300 seconds) is a generous upper bound for a pre-meeting intake monologue.

---

## 8. Added `saving` state to prevent concurrent `handleDone` submissions — EDGE CASE FIX

**What changed:** `BeforeWeMeet.tsx` gains a `saving: boolean` state initialized to `false`. `handleDone` returns early if `saving` is true, sets it to `true` before the mutation, and resets it to `false` in `finally`. The Done button has `disabled={saving}` and displays `"Saving…"` while in flight.

**Why:** Double-clicking "Done" would fire `updateFinalSummary` twice. While the second call is a data no-op, it wastes a Convex mutation round-trip and could produce a confusing brief flicker.

---

## 9. Added `import type { Id } from "convex/values"` to `BeforeWeMeet.tsx` — CRITICAL FIX

**What changed:** The import is now explicitly listed in the `BeforeWeMeet.tsx` imports section.

**Why:** The component casts `sessionId as Id<"appointmentPrep">` in `handleDone`. Without the import, TypeScript errors with `Cannot find name 'Id'`, which is a build failure.

---

## 10. Fixed copyright year in `SiteFooter` — CORRECTNESS FIX

**What changed:** `SiteFooter` now renders `© {new Date().getFullYear()} Emerson & Quinn` instead of the hardcoded literal `© 2025`.

**Why:** The current year is 2026. Hardcoding `2025` produces a factually incorrect footer immediately. Using `new Date().getFullYear()` keeps the footer accurate without future edits.

---

## 11. Clarified codegen dependency in build sequence — MISSING PIECE FIX

**What changed:** Step 7 (codegen) now explicitly states that all frontend steps (8–18) depend on codegen having run, and directs the implementer to verify the four key generated symbols are present before proceeding.

**Why:** The original plan listed codegen as a manual step without making its blocking nature explicit. In practice, `tsc` (invoked by `npm run build`) will fail with "Module not found" errors on the generated `api` types if codegen has not been run after the new Convex files are created.

---

## 12. Flagged `resend.ts` dead code — PRODUCTION NOTE ADDED

**What changed:** The "Files to leave untouched" section now includes a note that `convex/resend.ts` contains template dead code and a hardcoded personal email address that should be removed before the site goes to production.

**Why:** Not a build blocker, but deploying code with a personal email address embedded is a privacy concern. Flagging it here ensures it is not overlooked.

---

## 13. Added Known Limitations section to Deployment Notes

**What changed:** Section 9 gains a "Known Limitations (MVP)" subsection covering: (a) the `/before-we-meet` endpoint has no rate limiting or Calendly session guard; (b) `resend.ts` dead code.

**Why:** These were identified in the critique as real concerns that are acceptable for MVP but should be visible to whoever operates the site post-launch.
