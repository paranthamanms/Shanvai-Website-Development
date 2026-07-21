/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#070B14',
        abyss: '#050810',
        panel: '#0E1628',
        electric: '#1AE0FF',
        electricDim: '#0A8FAD',
        mist: '#9BB0C9',
        snow: '#E8EEF7',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to right, rgba(26,224,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,224,255,0.06) 1px, transparent 1px)',
        'hero-glow':
          'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(26,224,255,0.18), transparent 55%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(10,143,173,0.12), transparent 50%)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
    },
  },
  plugins: [],
};
