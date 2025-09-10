/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#2563eb", // azul principal
          dark: "#1e40af",    // azul oscuro
          light: "#60a5fa",   // azul claro
        },
        secondary: {
          DEFAULT: "#f97316", // naranja
          dark: "#c2410c",
          light: "#fdba74",
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
};
