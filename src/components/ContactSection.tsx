import { useState } from "react";
import { Link } from "react-router-dom";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const submitContact = useAction(api.contact.submitContact);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !businessType || !message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in all fields before submitting.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      await submitContact({ name, email, businessType, message });
      setStatus("success");
      setName("");
      setEmail("");
      setBusinessType("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <section id="contact" className="bg-white py-24">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center py-12">
            <CheckCircle2 className="w-16 h-16 text-[var(--brand-teal)] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[var(--brand-dark)]">Message received!</h3>
            <p className="text-slate-600 mt-3">
              Thanks for reaching out. We'll get back to you within one business day.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="bg-white py-24">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-[var(--brand-dark)] text-center sm:text-left">
          Let&apos;s make your business stronger together.
        </h2>
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 mt-8 mb-10">
          <Link
            to="/#schedule"
            className="inline-flex justify-center rounded-xl bg-[var(--brand-teal)] px-8 py-4 text-center font-semibold text-white shadow-md transition-colors hover:bg-teal-800"
          >
            Schedule a Free, No-Risk Consultation
          </Link>
        </div>

        

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="contact-name">Name</Label>
            <Input
              id="contact-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="contact-email">Email</Label>
            <Input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="contact-business-type">Business Type</Label>
            <select
              id="contact-business-type"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-teal)]"
            >
              <option value="" disabled>
                — Select your industry —
              </option>
              <option value="Trades & Home Services">Trades &amp; Home Services</option>
              <option value="Property Management">Property Management</option>
              <option value="Wellness & Fitness">Wellness &amp; Fitness</option>
              <option value="Construction & Contractors">Construction &amp; Contractors</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <Label htmlFor="contact-message">Message</Label>
            <Textarea
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us a bit about your business and what you're dealing with."
              rows={5}
              className="mt-1"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3 rounded-xl font-semibold text-white bg-[var(--brand-teal)] hover:bg-teal-800 disabled:opacity-60 transition-colors"
          >
            {status === "loading" ? "Sending…" : "Send a Message"}
          </button>

          {status === "error" && (
            <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
          )}
        </form>
      </div>
    </section>
  );
}
