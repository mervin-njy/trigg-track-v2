/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        oxygen: ['"Oxygen"'],
        montserrat: ['"Montserrat"'],
      },
      // fontSize: {
      //   xxxs: "0.75rem",
      //   xxs: "1rem",
      //   xs: "1.5rem",
      //   sm: "2.4rem",
      //   lg: "3.5rem",
      // },
      colors: {
        orangeAccent: "#fab1a0", // admin
        orangeMain: "#ff7675",
        yellowAccent: "#ffeaa7",
        yellowMain: "#fdcb6e",
        greenAccent: "#55efc4",
        greenMain: "#00b894",
        blueAccent: "#74b9ff", // service provider
        blueMain: "#0984e3",
        purpleAccent: "#a29bfe", // health logger
        purpleMain: "#6c5ce7",
        greyLightest: "#dfe6e9",
        greyLight: "#b2bec3",
        greyDark: "#636e72",
        greyDarkest: "#2d3436",
      },
      textUnderlineOffset: {
        12: "0.75rem",
        15: "0.938rem",
        22: "1.375rem",
      },
      // borderRadius: {
      //   xs: "0.8rem",
      //   sm: "1.5rem",
      //   lg: "3rem",
      //   xl: "8rem",
      // },
      margin: {
        superLargeNegative: "-350px",
        largeNegative: "-220px",
        mediumNegative: "-150px",
        negative: "-50px",
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in forwards",
        bounceShort: "bounce 1s ease-in-out 2",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      width: {
        "3/10": "30%",
        "9/15": "60%",
        "10/15": "66.67%",
        "7/10": "70%",
        "11/15": "73.33%",
        "12/15": "80%",
        "13/15": "86.67%",
        "14/15": "93.33%",
      },
    },
  },
  variants: {
    animation: ["motion-safe"],
  },
  plugins: [],
};
