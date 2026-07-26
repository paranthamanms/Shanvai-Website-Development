'use client';

import { useState } from 'react';
import { OFFICE_REGIONS } from '@/data/offices';

/** CRIF-style regional directory: region tabs + office list */
export function ContactOffices() {
  const [active, setActive] = useState(OFFICE_REGIONS[0]?.id ?? 'asia');
  const region = OFFICE_REGIONS.find((r) => r.id === active) ?? OFFICE_REGIONS[0];

  return (
    <section className="mt-16 border-t border-line pt-14">
      <h2 className="font-display text-2xl font-semibold text-inkStrong sm:text-3xl">
        International contacts
      </h2>
      <p className="mt-3 max-w-2xl text-base text-mist">
        Find Shanvai desks near you.
      </p>

      <div className="mt-8 flex flex-wrap gap-2 border-b border-line pb-0">
        {OFFICE_REGIONS.map((r) => {
          const on = r.id === active;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => setActive(r.id)}
              className={`-mb-px border-b-2 px-4 py-3 text-sm font-semibold transition ${
                on
                  ? 'border-brand text-brand'
                  : 'border-transparent text-mist hover:text-inkStrong'
              }`}
              aria-pressed={on}
            >
              {r.name}
            </button>
          );
        })}
      </div>

      {region && (
        <ul className="mt-8 divide-y divide-line">
          {region.offices.map((office) => (
            <li key={office.name} className="grid gap-2 py-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:gap-8">
              <div>
                <p className="font-display text-base font-semibold text-inkStrong">{office.name}</p>
                {office.role && <p className="mt-1 text-sm text-brand">{office.role}</p>}
              </div>
              <div className="text-sm leading-relaxed text-mist">
                {office.address.map((line) => (
                  <p key={line}>{line}</p>
                ))}
                {office.phone && <p className="mt-2 text-inkStrong">{office.phone}</p>}
                {office.email && (
                  <a
                    href={`mailto:${office.email}`}
                    className="mt-2 inline-block font-semibold text-brand hover:text-brandHover"
                  >
                    {office.email}
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
