import { Hero } from '@/components/Hero';
import { TrustBadges } from '@/components/TrustBadges';
import { ProductShowcase } from '@/components/ProductShowcase';
import { DemoVideo } from '@/components/DemoVideo';
import { ContactForm } from '@/components/ContactForm';
import { GlobalPresence } from '@/components/GlobalPresence';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <ProductShowcase />
      <GlobalPresence />
      <DemoVideo />
      <ContactForm />
    </>
  );
}
