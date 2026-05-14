import CursorGlow from '@/components/ui/CursorGlow';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Stats from '@/components/Stats';
import Problem from '@/components/Problem';
import Services from '@/components/Services';
import DemoTeaser from '@/components/DemoTeaser';
import TalkToLumio from '@/components/TalkToLumio';
import Process from '@/components/Process';
import Pricing from '@/components/Pricing';
import Guarantee from '@/components/Guarantee';
import Testimonial from '@/components/Testimonial';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <main className="overflow-x-hidden">
      <CursorGlow />
      <Hero />
      <Marquee />
      <Stats />
      <Problem />
      <Services />
      <DemoTeaser />
      <TalkToLumio />
      <Process />
      <Pricing />
      <Guarantee />
      <Testimonial />
      <CTA />
      <Footer />
    </main>
  );
}
