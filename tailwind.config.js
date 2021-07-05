const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  important: true,
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      display: ['Roboto', 'sans-serif'],
      body: ['Roboto', 'sans-serif'],
    },
    extend: {
      boxShadow: {
          xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
          outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
      },
      spacing: {
          14: '3.5rem',
          28: '7rem',
          52: '13rem',
          72: '18rem',
          80: '20rem',
          84: '21rem',
          96: '24rem',
          112: '28rem',
          128: '32rem',
          134: '36.500rem',
          140: '41.875rem',
          145: '45.875rem',
          150: '50rem',
      },
      margin: {
          96: '24rem',
          128: '32rem',
      },
      borderRadius: {
          xl: '1.2rem',
          1: '1rem',
      },
  },


  },
  variants: {
    extend: {},
  },
  plugins: [],
}
