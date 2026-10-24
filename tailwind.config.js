/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFFFF',
          100: '#FDFBF7', // Main warm paper background
          200: '#F7F3EA',
          300: '#ECE5D8',
          400: '#DED3C1',
          500: '#C7B79E',
        },
        obsidian: {
          950: '#070C18',
          900: '#0F172A', // Main dark midnight background (never pure black)
          800: '#1E293B', // Dark surface card
          700: '#334155', // Elevated borders and high-contrast secondary
          600: '#475569',
          500: '#64748B',
        },
        terracotta: {
          light: '#F97316',
          DEFAULT: '#EA580C',
          dark: '#C2410C',
          deep: '#9A3412',
        },
        'spanish-gold': {
          light: '#F59E0B',
          DEFAULT: '#D97706',
          dark: '#B45309',
          deep: '#92400E',
        },
        'emerald-vibrant': {
          light: '#34D399',
          DEFAULT: '#10B981',
          dark: '#059669',
          deep: '#047857',
        },
        'amber-vibrant': {
          light: '#FBBF24',
          DEFAULT: '#F59E0B',
          dark: '#D97706',
          deep: '#B45309',
        },
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', '"Outfit"', 'sans-serif'],
        sans: ['"Inter"', '"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        serif: ['"Lora"', '"Merriweather"', '"Fraunces"', 'Georgia', 'serif'],
        lora: ['"Lora"', 'Georgia', 'serif'],
        merriweather: ['"Merriweather"', 'Georgia', 'serif'],
        fraunces: ['"Fraunces"', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
