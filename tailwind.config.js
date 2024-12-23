/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors:{
        'dark-blue': '#1565d8',
        'light-blue': '#E1EEFF',
        'sky-blue': '#A5CCFF',
      }
    },
  },
  plugins: [],
};
