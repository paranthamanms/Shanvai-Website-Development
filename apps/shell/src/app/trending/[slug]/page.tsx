import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  TRENDING_ITEMS,
  categoryLabel,
  formatTrendingDate,
  getTrendingBySlug,
} from '@/data/trending';
import { SpotlightVideo } from '@/components/SpotlightVideo';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return TRENDING_ITEMS.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const item = getTrendingBySlug(params.slug);
  if (!item) return { title: 'Trending | Shanvai' };
  return {
    title: `${item.title} | Shanvai Technologies`,
    description: item.summary,
  };
}

export default function TrendingArticlePage({ params }: Props) {
  const item = getTrendingBySlug(params.slug);
  if (!item) notFound();

  return (
    <div className="pt-[4.25rem]">
      <article>
        <header className="border-b border-line bg-brandSoft">
          <div className="site-container py-12 sm:py-16">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-mist" aria-label="Breadcrumb">
              <Link href="/trending" className="hover:text-brand">
                What is trending
              </Link>
              <span aria-hidden>/</span>
              <span className="text-inkStrong">{categoryLabel(item.category)}</span>
            </nav>
            <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-brand">
              {item.videoSrc ? 'Shanvai Spotlight' : categoryLabel(item.category)}
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-display-md text-inkStrong sm:text-display-lg">
              {item.title}
            </h1>
            <time dateTime={item.date} className="mt-4 block text-sm text-mist">
              {formatTrendingDate(item.date)}
            </time>
            <ul className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md border border-line bg-white px-2.5 py-1 text-xs font-medium text-ink"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </header>

        <div className="site-container section-pad max-w-3xl">
          {item.videoSrc && (
            <div className="mb-10">
              <SpotlightVideo src={item.videoSrc} poster={item.posterSrc} title={item.title} />
              <p className="mt-3 text-sm text-mist">
                Playing on shanvai.com — highlighted by Shanvai for enterprise BFSI leaders.
              </p>
            </div>
          )}

          <p className="text-lg leading-relaxed text-inkStrong">{item.summary}</p>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-mist">
            {item.body.map((para) => (
              <p key={para.slice(0, 48)}>{para}</p>
            ))}
          </div>

          <div className="mt-10 rounded-lg border border-brand/20 bg-brandSoft p-5">
            <p className="font-display text-base font-semibold text-inkStrong">
              See how Shanvai operationalises this
            </p>
            <p className="mt-2 text-sm text-mist">
              Explore Decision Core, Credit Bureau, and AIOps — or request a tailored demo.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/#products" className="btn-secondary">
                View products
              </Link>
              <Link href="/contact" className="btn-primary">
                Request demo
              </Link>
            </div>
          </div>

          <div className="mt-12 border-t border-line pt-8">
            <Link href="/trending" className="text-sm font-semibold text-brand hover:text-brandHover">
              ← Back to what is trending
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
