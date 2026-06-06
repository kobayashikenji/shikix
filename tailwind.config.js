/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        shiki: {
          red:     '#00a07e',
          gold:    '#888888',
          dark:    '#f0f0f0',
          darker:  '#f5f5f5',
          card:    '#ffffff',
          surface: '#f7f7f7',
          accent:  '#00a07e',
          muted:   '#888888',
        },
      },
      boxShadow: {
        'card': '0 1px 4px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)',
        'glow': '0 2px 8px rgba(0,160,126,0.2)',
      },
      animation: {
        'fade-up':    'fadeUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'shimmer':    'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
