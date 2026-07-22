'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { GlobeIcon } from './GlobeIcon';
import { PRESENCE_REGIONS } from '@/data/presence';

function ChevronDown({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M2.5 4.25 6 7.75l3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IndiaFlag({ className = 'h-4 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 21 15" aria-hidden="true">
      <rect width="21" height="5" y="0" fill="#FF9933" />
      <rect width="21" height="5" y="5" fill="#FFFFFF" />
      <rect width="21" height="5" y="10" fill="#138808" />
      <circle cx="10.5" cy="7.5" r="1.6" fill="#000080" />
    </svg>
  );
}

export function PresenceGlobeMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearCloseTimer() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function openMenu() {
    clearCloseTimer();
    setOpen(true);
  }

  function scheduleClose() {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(false), 180);
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    function onPointerDown(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('mousedown', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('mousedown', onPointerDown);
      clearCloseTimer();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        id="country-trigger"
        aria-label="Choose your country"
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="true"
        onFocus={openMenu}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1 rounded-md px-1.5 py-1.5 transition ${
          open ? 'bg-brandSoft text-brand' : 'text-mist hover:bg-canvas hover:text-brand'
        }`}
      >
        <GlobeIcon className="h-5 w-5" />
        <ChevronDown className={`h-3 w-3 transition ${open ? 'rotate-180' : ''}`} />
      </button>

      <nav
        id={panelId}
        aria-labelledby="country-trigger"
        className={`fixed inset-x-0 top-16 z-50 border-b border-line bg-white shadow-soft transition ${
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-2 opacity-0'
        }`}
        onMouseEnter={openMenu}
        onMouseLeave={scheduleClose}
      >
        <div className="site-container py-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {PRESENCE_REGIONS.map((region) => (
              <div key={region.id}>
                <h2 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-inkStrong">
                  <span className="inline-block border-b-2 border-brand pb-1">{region.name}</span>
                </h2>
                {region.locations.length > 0 ? (
                  <ul className="mt-5 columns-1 gap-x-8 sm:columns-2">
                    {region.locations.map((loc) => (
                      <li key={loc.label} className="mb-3 break-inside-avoid">
                        {loc.available && loc.href ? (
                          <Link
                            href={loc.href}
                            className="inline-flex items-start gap-2 text-base text-inkStrong transition hover:text-brand"
                            onClick={() => setOpen(false)}
                          >
                            {loc.label === 'India' && <IndiaFlag className="mt-0.5 h-4 w-5 shrink-0" />}
                            <span className="font-medium">{loc.label}</span>
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
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-line pt-5">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-inkStrong">
              <span className="inline-block border-b-2 border-brand pb-1">Global</span>
            </h2>
            <Link
              href="/"
              className="mt-4 inline-flex items-center gap-2 text-base font-medium text-inkStrong transition hover:text-brand"
              onClick={() => setOpen(false)}
            >
              <GlobeIcon className="h-5 w-5 text-brand" />
              Corporate Website
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
