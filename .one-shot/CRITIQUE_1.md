# Critique 1

## Critical Issues (must fix before build)

- **`"use node"` in `convex/appointmentPrep.ts` alongside mutations — BUILD FAILURE**: The plan puts `"use node"` at the top of `appointmentPrep.ts` but that same file exports `generateAudioUploadUrl` (mutation), `createSession` (internalMutation), `applySummary` (internalMutation), and `updateFinalSummary` (mutation). `"use node"` is forbidden in any file that contains a query or mutation. Convex will reject the deployment. → **Fix**: Split into two files: `convex/appointmentPrep.ts` (all four mutations, no `"use node"`) and `convex/appointmentPrepActions.ts` (`processAudio` action only, with `"use node"`). Update all `internal.appointmentPrep.*` references inside `processAudio` accordingly; they still resolve correctly once both files are in the same module namespace.

- **`Id<"appointmentPrep">` import missing from `BeforeWeMeet.tsx`**: The component casts `sessionId as Id<"appointmentPrep">` in `handleDone` but the plan never adds `import type { Id } from "convex/values"` to the file. TypeScript will error. → **Fix**: Add `import type { Id } from "convex/values"` to `BeforeWeMeet.tsx`.

---

## Architecture Concerns

- **Orphaned `appointmentPrep` records on partial action failure**: `processAudio` calls `createSession` (persists the record with empty summary fields) in step 5, then attempts summarization in steps 6–7. If the GPT call fails, the record is left permanently with `summary_generated: ""` and `summary_final: ""`. The plan's note that they're "never empty for longer than the duration of one action" is incorrect — it's only true when the action succeeds. → Suggested approach: either (a) do not persist until both transcript and summary are in hand (run summarization before calling `createSession`), or (b) add a `status` field (`"pending" | "complete" | "failed"`) to the schema so orphaned records are identifiable and filterable.

- **MediaStream tracks never stopped**: `startRecording` captures the `MediaStream` from `getUserMedia` but the stream is a local variable — not stored in a ref — so when `stopRecording` calls `mediaRecorder.stop()`, the underlying microphone tracks are never closed. The browser tab will show the microphone-active indicator indefinitely. → Add a `mediaStreamRef: useRef<MediaStream | null>(null)`, assign the stream there, and call `mediaStreamRef.current?.getTracks().forEach(t => t.stop())` inside the `onstop` handler after blobs are collected.

- **No `useEffect` cleanup for the timer interval**: `timerIntervalRef` is cleared inside `stopRecording`, but if the user navigates away while in the `recording` step, the interval is never cleared and will continue firing against an unmounted component. → Add:
  ```tsx
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      mediaStreamRef.current?.getTracks().forEach(t => t.stop());
    };
  }, []);
  ```

- **`submitContact` schedules `api.resend.sendEmail` (a `"use node"` action) from a non-node action**: This is valid Convex behavior — cross-runtime scheduling is supported. However, `resend.ts` currently has a hardcoded `VOTE_MILESTONE_TO` address (`mdehart1@gmail.com`) and template-specific `sendVoteTractionEmail` / `sendVoteMilestoneEmail` exports. These are kept "untouched" by the plan but are dead code that leaks a personal email address. Not a build blocker, but worth flagging for cleanup before production.

---

## Missing Pieces

- **`storageId` validator should be `v.id("_storage")`, not `v.string()`**: `processAudio` declares `{ storageId: v.string() }` then immediately casts `storageId as Id<"_storage">`. Using `v.id("_storage")` instead gives Convex the correct type information and removes the need for the unsafe cast. Low severity but inconsistent with the rest of the schema design.

- **No recording duration limit**: There is no max duration enforced in `BeforeWeMeet`. A user who leaves the tab open will accumulate an unbounded audio blob, potentially producing a multi-MB upload and a very long (or truncated) Whisper transcription. → Add a max duration (e.g., 5 minutes / 300 seconds): when `recordingSeconds >= 300`, call `stopRecording()` automatically.

- **Build step 6 (`npx convex codegen`) is listed as a manual step between Convex file creation and frontend file creation**: In practice, the build sequence should make explicit that steps 7–17 assume codegen has already run, otherwise `tsc` in `npm run build` will fail on missing generated types for the new `contact` and `appointmentPrep` modules.

---

## Edge Cases Not Handled

- **`MediaRecorder` not supported (older Safari / some Firefox builds)**: No feature detection before calling `new MediaRecorder(stream)`. If the constructor throws, the error propagates to the `getUserMedia` catch block with a misleading "Microphone access was denied" message. → Wrap `new MediaRecorder(stream)` in its own try/catch with a message like `"Your browser does not support audio recording. Please try Chrome or Firefox."`.

- **Concurrent `handleDone` calls**: Double-clicking "Done" fires `updateFinalSummary` twice. The second call is a no-op in terms of data, but it's a wasted Convex mutation. → Disable the Done button while the mutation is in flight (add a local `saving` boolean state).

- **`processAudio` called with a `storageId` for a non-audio blob**: If Whisper returns a 400, the plan's generic `"Transcription failed"` catch fires but the `createSession` record has already been written with an empty transcript. This combines with the orphaned records issue above.

- **Copyright year hardcoded as `2025`**: `SiteFooter` renders `© 2025 Emerson & Quinn`. The current date is 2026. → Use `new Date().getFullYear()` or correct the literal.

- **`BeforeWeMeet` has no rate limiting or access check**: Any visitor who discovers `/before-we-meet` without going through Calendly can call `processAudio` repeatedly, spending OpenAI API credits. The Calendly redirect is purely convention — there is no token or session guard. Acceptable for MVP but is an unprotected paid endpoint.

---

## Overall Risk Level

**HIGH** — The `"use node"` violation in `convex/appointmentPrep.ts` is a guaranteed build/deploy failure that affects the entire `/before-we-meet` feature. It must be resolved before any code is written for that file. The remaining issues (stream cleanup, orphaned records, missing `Id` import) are medium severity individually but together represent a brittle user experience on the feature's most complex path.
