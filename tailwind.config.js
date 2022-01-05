const tailwindForms = require('@tailwindcss/forms')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/views/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media',
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
