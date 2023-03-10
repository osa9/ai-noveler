/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './src/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
  ],
  plugins: [require('flowbite/plugin')],
  theme: {
    extend: {},
  },
}
