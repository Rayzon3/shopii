module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      'midNight': '#243443',
      'green': '#2DF6AE',
      'white':'#FFFFFF',
      'gray': '#808080',
      'red': '#FF0000'
    }),
    textColor: theme => ({
      'midNight': '#243443',
      'green': '#2DF6AE',
      'white':'#FFFFFF'
    }),
    extend: {
      backgroundOpacity: {
        '0': '0',
        '10': '0.1',
        '20': '0.2',
        '95': '0.95',
        '100': '1',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
