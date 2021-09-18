module.exports = {
  prefix: '',
  purge: {
    content: ['./src/**/*.{html,ts}'],
    options: {}
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      heading: ['Comfortaa', 'sans-serif'],
      body: ['Nunito', 'sans-serif'],
    },
    extend: {
      colors: {
        'primary': '#3ADEC5',
        'onPrimary': '#ffffff'
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite'
      },
      fontSize: {
        'label': '1.08rem',
      }
    }
  },
  variants: {
    extend: {
      opacity: ['disabled']
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
