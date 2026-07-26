import type { Metadata } from 'next';
import { TrendingHub } from '@/components/TrendingHub';

export const metadata: Metadata = {
  title: 'What is trending | Shanvai Technologies',
  description:
    'Industry news, GenAI and technology videos, and Shanvai insights for credit, decisioning, and BFSI platforms.',
};

export default function TrendingPage() {
  return (
    <div className="pt-[4.25rem]">
      <section className="border-b border-line bg-brandSoft">
        <div className="site-container py-12 sm:py-16">
          <p className="section-eyebrow">Insights & media</p>
          <h1 className="mt-3 font-display text-display-md text-inkStrong sm:text-display-lg">
            What is trending
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-mist sm:text-lg">
            Market themes Shanvai highlights for credit and decisioning leaders — industry news,
            GenAI spotlights that play on this site, and product-ready insights.
          </p>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="site-container">
          <TrendingHub />
        </div>
      </section>
    </div>
  );
}
