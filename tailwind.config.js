/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./App.{js,ts,tsx}', './app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primarybg: '#050E3C',
        secondarybg: '#002455',
        thirdbg: colors.slate[800],
        selectbg: colors.slate[900],
        primarytext: '#DC0000',
        secondarytext: '#FF3838',
        accent: '#808080',
        accent2: colors.slate[700],
      },
      fontFamily: {
        nexaHeavy: ['nexa-heavy', 'sans'],
        nexaLight: ['nexa-light', 'sans'],
      },
    },
  },
  plugins: [],
};
