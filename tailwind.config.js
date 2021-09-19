const tailwindForms = require('@tailwindcss/forms')

module.exports = {
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Titillium Web', 'sans-serif'],
    },
    extend: {
      colors: {
        dt: '#ff80ea',
      },
      // fontFamily: {
      //   main: ['Titillium Web', 'sans-serif'],
      // },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [tailwindForms],
}

// #ff80ea
