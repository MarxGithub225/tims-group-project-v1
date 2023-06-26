/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      tablet: '769px',
      // => @media (min-width: 640px) { ... }

      laptop: '1025px',
      // => @media (min-width: 1024px) { ... }

      desktop: '1201px'
      // => @media (min-width: 1280px) { ... }
    },
    colors: {
      blackColor: "#161D25",
      blackLightColor: "#637381",
      mainColor: "#E73A5D",
      secondColor: "#F4A607",
      creamColor: "#FFF4CF",
      greenLightColor: "#47C1BF",
      greenColor: "#47C1BF",
      greyLightColor: "#959EAD",
      greyWhiteColor: "#F9FAFB",
      greyColor: "#919EAB",
      darkHeartLightColor: "#C4CDD5",
      darkHeartColor: "#454F5B",
      lightBorderColor: "#C4CDD5",
      blueColor: "#5C6AC4",
      blueDarkColor: "#43467F",
      yellowColor: "#EEC200",
      yellowLightColor: "#F4A607",
      redLightColor: "#DE3618",
      primary: "#DE3618",
      redColor: "#DE3618"

    },
    extend: {
      keyframes: {
        ping: {
          '75%': { transform: 'scale(2)', opacity: 0 },
          '100%': { transform: 'scale(2)', opacity: 0 },
        },
        fadeIn: {
          '0%': {
            opacity: 0
          },
          '100%': {
            opacity: 1
          }
        }
      },
      animation: {
        'ping': 'ping 3s cubic-bezier(0, 0, 0.2, 1)',
        'fade-in': 'fadeIn 3s',
      },
    },
  },
  plugins: [],
}
