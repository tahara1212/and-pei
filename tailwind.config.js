/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      gray: '#2f4f4f',
      lightgray: '#ddd',
      mist: '#eee',
      white: '#e3e3e3',
      category: '#eee',
      time: '#808080',
      code: '#364549',
    },
    extend: {
      fontFamily: {
        NotoSerifJP: ['Noto Serif JP', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
