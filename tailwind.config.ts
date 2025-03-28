import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-hover': 'var(--primary-hover)',
        secondary: 'var(--secondary)',
        'secondary-hover': 'var(--secondary-hover)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        muted: 'var(--muted)',
        'card-bg': 'var(--card-bg)',
        'card-border': 'var(--card-border)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: 'var(--foreground)',
            a: {
              color: 'var(--primary)',
              '&:hover': {
                color: 'var(--primary-hover)',
              },
            },
            h1: {
              color: 'var(--foreground)',
            },
            h2: {
              color: 'var(--foreground)',
            },
            h3: {
              color: 'var(--foreground)',
            },
            h4: {
              color: 'var(--foreground)',
            },
            strong: {
              color: 'var(--foreground)',
            },
            code: {
              color: 'var(--foreground)',
              backgroundColor: 'var(--card-bg)',
            },
            pre: {
              backgroundColor: 'var(--card-bg)',
              color: 'var(--foreground)',
            },
            blockquote: {
              color: 'var(--foreground)',
              borderLeftColor: 'var(--primary)',
            },
          },
        },
      }),
      transitionDuration: {
        '2000': '2000ms',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        pulse: 'pulse 3s ease-in-out infinite',
        fadeIn: 'fadeIn 0.5s ease-in-out',
        slideUp: 'slideUp 0.5s ease-in-out',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config;