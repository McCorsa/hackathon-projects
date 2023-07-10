const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Montserrat', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  daisyui: {
    themes: [
      {
        codenet: {
          "primary": "#34cd3c",
          "secondary": "#74a9be",
          "accent": "#212154",
          "neutral": "#1e1e1e",
          "base-100": "#0a0d2a",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

