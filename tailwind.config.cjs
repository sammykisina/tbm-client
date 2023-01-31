/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Source_Sans_Pro: ["Source_Sans_Pro"],
      },
      animation: {
        enter: "fadeInRight 300ms ease-out",
        leave: "fadeOutLeft 300ms ease-in forwards",
      },
      keyframes: {
        fadeInRight: {
          "0%": {
            opacity: "0",
            transform: "translate(2rem)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(0)",
          },
        },
        fadeOutLeft: {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
      },
      colors: {
        c_white: "#EFF0F3",
        c_primary: "#004643",
        c_yellow: "#F9BC60",
        c_red: "#E16162",
        c_gary: "#ABD1C6",
      },
    },
    screens: {
      xs: "500px",
      sm: "640px",
      md: "768px",
      xmd: "925px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [require("tailwind-scrollbar-hide", "tailwindcss-textshadow")],
};
