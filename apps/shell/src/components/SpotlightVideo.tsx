'use client';

import { useEffect, useId, useState } from 'react';

type SpotlightVideoProps = {
  src: string;
  poster?: string;
  title: string;
  className?: string;
  /** Smaller preview; use Expand for full player */
  compact?: boolean;
  showBadge?: boolean;
};

/** On-site HTML5 player — content stays on shanvai.com (no YouTube redirect). */
export function SpotlightVideo({
  src,
  poster,
  title,
  className = '',
  compact = false,
  showBadge = true,
}: SpotlightVideoProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-lg border border-line bg-inkStrong shadow-soft ${className}`}
    >
      {showBadge && (
        <div className="pointer-events-none absolute left-2 top-2 z-10 rounded bg-brand px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white shadow-sm sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[11px]">
          Highlighted by Shanvai
        </div>
      )}
      <video
        className={`w-full bg-inkStrong ${compact ? 'aspect-video max-h-[140px] object-cover sm:max-h-[160px]' : 'aspect-video'}`}
        controls
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={title}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support embedded video.
      </video>
    </div>
  );
}

type ExpandableSpotlightProps = {
  src: string;
  poster?: string;
  title: string;
  subtitle?: string;
};

/** Compact card with expand-to-lightbox for full-size playback */
export function ExpandableSpotlight({ src, poster, title, subtitle }: ExpandableSpotlightProps) {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <article className="flex flex-col overflow-hidden rounded-lg border border-line bg-white shadow-lift">
        <SpotlightVideo src={src} poster={poster} title={title} compact />
        <div className="flex flex-1 flex-col p-3 sm:p-4">
          <h3 className="font-display text-sm font-semibold leading-snug text-inkStrong sm:text-base">
            {title}
          </h3>
          {subtitle && <p className="mt-1 text-xs text-mist sm:text-sm">{subtitle}</p>}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-3 inline-flex items-center justify-center gap-1.5 self-start rounded-md border border-line bg-brandSoft px-3 py-1.5 text-xs font-semibold text-brand transition hover:border-brand/30 hover:bg-brandWash"
          >
            Expand video
            <span aria-hidden>↗</span>
          </button>
        </div>
      </article>

      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-navy/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl rounded-xl border border-white/10 bg-navy p-3 shadow-soft sm:p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <h2 id={titleId} className="font-display text-lg font-semibold text-white sm:text-xl">
                {title}
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md border border-white/20 px-3 py-1.5 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                Close
              </button>
            </div>
            <SpotlightVideo src={src} poster={poster} title={title} showBadge className="border-white/10" />
          </div>
        </div>
      )}
    </>
  );
}
