'use client';

import { motion } from 'framer-motion';
import { BrandLogo } from './BrandLogo';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-glow pt-16">
      <div className="site-container grid min-h-[calc(100svh-4rem)] items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-6 inline-flex items-center gap-3"
          >
            <BrandLogo size={40} priority decorative />
            <span className="font-display text-2xl font-semibold tracking-tight text-inkStrong sm:text-[1.75rem]">
              Shanvai Technologies
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="max-w-xl font-display text-display-lg text-inkStrong sm:text-display-xl"
          >
            Decision intelligence for regulated BFSI.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-5 max-w-lg text-base leading-relaxed text-mist sm:text-lg"
          >
            Decision Core, Credit Bureau, and AIOps — production platforms for underwriting, bureau
            analytics, and intelligent operations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href="#contact" className="btn-primary">
              Book an enterprise demo
            </a>
            <a href="#products" className="btn-secondary">
              Explore products
            </a>
          </motion.div>

          <div className="mt-10 h-px w-28 bg-gradient-to-r from-brand to-transparent animate-pulse-line" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="animate-drift relative hidden min-h-[360px] lg:block"
          aria-hidden
        >
          <div className="absolute inset-0 rounded-2xl border border-line bg-white shadow-soft" />
          <div className="absolute inset-5 flex flex-col justify-between overflow-hidden rounded-xl bg-canvas p-7">
            <div className="rounded-xl bg-brandSoft px-5 py-5 ring-1 ring-brand/10">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                Live decision surface
              </p>
              <p className="mt-2 font-display text-2xl font-semibold text-inkStrong sm:text-3xl">
                Risk scored.
                <br />
                Policy explained.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Approve', value: '92' },
                { label: 'Review', value: '11' },
                { label: 'Bureau', value: 'A+' },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border border-line bg-white px-3 py-3.5">
                  <p className="text-xs uppercase tracking-wide text-mist">{item.label}</p>
                  <p className="mt-1.5 font-display text-xl font-semibold text-brand">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
