import Link from 'next/link';
import { BrandLogo } from '@/components/BrandLogo';
import { ContactForm } from '@/components/ContactForm';

/** CRIF-style contacts band for homepage bottom — matches /contact layout */
export function HomeContact() {
  return (
    <section id="contact" className="bg-navy">
      <div className="site-container grid gap-10 py-16 lg:grid-cols-2 lg:items-start lg:gap-16 lg:py-20">
        <div className="text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brandMuted">
            Contacts
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
            Are you a business customer?
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/70">
            Get in touch for information on Decision Core, Credit Bureau, AIOps, or an enterprise
            partnership. Our solutions team will follow up with a tailored next step.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brandMuted transition hover:text-white"
          >
            Open full contacts page
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="rounded-md border border-white/10 bg-white p-5 shadow-soft sm:p-6">
          <div className="mb-4 flex items-center gap-2 border-b border-line pb-4">
            <BrandLogo size={20} decorative className="shrink-0" />
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-semibold text-inkStrong">
                Request an enterprise demo
              </p>
              <p className="text-xs text-mist">Get in touch for information</p>
            </div>
          </div>
          <ContactForm embedded id="home-contact-form" />
        </div>
      </div>
    </section>
  );
}
