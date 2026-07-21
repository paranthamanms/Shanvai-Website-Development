'use client';

import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-hero-glow">
      <div
        className="pointer-events-none absolute inset-0 bg-grid-fade bg-grid opacity-40"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      <div className="relative mx-auto grid min-h-[100svh] max-w-6xl items-center gap-10 px-6 pb-16 pt-28 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="font-display text-4xl font-bold tracking-tight text-snow sm:text-5xl md:text-6xl"
          >
            Shanvai Technologies
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-5 max-w-xl text-xl font-medium leading-snug text-mist sm:text-2xl"
          >
            Decision intelligence for banks, NBFCs, and fintechs that cannot afford opaque risk.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-4 max-w-lg text-base leading-relaxed text-mist/85"
          >
            Decision Core and Credit Bureau — production-grade platforms for underwriting,
            bureau analytics, and partner-ready BFSI workflows.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#contact"
              className="rounded-lg bg-electric px-5 py-3 text-sm font-semibold text-ink transition hover:brightness-110"
            >
              Book an enterprise demo
            </a>
            <a
              href="#products"
              className="rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-snow transition hover:border-electric/40 hover:bg-electric/10"
            >
              Explore products
            </a>
          </motion.div>
          <div className="mt-10 h-px w-40 origin-left bg-gradient-to-r from-electric to-transparent animate-pulse-line" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="animate-drift relative hidden min-h-[380px] lg:block"
          aria-hidden
        >
          <div className="absolute inset-0 rounded-[2rem] border border-electric/20 bg-panel/80 shadow-[0_0_80px_rgba(26,224,255,0.12)] backdrop-blur-sm" />
          <div className="absolute inset-6 overflow-hidden rounded-[1.5rem] bg-abyss">
            <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-electric/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-electric/10 to-transparent" />
            <div className="relative flex h-full flex-col justify-between p-8">
              <div>
                <p className="font-display text-xs uppercase tracking-[0.2em] text-electric">
                  Live decision surface
                </p>
                <p className="mt-3 font-display text-3xl font-semibold text-snow">
                  Risk scored.
                  <br />
                  Policy explained.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {['Approve', 'Review', 'Bureau'].map((label, i) => (
                  <div
                    key={label}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-4"
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <p className="text-[10px] uppercase tracking-wider text-mist">{label}</p>
                    <p className="mt-2 font-display text-xl text-electric">
                      {i === 0 ? '92' : i === 1 ? '11' : 'A+'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
