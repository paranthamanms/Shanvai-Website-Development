import Link from 'next/link';
import {
  TRENDING_ITEMS,
  categoryLabel,
  formatTrendingDate,
} from '@/data/trending';

/** CRIF-style “Latest content” strip for the homepage */
export function LatestContent() {
  const items = [...TRENDING_ITEMS]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <section className="section-pad border-t border-line bg-canvas">
      <div className="site-container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow">What is trending</p>
            <h2 className="section-title mt-3">Highlighted by Shanvai</h2>
            <p className="section-lead max-w-xl">
              Spotlights, industry news, and GenAI briefings we curate for BFSI teams — videos play
              on shanvai.com.
            </p>
          </div>
          <Link href="/trending" className="btn-secondary">
            View all trending
          </Link>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/trending/${item.slug}`}
                className="group flex h-full flex-col border-t-2 border-brand/30 bg-white p-6 transition hover:border-brand"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                  {categoryLabel(item.category)}
                </p>
                <time dateTime={item.date} className="mt-2 text-sm text-mist">
                  {formatTrendingDate(item.date)}
                </time>
                <h3 className="mt-3 font-display text-lg font-semibold text-inkStrong group-hover:text-brand">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">{item.summary}</p>
                <span className="mt-4 text-sm font-semibold text-brand">Read more →</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
