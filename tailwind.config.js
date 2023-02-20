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
      mainGray: '#eee',
      subGray: '#ddd',
      midnight: '#121063',
      category: '#eee',
      time: '#808080',
      gray: '#808080',
      'bubble-gum': '#ff77e9',
      bermuda: '#78dcca',
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
