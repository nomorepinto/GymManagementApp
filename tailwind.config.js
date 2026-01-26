/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./App.{js,ts,tsx}', './app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'app-navy': '#050E3C',
        'card-navy': '#002455',
        'card-slate': colors.slate[800],
        'slate-dark': colors.slate[900],
        'action-red': '#DC0000',
        'action-red-light': '#FF3838',
        'btn-active': '#808080',
        'item-active': colors.slate[700],
        'border-slate': colors.slate[600],
        white: '#ffffff',
        black: '#000000',
      },
      fontFamily: {
        nexaHeavy: ['nexa-heavy', 'sans'],
        nexaLight: ['nexa-light', 'sans'],
      },
    },
  },
  plugins: [],
};
