import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        lightBg: 'url("/img/light_bg.jpg")',
        darkBg: 'url("/img/dark_bg.jpg")',
      },
      fontFamily: {
        marmelad: ['var(--font-marmelad)'],
        urbanist: ['var(--font-urbanist)'],
      },
      colors: {
        btnBg: '#58A6DF',
        btnBgHover: '#4382B0',
        ratingColor: '#FFA800',
        linksColor: '#0D99F4',
      },
      boxShadow: {
        'card': '0 0px 5px rgba(255, 255, 255, 0.2), 0 0px 15px rgba(255, 255, 255, 0.4)',
      },
      textColor: {
        eilbay: '#58A6DF',
      },
      borderColor: {
        post: '#e6e3e3',
      },
    },
    screens: {
      base: '0px',
      phone: '320px',
      tablet: '640px',
      laptop: '1024px',
      desktop: '1440px',
      'laptop-height': { 'raw': '(min-height: 1024px)' },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  darkMode: 'class',
}

export default config
