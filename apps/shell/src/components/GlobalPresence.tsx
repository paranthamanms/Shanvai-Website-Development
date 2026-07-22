import Link from 'next/link';
import { GlobeIcon } from './GlobeIcon';
import { PRESENCE_REGIONS } from '@/data/presence';

export function GlobalPresence({ compact = false }: { compact?: boolean }) {
  return (
    <section id="presence" className={compact ? 'py-14 bg-white' : 'section-pad bg-white'}>
      <div className="site-container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brandSoft text-brand ring-1 ring-brand/15">
            <GlobeIcon className="h-6 w-6" />
          </div>
          <p className="section-eyebrow">Countries and regions</p>
          <h2 className="section-title mt-3">Choose your country</h2>
          <p className="section-lead">
            Explore Shanvai presence across Europe, Middle East & Africa, Asia & Australia, and the
            Americas.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PRESENCE_REGIONS.map((region) => (
            <article key={region.id} className="rounded-xl border border-line bg-white p-6 shadow-lift">
              <h3 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-inkStrong">
                <span className="inline-block border-b-2 border-brand pb-1">{region.name}</span>
              </h3>
              {region.locations.length > 0 ? (
                <ul className="mt-5 space-y-3">
                  {region.locations.map((loc) => (
                    <li key={loc.label}>
                      {loc.available && loc.href ? (
                        <Link
                          href={loc.href}
                          className="inline-flex items-center gap-2 text-base font-medium text-brand transition hover:text-brandHover"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
                          {loc.label}
                        </Link>
                      ) : (
                        <span className="text-base text-mist">{loc.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-5 text-sm text-mist">Coming soon</p>
              )}
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-line bg-canvas p-6">
          <h3 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-inkStrong">
            <span className="inline-block border-b-2 border-brand pb-1">Global</span>
          </h3>
          <Link
            href="/"
            className="mt-4 inline-flex items-center gap-2 text-base font-medium text-brand transition hover:text-brandHover"
          >
            <GlobeIcon className="h-5 w-5" />
            Corporate Website
          </Link>
        </div>
      </div>
    </section>
  );
}
