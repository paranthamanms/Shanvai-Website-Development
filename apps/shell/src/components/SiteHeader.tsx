'use client';

import Link from 'next/link';
import { BrandLogo } from './BrandLogo';
import { PresenceGlobeMenu } from './PresenceGlobeMenu';

const links = [
  { href: '/#products', label: 'Products' },
  { href: '/trending', label: 'Trending' },
  { href: '/#demo', label: 'Demo' },
  { href: '/contact', label: 'Contact' },
];

/** Match hero brand lockup: Space Grotesk semibold + same logo scale */
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[4.25rem] border-b border-line bg-white/95 backdrop-blur-md">
      <div className="site-container flex h-full items-center justify-between gap-4">
        <Link href="/" className="inline-flex min-w-0 items-center gap-3">
          <BrandLogo size={36} priority decorative className="shrink-0" />
          <span className="font-display text-xl font-semibold tracking-tight text-inkStrong sm:text-2xl sm:text-[1.75rem]">
            <span className="sm:hidden">Shanvai</span>
            <span className="hidden sm:inline">Shanvai Technologies</span>
          </span>
        </Link>

        <nav className="flex shrink-0 items-center gap-2 md:gap-4" aria-label="Primary">
          <div className="hidden items-center gap-5 lg:flex xl:gap-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-display text-base font-semibold tracking-tight text-inkStrong transition hover:text-brand"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <PresenceGlobeMenu />
          <Link
            href="/contact"
            className="btn-primary hidden font-display sm:inline-flex"
          >
            Request demo
          </Link>
        </nav>
      </div>
    </header>
  );
}
