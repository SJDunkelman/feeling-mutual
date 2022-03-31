module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    'bg-tomato'
  ],
  theme: {
    container: {
      center: true,
    },
    screens: {
      'mobile-only': {'max': '480px'},
      'sm': '480px',
      'md': '768px',
      'lg': '1150px',
    },
    extend: {
      colors: {
        white: '#ffffff',
        offwhite: '#efe2d7',
        sandybrown: '#ffab5c',
        maroon: '#6d012d',
        green: '#2b422b',
        blue: '#313978',
        tomato: '#fa5a50',
        pink: '#fec8d2',
        gold: '#7d6544',
        midnight: '#1c3159'
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}