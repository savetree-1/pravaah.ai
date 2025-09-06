/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#071028',
        panel: '#0E1A2B',
        accent: '#00C2A8',
        accent2: '#FFB400',
        muted: '#9AA7BD',
        glass: 'rgba(255,255,255,0.04)',
        glow: 'rgba(0,194,168,0.18)',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Sora', 'Poppins', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-accent': '0 6px 28px rgba(0,194,168,0.12), 0 2px 8px rgba(0,0,0,0.4)',
        'card': '0 8px 30px rgba(2,6,23,0.6)',
        'card-hover': '0 18px 48px rgba(2,6,23,0.75), 0 0 30px rgba(0,194,168,0.12)',
      },
      backgroundImage: {
        'gradient-card': 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
        'gradient-shard': 'linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
}
