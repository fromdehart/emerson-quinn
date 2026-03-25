import { internalMutation, action } from "./_generated/server";
import { internal, api } from "./_generated/api";
import { v } from "convex/values";

export const insertSubmission = internalMutation({
  args: {
    name: v.string(),
    email: v.string(),
    businessType: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("contactSubmissions", {
      name: args.name,
      email: args.email,
      businessType: args.businessType,
      message: args.message,
      createdAt: Date.now(),
    });
  },
});

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildNotificationHtml(args: {
  name: string;
  email: string;
  businessType: string;
  message: string;
}): string {
  return `<p><strong>Name:</strong> ${escapeHtml(args.name)}</p>
<p><strong>Email:</strong> ${escapeHtml(args.email)}</p>
<p><strong>Business Type:</strong> ${escapeHtml(args.businessType)}</p>
<p><strong>Message:</strong></p>
<p>${escapeHtml(args.message).replace(/\n/g, "<br>")}</p>`;
}

export const submitContact = action({
  args: {
    name: v.string(),
    email: v.string(),
    businessType: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const name = args.name.trim();
    const email = args.email.trim();
    const businessType = args.businessType.trim();
    const message = args.message.trim();

    if (!name) throw new Error("Name is required.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      throw new Error("Please enter a valid email address.");
    if (!businessType) throw new Error("Please select your business type.");
    if (!message) throw new Error("Message is required.");
    if (message.length > 2000)
      throw new Error("Message must be 2000 characters or fewer.");

    await ctx.runMutation(internal.contact.insertSubmission, {
      name,
      email,
      businessType,
      message,
    });

    const notifyEmail =
      process.env.CONTACT_NOTIFY_EMAIL?.trim() || "emersonandquinn@gmail.com";
    if (notifyEmail) {
      await ctx.scheduler.runAfter(0, api.resend.sendEmail, {
        to: notifyEmail,
        subject: `New inquiry from ${name} — Emerson & Quinn`,
        html: buildNotificationHtml({ name, email, businessType, message }),
      });
    }

    return { success: true as const };
  },
});
