import { Hero } from '@/components/Hero';
import { TrustBadges } from '@/components/TrustBadges';
import { ProductShowcase } from '@/components/ProductShowcase';
import { DemoVideo } from '@/components/DemoVideo';
import { LatestContent } from '@/components/LatestContent';
import { HomeContact } from '@/components/HomeContact';
import { GlobalPresence } from '@/components/GlobalPresence';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <ProductShowcase />
      <GlobalPresence />
      <DemoVideo />
      <LatestContent />
      <HomeContact />
    </>
  );
}
