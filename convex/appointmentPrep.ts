import { internalMutation, mutation } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const generateAudioUploadUrl = mutation({
  args: {},
  handler: async (ctx): Promise<string> => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const createSession = internalMutation({
  args: {
    transcript_raw: v.string(),
    summary_generated: v.string(),
    summary_final: v.string(),
  },
  handler: async (ctx, args): Promise<Id<"appointmentPrep">> => {
    return await ctx.db.insert("appointmentPrep", {
      transcript_raw: args.transcript_raw,
      summary_generated: args.summary_generated,
      summary_final: args.summary_final,
      createdAt: Date.now(),
    });
  },
});

export const updateFinalSummary = mutation({
  args: {
    id: v.id("appointmentPrep"),
    summary_final: v.string(),
  },
  handler: async (ctx, args): Promise<void> => {
    const doc = await ctx.db.get(args.id);
    if (!doc) throw new Error("Session not found.");
    await ctx.db.patch(args.id, { summary_final: args.summary_final });
  },
});
