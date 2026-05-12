import CursorGlow from '@/components/ui/CursorGlow';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Stats from '@/components/Stats';
import Problem from '@/components/Problem';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Pricing from '@/components/Pricing';
import Testimonial from '@/components/Testimonial';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <main>
      <CursorGlow />
      <Hero />
      <Marquee />
      <Stats />
      <Problem />
      <Services />
      <Process />
      <Pricing />
      <Testimonial />
      <CTA />
      <Footer />
    </main>
  );
}
