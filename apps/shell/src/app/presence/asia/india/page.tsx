import type { Metadata } from 'next';
import Link from 'next/link';
import { ProductShowcase } from '@/components/ProductShowcase';
import { GlobeIcon } from '@/components/GlobeIcon';

export const metadata: Metadata = {
  title: 'India | Shanvai Technologies',
  description:
    'Shanvai Technologies products available in India — Decision Core, Credit Bureau, AIOps, and partnerships.',
};

export default function IndiaPresencePage() {
  return (
    <div className="pt-16">
      <section className="border-b border-line bg-brandSoft">
        <div className="site-container py-12">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-mist" aria-label="Breadcrumb">
            <Link href="/presence" className="inline-flex items-center gap-1.5 hover:text-brand">
              <GlobeIcon className="h-4 w-4" />
              Global presence
            </Link>
            <span aria-hidden>/</span>
            <span>Asia & Australia</span>
            <span aria-hidden>/</span>
            <span className="text-inkStrong">India</span>
          </nav>
          <h1 className="mt-5 font-display text-display-md text-inkStrong sm:text-display-lg">
            Shanvai in India
          </h1>
          <p className="mt-3 max-w-2xl text-base text-mist">
            Explore Shanvai platforms available for banks, NBFCs, and fintech institutions across
            India.
          </p>
        </div>
      </section>

      <ProductShowcase
        id="india-products"
        eyebrow="India · Products"
        title="Platforms for the Indian BFSI market"
        subtitle="Decision Core, Credit Bureau, AIOps, and enterprise partnerships — ready for regulated institutions in India."
      />
    </div>
  );
}
