/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f5f5',
          100: '#e8e8e8',
          200: '#d1d1d1',
          300: '#b3b3b3',
          400: '#9a9a9a',
          500: '#808080',
          600: '#666666',
          700: '#4d4d4d',
          800: '#333333',
          900: '#1a1a1a',
        },
        accent: {
          50: '#fdf8f5',
          100: '#fbeee6',
          200: '#f7dcc2',
          300: '#f2c49e',
          400: '#eda97a',
          500: '#e68956',
          600: '#cc774d',
          700: '#b36644',
          800: '#99553b',
          900: '#804432',
        },
        brown: {
          50: '#fdf8f5',
          100: '#fbeee6',
          200: '#f7dcc2',
          300: '#f2c49e',
          400: '#eda97a',
          500: '#e68956',
          600: '#cc774d',
          700: '#b36644',
          800: '#99553b',
          900: '#804432',
        },
      },
    },
  },
  plugins: [],
}
