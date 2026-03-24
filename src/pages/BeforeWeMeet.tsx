import { useState, useRef, useEffect } from "react";
import { useMutation, useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "convex/values";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Square, Loader2, CheckCircle2 } from "lucide-react";

type Step = "initial" | "recording" | "processing" | "review" | "done";

function formatTime(s: number): string {
  return Math.floor(s / 60).toString().padStart(2, "0") + ":" + (s % 60).toString().padStart(2, "0");
}

export default function BeforeWeMeet() {
  const [step, setStep] = useState<Step>("initial");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [summary, setSummary] = useState("");
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const generateAudioUploadUrl = useMutation(api.appointmentPrep.generateAudioUploadUrl);
  const processAudio = useAction(api.appointmentPrepActions.processAudio);
  const updateFinalSummary = useMutation(api.appointmentPrep.updateFinalSummary);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // Auto-stop at 5 minutes
  useEffect(() => {
    if (step === "recording" && recordingSeconds >= 300) {
      stopRecording();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordingSeconds, step]);

  const startRecording = async () => {
    if (typeof MediaRecorder === "undefined") {
      setError("Your browser does not support audio recording. Please try Chrome or Firefox.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      let mediaRecorder: MediaRecorder;
      try {
        mediaRecorder = new MediaRecorder(stream);
      } catch {
        setError("Your browser does not support audio recording. Please try Chrome or Firefox.");
        stream.getTracks().forEach((t) => t.stop());
        return;
      }

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.start();
      setStep("recording");
      setRecordingSeconds(0);
      setError(null);

      timerIntervalRef.current = setInterval(() => setRecordingSeconds((s) => s + 1), 1000);
    } catch {
      setError("Microphone access was denied. Please allow microphone access and try again.");
    }
  };

  const stopRecording = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    setRecordingSeconds(0);

    const mediaRecorder = mediaRecorderRef.current;
    if (!mediaRecorder) return;

    mediaRecorder.stop();
    setStep("processing");

    mediaRecorder.onstop = async () => {
      try {
        mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
        mediaStreamRef.current = null;

        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });

        const uploadUrl = await generateAudioUploadUrl();

        const putResponse = await fetch(uploadUrl, {
          method: "PUT",
          headers: { "Content-Type": "audio/webm" },
          body: audioBlob,
        });

        const { storageId } = await putResponse.json() as { storageId: string };

        const result = await processAudio({ storageId: storageId as Id<"_storage"> });

        setSessionId(result.sessionId);
        setSummary(result.summary);
        setStep("review");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong processing your recording.");
        setStep("initial");
      }
    };
  };

  const handleDone = async () => {
    if (!sessionId || saving) return;

    setSaving(true);
    try {
      await updateFinalSummary({
        id: sessionId as Id<"appointmentPrep">,
        summary_final: summary,
      });
      setStep("done");
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleReRecord = () => {
    setStep("initial");
    setSessionId(null);
    setSummary("");
    setError(null);
    setRecordingSeconds(0);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-xl w-full">
        {step === "initial" && (
          <div>
            <h1 className="text-4xl font-extrabold text-[var(--brand-dark)] text-center mb-4">
              Before we meet…
            </h1>
            <p className="text-center text-slate-600 text-lg leading-relaxed mb-10">
              Just talk it through.
              <br />
              Share what's going on in your business — what's working, what's not, and what you'd
              like to improve.
              <br />
              <br />
              Don't worry about organizing it — we'll clean it up for you.
            </p>
            <button
              onClick={startRecording}
              className="flex items-center gap-3 mx-auto px-8 py-4 rounded-xl font-semibold text-white bg-[var(--brand-teal)] hover:bg-teal-800 transition-colors shadow-md text-lg"
            >
              <Mic className="w-6 h-6" />
              Start Recording
            </button>
            <p className="text-center text-slate-400 text-sm mt-6">
              Most people talk for about a minute or two.
            </p>
            {error && <p className="text-red-600 text-sm text-center mt-4">{error}</p>}
          </div>
        )}

        {step === "recording" && (
          <div>
            <p className="text-center text-5xl font-mono font-bold text-[var(--brand-teal)] mb-8">
              {formatTime(recordingSeconds)}
            </p>
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <span className="text-slate-500 text-sm font-medium">Recording…</span>
            </div>
            <button
              onClick={stopRecording}
              className="flex items-center gap-3 mx-auto px-8 py-4 rounded-xl font-semibold text-white bg-red-500 hover:bg-red-700 transition-colors shadow-md text-lg"
            >
              <Square className="w-6 h-6 fill-white" />
              Stop Recording
            </button>
          </div>
        )}

        {step === "processing" && (
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-[var(--brand-teal)] mx-auto mb-6 animate-spin" />
            <p className="text-xl font-semibold text-[var(--brand-dark)]">
              Got it — organizing your thoughts…
            </p>
          </div>
        )}

        {step === "review" && (
          <div>
            <h2 className="text-3xl font-bold text-[var(--brand-dark)] mb-2">
              Here's what we heard:
            </h2>
            <p className="text-slate-500 mb-6">
              We cleaned this up based on what you shared. Feel free to edit or add anything.
            </p>
            <Textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={10}
              className="w-full mb-8 text-slate-700 leading-relaxed"
            />
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleDone}
                disabled={saving}
                className="flex-1 py-3 rounded-xl font-semibold text-white bg-[var(--brand-teal)] hover:bg-teal-800 disabled:opacity-60 transition-colors"
              >
                {saving ? "Saving…" : "Done"}
              </button>
              <button
                onClick={handleReRecord}
                className="flex-1 py-3 rounded-xl font-semibold text-slate-600 border border-slate-200 hover:border-slate-400 transition-colors bg-white"
              >
                Re-record
              </button>
            </div>
            {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
          </div>
        )}

        {step === "done" && (
          <div className="text-center py-12">
            <CheckCircle2 className="w-16 h-16 text-[var(--brand-teal)] mx-auto mb-6" />
            <p className="text-xl font-semibold text-[var(--brand-dark)] leading-relaxed">
              Perfect — this gives us a great starting point.
              <br />
              We'll review this before we meet so we can focus on what matters most.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
