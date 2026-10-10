/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFCF9',
          100: '#FBF9F5',
          200: '#F5F0E6',
          300: '#EBE3D3',
          400: '#DCCEB5',
        },
        charcoal: {
          900: '#141312',
          800: '#1A1917',
          700: '#2A2926',
          600: '#3D3B37',
          500: '#54524D',
          400: '#75726C',
          300: '#9E9A92',
          200: '#C7C4BC',
          100: '#E8E6E1',
        },
        forest: {
          900: '#0F211A',
          800: '#152C23',
          700: '#1E3A2F',
          600: '#284E3F',
          500: '#386B57',
          100: '#E3EDE8',
        },
        terracotta: {
          900: '#732F18',
          800: '#943E20',
          700: '#B04C28',
          600: '#C85A32',
          500: '#D9714B',
          100: '#FCECE6',
        },
        sand: '#EFECE6',
      },
      fontFamily: {
        serif: ['Newsreader', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(20, 19, 18, 0.04)',
        'soft': '0 8px 24px -4px rgba(20, 19, 18, 0.06)',
        'soft-lg': '0 16px 36px -6px rgba(20, 19, 18, 0.08)',
        'editorial': '0 24px 48px -12px rgba(20, 19, 18, 0.1)',
      }
    },
  },
  plugins: [],
};
