'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  TRENDING_CATEGORIES,
  TRENDING_ITEMS,
  categoryLabel,
  formatTrendingDate,
  type TrendingCategory,
} from '@/data/trending';
import { SpotlightVideo } from './SpotlightVideo';

type FilterId = 'all' | TrendingCategory;

export function TrendingHub() {
  const [filter, setFilter] = useState<FilterId>('all');

  const items = useMemo(() => {
    const list =
      filter === 'all' ? TRENDING_ITEMS : TRENDING_ITEMS.filter((i) => i.category === filter);
    return [...list].sort((a, b) => b.date.localeCompare(a.date));
  }, [filter]);

  const featuredVideos = TRENDING_ITEMS.filter((i) => i.category === 'video' && i.videoSrc).slice(
    0,
    3,
  );

  return (
    <div>
      <div className="mb-8 rounded-lg border border-brand/20 bg-brandSoft px-5 py-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          Shanvai Spotlight
        </p>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink sm:text-base">
          Market signals we highlight for banks, NBFCs, and fintechs — GenAI, digital credit, and
          platform reliability — framed through Shanvai Decision Core, Credit Bureau, and AIOps.
          Videos play on this site.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-line pb-6">
        {TRENDING_CATEGORIES.map((cat) => {
          const active = filter === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilter(cat.id)}
              className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
                active
                  ? 'bg-brand text-white'
                  : 'border border-line bg-white text-ink hover:border-brand/30 hover:bg-brandSoft'
              }`}
              aria-pressed={active}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {(filter === 'all' || filter === 'video') && featuredVideos.length > 0 && (
        <section className="mt-10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-xl font-semibold text-inkStrong">
                Featured spotlights
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-mist">
                Watch on shanvai.com — curated technology and GenAI briefings highlighted by Shanvai.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-8 lg:grid-cols-3">
            {featuredVideos.map((video) => (
              <article key={video.slug} className="flex flex-col overflow-hidden rounded-lg border border-line bg-white">
                <SpotlightVideo
                  src={video.videoSrc!}
                  poster={video.posterSrc}
                  title={video.title}
                />
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                    Spotlight
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold text-inkStrong">
                    <Link href={`/trending/${video.slug}`} className="hover:text-brand">
                      {video.title}
                    </Link>
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-mist">{video.summary}</p>
                  <Link
                    href={`/trending/${video.slug}`}
                    className="mt-4 text-sm font-semibold text-brand hover:text-brandHover"
                  >
                    Open spotlight →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="mt-14">
        <h2 className="font-display text-xl font-semibold text-inkStrong">Latest highlights</h2>
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {items.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/trending/${item.slug}`}
                className="group flex flex-col gap-2 py-6 transition sm:flex-row sm:items-baseline sm:gap-8"
              >
                <time
                  dateTime={item.date}
                  className="shrink-0 text-sm font-medium text-mist sm:w-40"
                >
                  {formatTrendingDate(item.date)}
                </time>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                    {categoryLabel(item.category)}
                    {item.videoSrc ? ' · Plays on site' : ''}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-inkStrong group-hover:text-brand sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{item.summary}</p>
                  <span className="mt-3 inline-flex text-sm font-semibold text-brand">
                    {item.videoSrc ? 'Watch spotlight →' : 'Read more →'}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
