import CursorGlow from '@/components/ui/CursorGlow';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import PainSolution from '@/components/PainSolution';
import Stats from '@/components/Stats';
import Problem from '@/components/Problem';
import Services from '@/components/Services';
import PivotSection from '@/components/PivotSection';
import NumbersSection from '@/components/NumbersSection';
import DemoDevices from '@/components/DemoDevices';
import Integrations from '@/components/Integrations';
import Process from '@/components/Process';
import Pricing from '@/components/Pricing';
import Guarantee from '@/components/Guarantee';
import Testimonial from '@/components/Testimonial';
import CTA from '@/components/CTA';
import TalkToLumio from '@/components/TalkToLumio';
import WhySection from '@/components/WhySection';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <main className="overflow-x-hidden">
      <CursorGlow />
      <Hero />
      <Marquee />
      <PainSolution />
      <Stats />
      <Problem />
      <Services />
      <PivotSection />
      <NumbersSection />
      <DemoDevices />
      <Integrations />
      <Process />
      <Pricing />
      <Guarantee />
      <Testimonial />
      <CTA />
      <TalkToLumio />
      <WhySection />
      <Footer />
    </main>
  );
}
