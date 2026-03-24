import SiteNav from "@/components/SiteNav";
import Hero from "@/components/Hero";
import HowWeWork from "@/components/HowWeWork";
import WhyWeDoThis from "@/components/WhyWeDoThis";
import Industries from "@/components/Industries";
import Results from "@/components/Results";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";

export default function Index() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <main>
        <Hero />
        <HowWeWork />
        <WhyWeDoThis />
        <Industries />
        <Results />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
