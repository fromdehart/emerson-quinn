import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { CheckCircle2, Zap, DollarSign, BarChart3, Settings, Users, ShieldCheck } from "lucide-react";

const integrations = [
  "QuickBooks", "PayPal", "HubSpot", "Canva", "DocuSign", "Google Workspace", "Microsoft 365",
];

const workflows = [
  {
    icon: DollarSign,
    title: "Finance & Accounting",
    items: ["Payroll planning", "Month-end closing", "Cash-flow forecasting", "Invoice chasing", "Tax preparation"],
  },
  {
    icon: BarChart3,
    title: "Sales & Marketing",
    items: ["Lead triage & follow-up", "Campaign planning", "Marketing asset creation", "Contract review", "Customer outreach"],
  },
  {
    icon: Settings,
    title: "Operations",
    items: ["Performance analysis", "Scheduling & dispatch", "Vendor management", "HR workflows", "Customer service"],
  },
];

const tiers = [
  {
    name: "Starter",
    price: "$249",
    planValue: "Starter – $249 (2 workflows)",
    workflows: 2,
    description: "Pick any two workflows and we'll get them live. Great for testing AI before going all-in.",
    includes: [
      "Discovery call to choose your 2 workflows",
      "Integration setup for required tools",
      "Configuration & testing",
      "1-hour team walkthrough",
    ],
    highlight: false,
  },
  {
    name: "Growth",
    price: "$450",
    planValue: "Growth – $450 (7 workflows)",
    workflows: 7,
    description: "The most popular starting point — covers your biggest time drains across finance, sales, or operations.",
    includes: [
      "Discovery call to prioritize workflows",
      "Integration setup for required tools",
      "Configuration & testing of all 7",
      "1-hour team walkthrough",
      "30-day email support",
    ],
    highlight: true,
  },
  {
    name: "Complete",
    price: "$975",
    planValue: "Complete – $975 (15 workflows)",
    workflows: 15,
    description: "Every workflow Anthropic built for small business, fully configured for how your business runs.",
    includes: [
      "Full audit of your current tools & processes",
      "All integrations connected",
      "All 15 workflows configured & tested",
      "Team training session",
      "60-day email support",
    ],
    highlight: false,
  },
];

const whyUs = [
  {
    icon: Zap,
    title: "Up and running in days",
    body: "We handle the entire setup — tool connections, workflow configuration, and testing — so you don't spend weeks figuring it out yourself.",
  },
  {
    icon: Users,
    title: "Built for your business",
    body: "We map your actual workflows before touching anything. Every connection we build is specific to how your team operates.",
  },
  {
    icon: ShieldCheck,
    title: "Your data stays yours",
    body: "Claude only accesses what you already authorize. Anthropic doesn't train on your business data. We help you understand and verify this before going live.",
  },
];

interface ContactFormProps {
  plan: string;
  setPlan: (plan: string) => void;
}

function ContactForm({ plan, setPlan }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const submitContact = useAction(api.contact.submitContact);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !plan || !message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in all fields before submitting.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      await submitContact({
        name,
        email,
        businessType: "Claude for Small Business",
        message: `Plan interested in: ${plan}\n\n${message}\n\n[Source: Claude for Small Business page]`,
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-16">
        <CheckCircle2 className="w-16 h-16 text-[var(--brand-teal)] mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-[var(--brand-dark)]">You're on the list!</h3>
        <p className="text-slate-600 mt-3 max-w-sm mx-auto">
          Thanks for reaching out. We'll be in touch within one business day to schedule your setup call.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <Label htmlFor="csb-name">Your Name</Label>
        <Input
          id="csb-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Smith"
          required
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="csb-email">Business Email</Label>
        <Input
          id="csb-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jane@yourcompany.com"
          required
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="csb-plan">Which plan are you interested in?</Label>
        <select
          id="csb-plan"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-teal)]"
        >
          <option value="" disabled>— Select a plan —</option>
          {tiers.map((t) => (
            <option key={t.planValue} value={t.planValue}>{t.planValue}</option>
          ))}
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </div>

      <div>
        <Label htmlFor="csb-message">What tools do you currently use? (e.g. QuickBooks, HubSpot)</Label>
        <Textarea
          id="csb-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="We use QuickBooks for accounting and HubSpot for CRM. We'd love to automate our invoicing and lead follow-up..."
          rows={4}
          className="mt-1"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 rounded-xl font-semibold text-white bg-[var(--brand-teal)] hover:bg-teal-800 disabled:opacity-60 transition-colors text-lg"
      >
        {status === "loading" ? "Submitting…" : "Get Started Today"}
      </button>

      {status === "error" && (
        <p className="text-red-600 text-sm">{errorMessage}</p>
      )}

      <p className="text-xs text-slate-400 text-center">
        No obligation. We'll talk through your business and show you exactly what's possible.
      </p>
    </form>
  );
}

export default function ClaudeForSmallBusiness() {
  const [plan, setPlan] = useState("");

  const selectPlan = (planValue: string) => {
    setPlan(planValue);
    document.getElementById("get-started")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />

      {/* Hero */}
      <section className="bg-[var(--brand-dark)] text-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-teal-900 text-teal-300 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-6">
            New from Anthropic
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Claude for Small Business —<br className="hidden sm:block" /> We'll Set It Up for You
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Anthropic just launched Claude for Small Business: AI that plugs directly into QuickBooks, HubSpot, PayPal, and the tools you already use. We configure and deploy it for your business so you're getting value in days, not months.
          </p>
          <a
            href="#get-started"
            className="inline-block bg-[var(--brand-teal)] hover:bg-teal-600 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            Packages starting at $249
          </a>
        </div>
      </section>

      {/* What is Claude for Small Business */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--brand-dark)] text-center mb-4">
            What is Claude for Small Business?
          </h2>
          <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12">
            Anthropic built 15 ready-to-run AI workflows specifically for small businesses — covering finance, sales, marketing, and operations. It connects Claude directly to the software you already pay for.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {integrations.map((tool) => (
              <span
                key={tool}
                className="bg-[var(--brand-teal-light)] text-[var(--brand-teal)] font-medium px-4 py-2 rounded-lg text-sm"
              >
                {tool}
              </span>
            ))}
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {workflows.map(({ icon: Icon, title, items }) => (
              <div key={title} className="bg-slate-50 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-[var(--brand-teal)] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-[var(--brand-dark)] mb-3">{title}</h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-[var(--brand-teal)] mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why hire From DeHart */}
      <section className="bg-slate-50 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--brand-dark)] text-center mb-4">
            Why hire us to set it up?
          </h2>
          <p className="text-slate-600 text-center max-w-xl mx-auto mb-12">
            Most small business owners don't have time to learn a new AI platform, connect APIs, and figure out which workflows apply to them. That's exactly what we do.
          </p>

          <div className="grid sm:grid-cols-3 gap-8 mb-12">
            {whyUs.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[var(--brand-teal)] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-[var(--brand-dark)] mb-2">{title}</h3>
                <p className="text-sm text-slate-600">{body}</p>
              </div>
            ))}
          </div>

          <div className="bg-[var(--brand-dark)] text-white rounded-2xl p-8 text-center">
            <p className="text-lg font-medium mb-2">
              "Small businesses generate 44% of U.S. GDP — but their AI adoption has lagged behind large enterprises."
            </p>
            <p className="text-slate-400 text-sm">— Anthropic, May 2026</p>
            <p className="text-slate-300 mt-4 text-sm max-w-lg mx-auto">
              That gap is closing fast. The businesses that get set up now will have a significant edge over those that wait.
            </p>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--brand-dark)] text-center mb-12">
            Here's exactly what we do for you
          </h2>
          <ol className="space-y-8">
            {[
              { n: "1", title: "Audit your current tools", body: "We map what software you use, what's manual, and where Claude can save you the most time." },
              { n: "2", title: "Configure Claude for your workflows", body: "We set up your chosen workflows and customize them to match how your business actually operates." },
              { n: "3", title: "Connect your integrations", body: "We handle the QuickBooks, HubSpot, PayPal, and Google Workspace connections — no IT department required." },
              { n: "4", title: "Train your team", body: "A hands-on walkthrough so you and your team know exactly how to use it from day one." },
              { n: "5", title: "Ongoing support", body: "We're available to troubleshoot, expand workflows, and add new integrations as your business grows." },
            ].map(({ n, title, body }) => (
              <li key={n} className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--brand-teal)] text-white font-bold flex items-center justify-center">
                  {n}
                </div>
                <div>
                  <h3 className="font-bold text-[var(--brand-dark)] mb-1">{title}</h3>
                  <p className="text-slate-600 text-sm">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-slate-50 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--brand-dark)] text-center mb-4">
            Simple, flat-rate pricing
          </h2>
          <p className="text-slate-600 text-center max-w-xl mx-auto mb-12">
            No hourly billing, no surprises. Pick the tier that fits where you are today — you can always add more later.
          </p>

          <div className="grid sm:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-8 flex flex-col ${
                  tier.highlight
                    ? "bg-[var(--brand-teal)] text-white shadow-xl ring-2 ring-[var(--brand-teal)]"
                    : "bg-white text-[var(--brand-dark)] border border-slate-200"
                }`}
              >
                {tier.highlight && (
                  <span className="text-xs font-semibold uppercase tracking-wider bg-white/20 text-white px-3 py-1 rounded-full self-start mb-4">
                    Most Popular
                  </span>
                )}
                <div className="mb-1 text-sm font-semibold uppercase tracking-wider opacity-70">
                  {tier.name}
                </div>
                <div className="text-4xl font-bold mb-1">{tier.price}</div>
                <div className={`text-sm mb-4 ${tier.highlight ? "text-teal-100" : "text-slate-500"}`}>
                  {tier.workflows} workflows configured
                </div>
                <p className={`text-sm mb-6 ${tier.highlight ? "text-teal-50" : "text-slate-600"}`}>
                  {tier.description}
                </p>
                <ul className="space-y-2 mb-8 flex-1">
                  {tier.includes.map((item) => (
                    <li key={item} className={`flex items-start gap-2 text-sm ${tier.highlight ? "text-teal-50" : "text-slate-600"}`}>
                      <span className={tier.highlight ? "text-white" : "text-[var(--brand-teal)]"}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => selectPlan(tier.planValue)}
                  className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-colors ${
                    tier.highlight
                      ? "bg-white text-[var(--brand-teal)] hover:bg-teal-50"
                      : "bg-[var(--brand-teal)] text-white hover:bg-teal-800"
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form CTA */}
      <section id="get-started" className="bg-white py-20 px-6">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--brand-dark)] text-center mb-3">
            Ready to get set up?
          </h2>
          <p className="text-slate-600 text-center mb-10">
            Tell us about your business and the tools you use. We'll reach out within one business day to schedule your setup call.
          </p>
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8">
            <ContactForm plan={plan} setPlan={setPlan} />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
