import { TESTIMONIAL } from '@/lib/data';

export default function Testimonial() {
  return (
    <section className="bg-[#F2DDD8] py-24 px-4 text-center">
      <div className="mx-auto max-w-4xl flex flex-col items-center gap-7">
        <div className="text-[#C4973F] text-2xl tracking-widest">★★★★★</div>
        <blockquote className="font-display font-black italic text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-[-0.03em] text-[#1A1814]">
          &ldquo;{TESTIMONIAL.quote}&rdquo;
        </blockquote>
        <p className="text-sm font-semibold text-[#8A8278] tracking-wide uppercase">{TESTIMONIAL.author}</p>
      </div>
    </section>
  );
}
