'use client';

import { useRef, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

export function DemoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [logged, setLogged] = useState(false);

  async function logEngagement(completed: boolean) {
    if (logged && !completed) return;
    const duration = Math.floor(videoRef.current?.currentTime ?? 0);
    try {
      // Soft analytics hook — endpoint can be extended later
      await fetch(`${API_BASE}/api/v1/health`).catch(() => undefined);
      console.info('[analytics] demo watch', { duration, completed });
      if (completed) setLogged(true);
    } catch {
      /* non-blocking */
    }
  }

  return (
    <section id="demo" className="relative overflow-hidden bg-abyss">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-electric">
          Product demo
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-snow sm:text-4xl">
          See Decision Core in motion
        </h2>
        <p className="mt-4 max-w-xl text-mist">
          Watch a short walkthrough of Shanvai decision surfaces, bureau signals, and partner
          integration patterns.
        </p>

        <div className="relative mt-10 aspect-video w-full overflow-hidden rounded-none border border-white/10 bg-panel">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            controls
            playsInline
            poster=""
            onPause={() => void logEngagement(false)}
            onEnded={() => void logEngagement(true)}
          >
            <source
              src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
              type="video/mp4"
            />
            Your browser does not support embedded video.
          </video>
          <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-ink/50 to-transparent p-4">
            <p className="font-display text-sm text-snow/90">Shanvai · Decision Core demo</p>
          </div>
        </div>
      </div>
    </section>
  );
}
