import Link from 'next/link';
import { BrandLogo } from './BrandLogo';

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.69 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.84.56 9.38.56 9.38.56s7.54 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    ),
  },
];

const columns = [
  {
    title: 'Products',
    links: [
      { href: '/#products', label: 'Decision Core' },
      { href: '/#products', label: 'Credit Bureau' },
      { href: '/#products', label: 'AIOps' },
      { href: '/#products', label: 'Enterprise Partnerships' },
    ],
  },
  {
    title: 'Trending',
    links: [
      { href: '/trending', label: 'What is trending' },
      { href: '/trending', label: 'Industry news' },
      { href: '/trending', label: 'Shanvai Spotlights' },
      { href: '/trending', label: 'Insights' },
    ],
  },
  {
    title: 'Demo',
    links: [
      { href: '/#demo', label: 'Product demos' },
      { href: '/#demo', label: 'Decision Core journey' },
      { href: '/#demo', label: 'Credit Bureau journey' },
      { href: '/#demo', label: 'AIOps journey' },
    ],
  },
  {
    title: 'Contacts',
    links: [
      { href: '/contact', label: 'Contact us' },
      { href: '/contact#contact-form', label: 'Request a demo' },
      { href: 'mailto:solutions@shanvai.tech', label: 'solutions@shanvai.tech' },
      { href: '/presence', label: 'Global presence' },
    ],
  },
];

/** CRIF-style dark footer: left brand + socials, then link columns */
export function SiteFooter() {
  return (
    <footer className="bg-navy text-white">
      <div className="site-container py-14">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2.1fr)] lg:gap-16">
          <div className="text-left">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <BrandLogo size={24} decorative />
              <span className="font-display text-base font-semibold tracking-tight text-white">
                Shanvai
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
              Decision intelligence for regulated BFSI — Decision Core, Credit Bureau, and AIOps.
            </p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
              Follow us
            </p>
            <ul className="mt-3 flex items-center gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-brandMuted hover:bg-white/5 hover:text-white"
                    aria-label={s.label}
                  >
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {columns.map((col) => (
              <section key={col.title} className="text-left">
                <h2 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-white">
                  {col.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/65 transition hover:text-brandMuted"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>

        <p className="mt-12 border-t border-white/10 pt-6 text-left text-sm text-white/45">
          © {new Date().getFullYear()} Shanvai Technologies. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
