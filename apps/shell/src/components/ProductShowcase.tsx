import Link from 'next/link';
import { PRODUCTS } from '@/data/products';

type ProductShowcaseProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
};

export function ProductShowcase({
  id = 'products',
  eyebrow = 'Products',
  title = 'Platforms built for regulated decisioning',
  subtitle =
    'Decision, bureau, AIOps, and partnership capabilities — designed for institutions that ship under scrutiny.',
}: ProductShowcaseProps) {
  return (
    <section id={id} className="section-pad bg-white">
      <div className="site-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">{eyebrow}</p>
          <h2 className="section-title mt-3">{title}</h2>
          <p className="section-lead">{subtitle}</p>
        </div>

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {PRODUCTS.map((p) => (
            <article key={p.name} className="border-t border-line pt-6 text-left">
              <h3 className="font-display text-xl font-semibold text-inkStrong">{p.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mist sm:text-base">{p.blurb}</p>
              <Link
                href="/#contact"
                className="mt-4 inline-flex text-sm font-semibold text-brand transition hover:text-brandHover"
              >
                Request a demo →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
