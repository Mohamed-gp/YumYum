/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: { center: true, padding: "2rem" },
      colors: {
        // mainColor: "#f13a01",
        // mainColor: "rgb(129, 190, 0)",
        mainColor: "#FF7E00",   
        // mainColor: "#00b207",
        // mainColor: "#8A33FD",
        bgColorWhite: "#ECEBEC",
        bgColorBlack: "#201F20",
        bgColorDanger: "#EA4B48",
        bgColorCartFooter: "#F6F6F6",

        // #8A33FD
        // #00acff
      },
    },
  },
  plugins: [],
};
