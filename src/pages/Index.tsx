import SiteNav from "@/components/SiteNav";
import Hero from "@/components/Hero";
import HowWeWork from "@/components/HowWeWork";
import WhyWeDoThis from "@/components/WhyWeDoThis";
import Industries from "@/components/Industries";
import Results from "@/components/Results";
import ScheduleSection from "@/components/ScheduleSection";
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
        <ScheduleSection />
      </main>
      <SiteFooter />
    </div>
  );
}
