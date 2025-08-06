import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Genesys Brand Colors
        'genesys-orange': {
          DEFAULT: '#FF451A',
          light: '#FF6B47',
          dark: '#E63711',
        },
        'genesys-navy': {
          DEFAULT: '#152550',
          light: '#1E3A7C',
          dark: '#0D1830',
        },
        'genesys-success': {
          DEFAULT: '#18CAA8',
          light: '#3DDDC0',
        },
        'genesys-info': {
          DEFAULT: '#2243A2',
          light: '#3562C9',
        },
        'genesys-warning': {
          DEFAULT: '#F7AD00',
          light: '#FFBF33',
        },
        'genesys-danger': {
          DEFAULT: '#CC3715',
          light: '#E55936',
        },
        // Dark theme backgrounds
        'dark-bg': '#0A0E1C',
        'dark-surface': '#111827',
        'dark-elevated': '#1F2937',
      },
      fontFamily: {
        sans: ['Roboto', '-apple-system', 'system-ui', 'BlinkMacSystemFont', '"Segoe UI"', 'Arial', 'sans-serif'],
        mono: ['"Roboto Mono"', 'monospace'],
      },
      backgroundImage: {
        // Gradients
        'gradient-primary': 'linear-gradient(135deg, #FF451A 0%, #FF6B47 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #152550 0%, #1E3A7C 100%)',
        'gradient-hero': 'linear-gradient(135deg, #0A0E1C 0%, #152550 50%, #0A0E1C 100%)',
        'gradient-glass': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        'gradient-glass-colored': 'linear-gradient(135deg, rgba(255,69,26,0.03) 0%, rgba(21,37,80,0.05) 50%, rgba(255,255,255,0.02) 100%)',
      },
      backdropBlur: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '20px',
      },
      backdropSaturate: {
        120: '120%',
        150: '150%',
        180: '180%',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(10,14,28,0.5)',
        'glass-sm': '0 2px 8px rgba(0,0,0,0.3)',
        'glass-lg': '0 12px 48px rgba(0,0,0,0.6)',
        'colored': '0 8px 32px rgba(255,69,26,0.25)',
        'colored-hover': '0 12px 40px rgba(255,69,26,0.35)',
        'glow-orange': '0 0 20px rgba(255,69,26,0.6)',
        'glow-green': '0 0 20px rgba(24,202,168,0.6)',
        'glow-blue': '0 0 20px rgba(34,67,162,0.6)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%': { opacity: '0.5' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config