/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#1565D8',
        'light-blue': '#E1EEFF',
        'sky-blue': '#A5CCFF',
      },
      spacing: {
        '128': '32rem', // Example: Adding a custom gap of 32rem (512px)
        '160': '40rem', // Example: Adding a custom gap of 40rem (640px)
      },
    },
  },
  plugins: [],
};
