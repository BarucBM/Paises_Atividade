/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily:{
        tropical:["treai"]
      },

  

    },
    colors: {
      'vermelho': '#D52B1E',
      'preto': '#141414',
      'branco': '#F0EAD6',
      'verde': '#556B2F',
      'azul': '#0047AB',
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
    },
  },
  plugins: [],
}

