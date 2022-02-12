module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      midNight: '#243443',
      midNightDarker: '#1d2a36',
      greenDarker: '#29dd9d',
      green: '#2DF6AE',
      white: '#FFFFFF',
      gray: '#808080',
      red: '#FF0000',
      dark: '#141919',
    }),
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
      '50%': '50%',
      16: '4rem',
    },
    textColor: (theme) => ({
      midNight: '#243443',
      midNightDarker: '#1d2a36',
      green: '#2DF6AE',
      white: '#FFFFFF',
    }),
    extend: {
      backgroundOpacity: {
        0: '0',
        10: '0.1',
        20: '0.2',
        95: '0.95',
        100: '1',
      },
      fontFamily: {
        noto: "'Noto Sans', sans-serif",
        pacifico: "'Pacifico', cursive;",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
