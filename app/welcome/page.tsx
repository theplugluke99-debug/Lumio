import type { Metadata } from 'next';
import WelcomeContent from './WelcomeContent';

export const metadata: Metadata = {
  title: 'Welcome to Lumio',
  description: 'Your clinic is never running alone again.',
};

export default function WelcomePage() {
  return <WelcomeContent />;
}
