'use client';

import Link from 'next/link';
import { BrandLogo } from './BrandLogo';
import { PresenceGlobeMenu } from './PresenceGlobeMenu';

const links = [
  { href: '/#products', label: 'Products' },
  { href: '/#demo', label: 'Demo' },
  { href: '/#contact', label: 'Contact' },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-line bg-white/95 backdrop-blur-md">
      <div className="site-container flex h-full items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <BrandLogo size={32} priority decorative />
          <span className="font-display text-lg font-semibold tracking-tight text-inkStrong">
            Shanvai
          </span>
        </Link>

        <nav className="flex items-center gap-4 md:gap-5" aria-label="Primary">
          <div className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-ink transition hover:text-brand"
              >
                {l.label}
              </a>
            ))}
          </div>
          <PresenceGlobeMenu />
          <a href="/#contact" className="btn-primary hidden sm:inline-flex">
            Request demo
          </a>
        </nav>
      </div>
    </header>
  );
}
