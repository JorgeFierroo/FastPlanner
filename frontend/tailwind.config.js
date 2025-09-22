/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"], // tipografía global
      },
      colors: {
        primary: {
          DEFAULT: "#00BFFF", // celeste
          dark: "#009ACD",    // celeste más oscuro
          light: "#87CEFA",   // celeste claro
        },
        neutral: {
          black: "#000000",   // negro
          white: "#FFFFFF",   // blanco
          gray: "#F5F5F5",    // gris claro
          darkgray: "#2E2E2E" // gris oscuro para contrastes
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
};
