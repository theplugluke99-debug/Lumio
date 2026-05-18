import type { Metadata } from 'next';
import WhyContent from './WhyContent';

export const metadata: Metadata = {
  title: 'Why we build — Purpose',
  description: 'The belief behind everything we make. Built for people. Independent. Intentional.',
};

export default function WhyPage() {
  return <WhyContent />;
}
