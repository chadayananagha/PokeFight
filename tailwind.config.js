/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        outline: ["Londrina Outline", "sans-serif"],
      },
      fontSize: {
        "4xl": "2.25rem",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["night", "lemonade"],
  },
};
