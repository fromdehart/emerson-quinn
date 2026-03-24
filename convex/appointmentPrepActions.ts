"use node";

import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

export const processAudio = action({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args): Promise<{ sessionId: string; summary: string }> => {
    try {
      const audioUrl = await ctx.storage.getUrl(args.storageId);
      if (!audioUrl) throw new Error("Audio not found in storage");

      const audioResponse = await fetch(audioUrl);
      const audioBlob = await audioResponse.blob();

      const form = new FormData();
      form.append("file", audioBlob, "recording.webm");
      form.append("model", "whisper-1");

      const whisperRes = await fetch("https://api.openai.com/v1/audio/transcriptions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: form,
      });

      if (!whisperRes.ok) {
        const errText = await whisperRes.text();
        throw new Error(`Transcription API error: ${errText}`);
      }

      const whisperData = (await whisperRes.json()) as { text?: string };
      const transcript = (whisperData.text ?? "").trim();
      if (!transcript) throw new Error("Transcription failed");

      const chatRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are helping prepare for a small business consulting meeting. Based on the following transcript, produce a clean, organized summary covering: (1) the business context, (2) key challenges or pain points, and (3) goals or what they want to improve. Keep it to 150–250 words. Use plain language and preserve the owner's voice.",
            },
            {
              role: "user",
              content: transcript,
            },
          ],
        }),
      });

      if (!chatRes.ok) {
        const errText = await chatRes.text();
        throw new Error(`Summary API error: ${errText}`);
      }

      const chatData = (await chatRes.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
      };
      const summary = (chatData.choices?.[0]?.message?.content ?? "").trim();
      if (!summary) throw new Error("Summary generation failed");

      const sessionId = await ctx.runMutation(internal.appointmentPrep.createSession, {
        transcript_raw: transcript,
        summary_generated: summary,
        summary_final: summary,
      });

      return { sessionId: sessionId.toString(), summary };
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      throw new Error(message);
    }
  },
});
