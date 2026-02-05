/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.4s ease-in-out forwards',
        'spin': 'spin 1s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      colors: {
        'magna-red': '#E70008',
        'magna-orange': '#FF9940',
        'magna-cream': '#F9E4AD',
        'magna-black': '#000000',
        // semantic aliases
        'primary': '#E70008',
        'secondary': '#FF9940',
        'foreground': '#000000',
        'background': '#F9E4AD'
      },
    },
  },
  plugins: [],
};

export default config;
