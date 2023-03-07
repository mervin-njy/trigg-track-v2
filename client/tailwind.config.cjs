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
        greenAccent: "#55efc4", // service provider
        greenMain: "#00b894",
        // blueAccent: "#74b9ff",
        // blueMain: "#0984e3",
        purpleAccent: "#a29bfe", // health logger
        purpleMain: "#6c5ce7",
        mainLightest: "#F1FDFF",
        main2: "#A8CAD0",
        main3: "#7EAAB3",
        main4: "#49777F",
        main5: "#3B5F67",
        main6: "#344C51",
        main7: "#2F3D40",
        main8: "#2D3436",
        main9: "#222425",
        mainDarkest: "#141516",
      },
      textUnderlineOffset: {
        12: "0.75rem",
        15: "0.938rem",
        22: "1.375rem",
      },
      borderWidth: {
        1: "0.1rem",
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
        vibrateNormal: "vibrate 1.2s ease-in-out infinite",
        vibrateSlow: "vibrate 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        vibrate: {
          "0%, 100%": {
            transform: "translateY(-4%)",
            // transform: "scale(1.01)",
            animationTimingFunction: "cubic-bezier(0, 0, 0, 0)",
          },
          "50%": {
            transform: "translateY(0)",
            // transform: "scale(1)",
            animationTimingFunction: "cubic-bezier(0, 0, 0, 0)",
          },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        // glowing {
        //   "0%": { backgroundColor: "#474368", boxShadow: "0 0 0 #474368", color: "#a29bfe"},
        //   "50%": { backgroundColor: "#a29bfe", boxShadow: "0 0 1.2rem #a29bfe", color: "#474368" },
        //   "100%": { backgroundColor: "#474368", boxShadow: "0 0 0.5rem #474368", color: "#a29bfe" },
        // }
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
      boxShadow: {
        xl: "0 0.5rem 3rem -0.5rem rgba(241, 253, 255, 0.2)",
        "3xl": "0 1.5rem 5rem -1.5rem rgba(241, 253, 255, 0.4)",
        btnGeneral: "0 0.5rem 3rem -0.5rem rgba(126, 170, 179, 0.5)",
        btnAdmin: "0 0.5rem 3rem -0.5rem rgba(250, 177, 160, 0.5)",
        btnLogger: "0 0.5rem 3rem -0.5rem rgba(162, 155, 254, 0.5)",
        btnServicer: "0 0.5rem 3rem -0.5rem rgba(85, 239, 196, 0.5)",
      },
    },
  },
  variants: {
    animation: ["motion-safe"],
  },
  plugins: [],
};
