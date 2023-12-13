import themes from "./src/lib/themes.js";

/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  daisyui: {
    themes: [...themes],
  },

  theme: {
    screens: {
      xxs: "300px",
      xs: "400px",
      sm: "576px",
      md: "960px",
      lg: "1440px",
    },
    extend: {},
  },

  plugins: [require("daisyui")],
};

module.exports = config;
