/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#050505',
        bg2: '#0d0d0d',
        bg3: '#111111',
        bg4: '#1a1a1a',
        accent: '#00C2FF',
        accent2: '#7C3AED',
        accent3: '#00FFC8',
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        grotesk: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

