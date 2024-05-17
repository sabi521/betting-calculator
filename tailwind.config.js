/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit", // activates Just-in-Time mode
  prefix: "", // adds 'tw-' prefix to the classes
  content: ["./**/*.html", "./**/*.{vue,js,ts,jsx,tsx}"], // update this path if needed, include *.php
  media: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui"],
        roboto: ["Roboto", "sans-serif"],
        montserrat: ["montserrat", "sans-serif"],
        nexaheavy: ['"Nexa Heavy"'],
        nexabold: ['"Nexa Bold"'],
        nexaregular: ['"Nexa Regular"'],
        nexalight: ['"Nexa Light"'],
        kommissarCondensed: ['"Kommissar Condensed"'],
        ubuntuRegular: ["Ubuntu Regular"],
        ubuntuLight: ["Ubuntu Light"],
        ubuntuBold: ["Ubuntu Bold"],
        ubuntuMedium: ["Ubuntu Medium"],
      },
      boxShadow: {
        "sportsbook-calculator-card-box-shadow":
          "0 0 12px 5px rgba(0, 0, 0, .1)",
        "light-grey-box-shadow": "box-shadow: 0 0 1px 1px #f1f1f5",
      },
      colors: {
        "light-color": "#828c93",
        "fuji-grey": "#1d2228",
        "fuji-light": "#F1F1F5",
        "label-grey": "#b9bdc5",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
