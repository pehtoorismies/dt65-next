const tailwindForms = require('@tailwindcss/forms')

module.exports = {
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        main: ['Titillium Web', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [tailwindForms],
}
