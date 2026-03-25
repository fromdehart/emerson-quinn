import SiteNav from "@/components/SiteNav";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";

export default function Contact() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />
      <main className="flex-1 pt-24 pb-16">
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
