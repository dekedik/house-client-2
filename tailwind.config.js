/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Основная палитра для строительной компании
        brand: '#2C1F14', // Премиальный очень темно-коричневый цвет
      },
    },
  },
  plugins: [],
}
