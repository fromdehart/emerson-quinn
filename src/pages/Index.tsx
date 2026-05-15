import SiteNav from "@/components/SiteNav";
import Hero from "@/components/Hero";
import HowWeWork from "@/components/HowWeWork";
import WhatWeAutomate from "@/components/WhatWeAutomate";
import WhyWeDoThis from "@/components/WhyWeDoThis";
import Industries from "@/components/Industries";
import Results from "@/components/Results";
import ConsultationIncludes from "@/components/ConsultationIncludes";
import ScheduleSection from "@/components/ScheduleSection";
import SiteFooter from "@/components/SiteFooter";

export default function Index() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <main>
        <Hero />
        <HowWeWork />
        <WhatWeAutomate />
        <WhyWeDoThis />
        <Industries />
        <Results />
        <ConsultationIncludes />
        <ScheduleSection />
      </main>
      <SiteFooter />
    </div>
  );
}
