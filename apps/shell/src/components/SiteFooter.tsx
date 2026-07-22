import { BrandLogo } from './BrandLogo';

const productDemoLinks = [
  {
    href: '/#demo',
    title: 'Decision Core demo',
    detail: 'Policy packs, risk scoring, and explainable approve / review outcomes.',
  },
  {
    href: '/#demo',
    title: 'Credit Bureau demo',
    detail: 'Multi-source ingestion, enrichment, and partner-ready bureau APIs.',
  },
  {
    href: '/#demo',
    title: 'AIOps demo',
    detail: 'Anomaly detection, recommended actions, and automated remediation flows.',
  },
  {
    href: '/#products',
    title: 'All platforms',
    detail: 'Explore Decision Core, Credit Bureau, AIOps, and partnership options.',
  },
];

const contactLinks = [
  {
    href: '/#contact',
    title: 'Request a demo',
    detail: 'Share your institution details and we will schedule a tailored walkthrough.',
  },
  {
    href: 'mailto:solutions@shanvai.tech',
    title: 'solutions@shanvai.tech',
    detail: 'Email our solutions team for RFPs, pilots, and integration planning.',
  },
  {
    href: '/#contact',
    title: 'Partnership inquiry',
    detail: 'Banks, NBFCs, and fintechs can start a co-built decision journey.',
  },
  {
    href: '/presence',
    title: 'Global presence',
    detail: 'Find Shanvai across Europe, Middle East & Africa, Asia & Australia, and the Americas.',
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-canvas">
      <div className="site-container py-14">
        <div className="mb-10 flex items-center gap-2.5">
          <BrandLogo size={28} decorative />
          <p className="font-display text-base font-semibold text-inkStrong">Shanvai Technologies</p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <section>
            <h2 className="font-display text-lg font-semibold text-inkStrong">Product Demo</h2>
            <p className="mt-2 text-sm text-mist">
              Interactive walkthroughs of each Shanvai platform.
            </p>
            <ul className="mt-5 space-y-4">
              {productDemoLinks.map((item) => (
                <li key={item.title}>
                  <a
                    href={item.href}
                    className="text-sm font-semibold text-brand transition hover:text-brandHover"
                  >
                    {item.title}
                  </a>
                  <p className="mt-1 text-sm leading-relaxed text-mist">{item.detail}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-inkStrong">Contact Us</h2>
            <p className="mt-2 text-sm text-mist">
              Demos, partnerships, and enterprise onboarding support.
            </p>
            <ul className="mt-5 space-y-4">
              {contactLinks.map((item) => (
                <li key={item.title}>
                  <a
                    href={item.href}
                    className="text-sm font-semibold text-brand transition hover:text-brandHover"
                  >
                    {item.title}
                  </a>
                  <p className="mt-1 text-sm leading-relaxed text-mist">{item.detail}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <p className="mt-12 border-t border-line pt-6 text-center text-sm text-mist">
          © {new Date().getFullYear()} Shanvai Technologies. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
