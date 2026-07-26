import type { Metadata } from 'next';
import Link from 'next/link';
import { BrandLogo } from '@/components/BrandLogo';
import { ContactForm } from '@/components/ContactForm';
import { ContactOffices } from '@/components/ContactOffices';

export const metadata: Metadata = {
  title: 'Contacts | Shanvai Technologies',
  description:
    'Get in touch with Shanvai for demos, partnerships, and enterprise onboarding across India, EMEA, and the Americas.',
};

/** CRIF-inspired contacts: white hero, dark business band, regional directory */
export default function ContactPage() {
  return (
    <div className="pt-[4.25rem]">
      <section className="border-b border-line bg-white">
        <div className="site-container py-14 sm:py-16">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-inkStrong sm:text-5xl">
            Contacts
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-mist sm:text-lg">
            Get in touch with our team or reach out to any of our regional desks. We’re here to
            support you wherever you are.
          </p>
        </div>
      </section>

      <section className="bg-navy">
        <div className="site-container grid gap-10 py-14 lg:grid-cols-2 lg:items-start lg:gap-16 lg:py-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brandMuted">
              Business
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
              Are you a business customer?
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/70">
              Get in touch for information on Decision Core, Credit Bureau, AIOps, or an enterprise
              partnership. Our solutions team will follow up with a tailored next step.
            </p>
            <a
              href="#contact-form"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brandMuted hover:text-white"
            >
              Get in touch for information
              <span aria-hidden>→</span>
            </a>
          </div>

          <div className="rounded-md border border-white/10 bg-white p-5 shadow-soft sm:p-6">
            <div className="mb-4 flex items-center gap-2 border-b border-line pb-4">
              <BrandLogo size={20} decorative className="shrink-0" />
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-semibold text-inkStrong">
                  Shanvai Technologies
                </p>
                <p className="text-xs text-mist">Get in touch for information</p>
              </div>
            </div>
            <ContactForm embedded id="contact-form" />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="site-container py-14 sm:py-16">
          <ContactOffices />
          <p className="mt-10 text-sm text-mist">
            Prefer email?{' '}
            <Link href="mailto:solutions@shanvai.tech" className="font-semibold text-brand">
              solutions@shanvai.tech
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
