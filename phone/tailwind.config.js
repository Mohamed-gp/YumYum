// tailwind.config.js

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      fontSize: {
        xs: "11px",
        sm: "12px",
        base: "15px",
        lg: "18px",
        xl: "20px",
        "2xl": "26px",
        "3xl": "32px",
      },
      colors: {
        mainColor: {
          base: "#FF7E00",
          light: "#FF7E00",
          dark: "#FF7E00",
        },
      },
    },
  },
  // theme: {
  //   // container: { center: true, padding: "2rem" },
  //   // colors: {
  //   //   mainColor: "#FF7E00",
  //   // },
  //   // colors: {
  //   //   mainColor: "#FF7E00",
  //   //   // mainColors: ["#00b207" #8A33FD,#00acff,rgb(129, 190, 0)]
  //   //   bgColorWhite: "#ECEBEC",
  //   //   bgColorBlack: "#201F20",
  //   //   bgColorDanger: "#EA4B48",
  //   //   bgColorCartFooter: "#F6F6F6",
  //   // },
  // },
  plugins: [],
};
