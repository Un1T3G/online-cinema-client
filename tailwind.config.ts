import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        divider: 'zinc-100 dark:zinc-800',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      backgroundImage: {
        'fade-gradient':
          'linear-gradient(90deg, #100f12 3.31%, rgba(16, 15, 18, 0.99) 7.71%, rgba(16, 15, 18, 0.96) 12.11%, rgba(16, 15, 18, 0.91) 16.51%, rgba(16, 15, 18, 0.85) 20.91%, rgba(16, 15, 18, 0.76) 25.31%, rgba(16, 15, 18, 0.67) 29.71%, rgba(16, 15, 18, 0.55) 34.11%, rgba(16, 15, 18, 0.44) 38.52%, rgba(16, 15, 18, 0.33) 42.92%, rgba(16, 15, 18, 0.23) 47.32%, rgba(16, 15, 18, 0.15) 51.72%, rgba(16, 15, 18, 0.08) 56.12%, rgba(16, 15, 18, 0.03) 60.52%, rgba(16, 15, 18, 0.01) 64.92%, rgba(16, 15, 18, 0) 69.32%)',
        'fade-gradient-90':
          'linear-gradient(0, #100f12 3.31%, rgba(16, 15, 18, 0.99) 7.71%, rgba(16, 15, 18, 0.96) 12.11%, rgba(16, 15, 18, 0.91) 16.51%, rgba(16, 15, 18, 0.85) 20.91%, rgba(16, 15, 18, 0.76) 25.31%, rgba(16, 15, 18, 0.67) 29.71%, rgba(16, 15, 18, 0.55) 34.11%, rgba(16, 15, 18, 0.44) 38.52%, rgba(16, 15, 18, 0.33) 42.92%, rgba(16, 15, 18, 0.23) 47.32%, rgba(16, 15, 18, 0.15) 51.72%, rgba(16, 15, 18, 0.08) 56.12%, rgba(16, 15, 18, 0.03) 60.52%, rgba(16, 15, 18, 0.01) 64.92%, rgba(16, 15, 18, 0) 69.32%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config
