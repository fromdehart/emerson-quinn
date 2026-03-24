import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  events: defineTable({
    challengeId: v.string(),
    sessionId: v.string(),
    eventName: v.string(),
    metadata: v.any(),
    timestamp: v.number(),
  }).index("by_challengeId", ["challengeId"]),

  data: defineTable({
    challengeId: v.string(),
    key: v.string(),
    value: v.any(),
    createdAt: v.number(),
  })
    .index("by_challengeId", ["challengeId"])
    .index("by_challenge_and_key", ["challengeId", "key"]),

  votes: defineTable({
    challengeId: v.string(),
    sessionId: v.string(),
    createdAt: v.number(),
  })
    .index("by_challengeId", ["challengeId"])
    .index("by_challenge_and_session", ["challengeId", "sessionId"]),

  leads: defineTable({
    challengeId: v.string(),
    email: v.string(),
    createdAt: v.number(),
  })
    .index("by_challengeId", ["challengeId"])
    .index("by_challenge_and_email", ["challengeId", "email"]),

  contactSubmissions: defineTable({
    name: v.string(),
    email: v.string(),
    businessType: v.string(),
    message: v.string(),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),

  appointmentPrep: defineTable({
    transcript_raw: v.string(),
    summary_generated: v.string(),
    summary_final: v.string(),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),
});
