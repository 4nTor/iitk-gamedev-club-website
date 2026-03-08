/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0b',
        panel: '#141518',
        accent: '#d8d9dd',
        accent2: '#b59f77',
      },
      boxShadow: {
        glow: '0 0 28px rgba(216, 217, 221, 0.14)',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};