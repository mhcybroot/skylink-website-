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
        'skylink-blue': 'var(--skylink-blue, #1e3a8a)',
        'skylink-gold': 'var(--skylink-gold, #c29b40)',
        'tech-cyan': 'var(--tech-cyan, #06b6d4)',
        'tech-cyan-light': 'var(--tech-cyan-light, #22d3ee)',
        'tech-cyan-dark': 'var(--tech-cyan-dark, #0891b2)',
        // Aura Modern Minimalist Palette
        'aura-black': '#000000',
        'aura-dark': '#05070a',
        'aura-surface': '#0b0f17',
        'aura-card': 'rgba(255, 255, 255, 0.03)',
        'aura-cyan': '#00E5BE',
        'aura-cyan-light': '#00F5C4',
        'aura-cyan-dark': '#0d9488',
        'aura-emerald': '#10b981',
        'aura-border': 'rgba(255, 255, 255, 0.08)',
        'aura-border-cyan': 'rgba(0, 229, 190, 0.25)',
        'aura-muted': '#94A3B8',
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
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(6, 182, 212, 0.5), 0 0 10px rgba(6, 182, 212, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(6, 182, 212, 0.8), 0 0 30px rgba(6, 182, 212, 0.5)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(6, 182, 212, 0.3)',
        'glow': '0 0 20px rgba(6, 182, 212, 0.4)',
        'glow-lg': '0 0 30px rgba(6, 182, 212, 0.5)',
        'glow-gold': '0 0 20px rgba(194, 155, 64, 0.4)',
        'glow-blue': '0 0 20px rgba(30, 58, 138, 0.4)',
        'aura-sm': '0 0 15px rgba(0, 229, 190, 0.25)',
        'aura': '0 0 25px rgba(0, 229, 190, 0.35)',
        'aura-lg': '0 0 50px rgba(0, 229, 190, 0.45)',
        'aura-card': '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'inner-glow': 'inset 0 0 20px rgba(6, 182, 212, 0.2)',
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
        'aura-radial': 'radial-gradient(circle at center, rgba(0, 229, 190, 0.14) 0%, rgba(0, 229, 190, 0.03) 45%, transparent 70%)',
        'aura-spotlight': 'radial-gradient(circle 500px at 50% 30%, rgba(0, 229, 190, 0.12), transparent 80%)',
      },
    },
  },
  plugins: [],
}
