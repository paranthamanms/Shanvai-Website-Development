'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const links = [
  { href: '#products', label: 'Products' },
  { href: '#demo', label: 'Demo' },
  { href: '#contact', label: 'Contact' },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition ${
        scrolled
          ? 'border-b border-white/10 bg-ink/85 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="group flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-electric/15 ring-1 ring-electric/40">
            <span className="h-2.5 w-2.5 rounded-sm bg-electric" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-snow">
            Shanvai<span className="text-electric">.</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-mist transition hover:text-snow"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-lg bg-electric px-3.5 py-2 text-sm font-medium text-ink transition hover:brightness-110"
          >
            Request demo
          </a>
        </nav>
      </div>
    </header>
  );
}
