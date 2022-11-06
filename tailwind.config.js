/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
module.exports = {
  darkMode: ['class', '[data-mode="dark"]'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundColor: {},
      colors: {
        'main-from': '#F6A20A',
        'main-to': '#E56304',
        'title-color': '#F6A20A',
      },
      boxShadow: {
        'dark-btn': '1px 10px 20px rgba(0, 0, 0, 0.7)',
        'light-btn': '1px 10px 20px rgba(162, 162, 162, 0.7)',
        'dark-btn-active': '1px 3px 5px rgba(0, 0, 0, 0.7)',
        'light-btn-active': '1px 3px 5px rgba(162, 162, 162, 0.7)',
      },
      inset: {
        '2/5': '40%',
      },
    },
  },
  plugins: [],
};
