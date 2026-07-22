/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // WCAG-friendly slate neutrals (enterprise standard)
        ink: '#475569',
        inkStrong: '#1E293B',
        mist: '#64748B',
        // Logo-aligned brand (sky-600 from shanvai-logo.svg)
        brand: '#0284C7',
        brandHover: '#0369A1',
        brandMuted: '#0EA5E9',
        brandSoft: '#F0F9FF',
        brandWash: '#E0F2FE',
        // Surfaces
        paper: '#FFFFFF',
        surface: '#FFFFFF',
        canvas: '#F8FAFC',
        line: '#E2E8F0',
        // Legacy aliases
        inkBlue: '#0284C7',
        inkBlueHover: '#0369A1',
        snow: '#1E293B',
        electric: '#0284C7',
        electricDim: '#0369A1',
        panel: '#FFFFFF',
        abyss: '#F8FAFC',
        slateSoft: '#F1F5F9',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
      },
      maxWidth: {
        content: '72rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(15, 23, 42, 0.06)',
        lift: '0 1px 2px rgba(15, 23, 42, 0.05), 0 4px 12px rgba(15, 23, 42, 0.06)',
        header: '0 1px 0 rgba(226, 232, 240, 1)',
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(ellipse 70% 50% at 85% 15%, rgba(14,165,233,0.12), transparent 50%), radial-gradient(ellipse 50% 40% at 10% 90%, rgba(2,132,199,0.06), transparent 45%)',
      },
    },
  },
  plugins: [],
};
