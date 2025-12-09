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
          50: '#fff4e6',
          100: '#ffe0b3',
          200: '#ffcc80',
          300: '#ffb84d',
          400: '#ffa31a',
          500: '#e68900',
          600: '#cc7700',
          700: '#b36600',
          800: '#995500',
          900: '#804400',
        },
        brown: {
          50: '#faf8f6',
          100: '#f5f0eb',
          200: '#e8ddd4',
          300: '#d4c4b5',
          400: '#b89d8a',
          500: '#9d7a66',
          600: '#8b6b5a',
          700: '#6d5548',
          800: '#5a463c',
          900: '#4a3a32',
        },
      },
    },
  },
  plugins: [],
}

