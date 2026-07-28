/** @type {import('tailwindcss').Config} */

/*
  Feeling Mutual design tokens — 2026 revision.

  The 2021 system had ten colours named after their appearance (maroon, gold,
  sandybrown…), used as full-bleed section grounds. Measurement showed the four
  that carry the brand — maroon 336°, pink 349°, tomato 4°, sandybrown 29° —
  are a single hue family spanning a ~55° arc of red-orange. The green, blue,
  gold and midnight were the outliers.

  So: those four become one `brand` ramp, on a warm-biased `ink` neutral scale.
  Colour is a deliberate accent against neutral ground rather than wall-to-wall
  background. Every pairing below is validated to WCAG AA — see docs/BRAND-AUDIT-2026.md.

  Usage rules the ramp encodes:
    brand-800 / 900   dark grounds, and heading accent on light
    brand-600         text and links on light grounds (6.90:1 on ink-50)
    brand-500         action surfaces — buttons. NOT text on light (4.36:1)
    brand-400         decorative, or text on dark grounds only
    brand-300         accent on dark grounds — never text on light (1.78:1)
    brand-100 / 200   tint surfaces
    ink-500           borders and dividers — not text (3.93:1)
    ink-600           muted text on light (6.03:1)
*/

export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
    },
    screens: {
      'sm': '480px',
      'md': '768px',
      'lg': '1024px',   // was 1150 — that left 1024-1149px devices on the mobile layout
      'xl': '1280px',
      '2xl': '1536px',
      // Legacy max-width queries, kept so existing markup keeps working.
      'mobile-only': { 'max': '480px' },
      'no-desktop': { 'max': '1023px' },
    },
    extend: {
      colors: {
        // ---- warm neutral scale ----
        ink: {
          50:  '#FBF9F7',
          100: '#F5F1EC',
          150: '#EDE7E0',
          200: '#E3DBD2',
          300: '#D0C5B9',
          400: '#AEA294',
          500: '#877B6E',
          600: '#685E54',
          700: '#4C443C',
          800: '#302B26',
          900: '#1D1917',
          950: '#121010',
        },
        // ---- brand ramp (one hue family, four original values + five derived) ----
        brand: {
          50:  '#FDEDE9',
          100: '#FEC8D2', // was `pink`
          200: '#FFD3A6',
          300: '#FFAB5C', // was `sandybrown`
          400: '#FA5A50', // was `tomato`
          500: '#D83B2E',
          600: '#A81E33',
          800: '#6D012D', // was `maroon`
          900: '#5A0125',
        },
      },

      // Strict scale. Each step carries its own leading and tracking so display
      // type can never again inherit line-height 1.0 and zero tracking.
      fontSize: {
        'label':   ['0.75rem',  { lineHeight: '1.4',  letterSpacing: '0.12em',  fontWeight: '500' }],
        'caption': ['0.8125rem',{ lineHeight: '1.5',  letterSpacing: '0.005em' }],
        'sm':      ['0.9375rem',{ lineHeight: '1.6',  letterSpacing: '0'       }],
        'base':    ['1.0625rem',{ lineHeight: '1.65', letterSpacing: '0'       }],
        'lg':      ['1.25rem',  { lineHeight: '1.55', letterSpacing: '-0.005em'}],
        'xl':      ['1.5rem',   { lineHeight: '1.4',  letterSpacing: '-0.01em' }],
        '2xl':     ['1.875rem', { lineHeight: '1.25', letterSpacing: '-0.015em'}],
        '3xl':     ['2.5rem',   { lineHeight: '1.15', letterSpacing: '-0.021em'}],
        '4xl':     ['3.5rem',   { lineHeight: '1.07', letterSpacing: '-0.028em'}],
        '5xl':     ['5rem',     { lineHeight: '1.0',  letterSpacing: '-0.035em'}],
        '6xl':     ['7rem',     { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        // Fluid display sizes — these are what carry the "oversized type" idea.
        'display':    ['clamp(2.75rem, 7vw, 5rem)',  { lineHeight: '1.0',  letterSpacing: '-0.035em' }],
        'display-xl': ['clamp(3.25rem, 9vw, 7rem)',  { lineHeight: '0.95', letterSpacing: '-0.04em'  }],
      },

      fontFamily: {
        sans: ['"Neue Haas Unica"', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },

      fontWeight: {
        light:  '300',
        normal: '400',
        medium: '500',
        bold:   '700',
      },

      // Vertical rhythm for section padding — replaces the ad-hoc py-6…py-[9rem].
      spacing: {
        'section-sm': '4rem',
        'section':    '6rem',
        'section-lg': '8rem',
        'section-xl': '10rem',
      },

      borderRadius: {
        'none': '0',
        'sm':   '0.25rem',
        DEFAULT:'0.375rem',
        'md':   '0.5rem',
        'lg':   '0.75rem',
        'xl':   '1.25rem',
        '2xl':  '2rem',
      },

      // Warm shadows — tinted with the brand's own dark rather than pure black,
      // so they don't go grey-muddy over the warm neutrals.
      boxShadow: {
        'e1': '0 1px 2px rgba(45, 10, 20, 0.05), 0 1px 3px rgba(45, 10, 20, 0.04)',
        'e2': '0 2px 4px rgba(45, 10, 20, 0.05), 0 4px 12px rgba(45, 10, 20, 0.06)',
        'e3': '0 4px 8px rgba(45, 10, 20, 0.06), 0 12px 28px rgba(45, 10, 20, 0.09)',
        'e4': '0 8px 16px rgba(45, 10, 20, 0.07), 0 24px 56px rgba(45, 10, 20, 0.12)',
      },

      transitionTimingFunction: {
        'out-soft': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'in-out-soft': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },

      maxWidth: {
        'measure':    '64ch',  // running body copy
        'measure-lg': '78ch',  // wider intro copy
        'display':    '18ch',  // display headings — keeps them 2-3 lines
      },
    },
  },
  plugins: [],
}
