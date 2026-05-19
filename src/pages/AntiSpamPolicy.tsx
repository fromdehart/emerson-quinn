import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export default function AntiSpamPolicy() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />
      <main className="flex-1 pt-16 pb-20 sm:pt-20 sm:pb-28">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-4xl font-extrabold text-[var(--brand-dark)] mb-2">Anti-Spam Policy</h1>
          <div className="h-1 w-14 rounded bg-[var(--brand-teal)] mb-8" />

          <p className="text-lg leading-relaxed text-slate-700 mb-10">
            From DeHart strictly prohibits the use of unsolicited commercial email
            (spam) to advertise our website, services, or any related content.
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--brand-dark)] mb-4">
              Our Policy Against Unsolicited Advertising
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We do not engage in, support, or condone the sending of unsolicited commercial
              messages to promote our website or services. This includes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700">
              <li>Unsolicited email advertisements</li>
              <li>Bulk email campaigns to recipients who have not explicitly opted-in</li>
              <li>Spam messages sent through any communication channel</li>
              <li>Use of harvested or purchased email lists</li>
              <li>Any form of unsolicited electronic marketing</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--brand-dark)] mb-4">
              Legitimate Marketing Practices
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We only promote our services through legitimate means, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700">
              <li>Organic search engine optimization</li>
              <li>Social media marketing on our own accounts</li>
              <li>Content marketing and educational materials</li>
              <li>Email communications only to subscribers who have explicitly opted-in</li>
              <li>Referrals from satisfied customers</li>
              <li>Networking and professional relationships</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--brand-dark)] mb-4">
              Compliance and Reporting
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              If you receive any unsolicited messages claiming to be from or promoting Vibe Coding
              from DeHart, please:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700">
              <li>Report it as spam to your email provider</li>
              <li>
                Forward the message to our contact email with &ldquo;SPAM REPORT&rdquo; in the
                subject line
              </li>
              <li>Include the full email headers if possible</li>
            </ul>
            <p className="mt-4 text-slate-700 leading-relaxed">
              We take spam reports seriously and will investigate any claims of unauthorized use of
              our brand or services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--brand-dark)] mb-4">
              Contact Information
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              For legitimate business inquiries or to report spam related to our brand:
            </p>
            <p className="text-slate-700 font-semibold">From DeHart</p>
            <p className="text-slate-700">
              Email:{" "}
              <a
                href="mailto:info@fromdehart.com"
                className="text-[var(--brand-teal)] hover:text-teal-800 transition-colors"
              >
                info@fromdehart.com
              </a>
            </p>
            <p className="text-slate-700">
              Website:{" "}
              <a
                href="https://fromdehart.com"
                className="text-[var(--brand-teal)] hover:text-teal-800 transition-colors"
              >
                https://fromdehart.com
              </a>
            </p>
            <p className="mt-4 text-sm text-slate-500 italic">
              Please note: We do not respond to unsolicited commercial messages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--brand-dark)] mb-4">Policy Updates</h2>
            <p className="text-slate-700 leading-relaxed">
              This anti-spam policy may be updated periodically to reflect changes in our practices
              or applicable laws. The most current version will always be available on this page.
            </p>
            <p className="mt-4 text-sm text-slate-500">Last updated: May 19, 2026</p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
