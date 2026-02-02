/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        'skylink-navy': '#0a192f', // Deepest Navy
        'skylink-slate': '#334155', // Corporate Slate
        'skylink-blue': '#1e3a8a', // Traditional Trust Blue (Darker)
        'skylink-gold': '#c29b40', // Executive Accent
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Merriweather', 'serif'], // Weighted Headings
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        // Explicitly overriding xl+ to be sharper if utilized, or we just won't use them
      }
    },
  },
  plugins: [],
}
