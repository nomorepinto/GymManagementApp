/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primarybg: '#050E3C',
        secondarybg: '#002455',
        primarytext: '#DC0000',
        secondarytext: '#FF3838',
        accent: '#808080',
      },
      fontFamily: {
        nexaHeavy: ['nexa-heavy', 'sans'],
        nexaLight: ['nexa-light', 'sans'],
      },
    },
  },
  plugins: [],
};
