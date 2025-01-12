/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // This was incorrectly set as "html.ts"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
