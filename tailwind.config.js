module.exports = {
  content: ["./src/**/*.{html,js,njk,md,svg}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "primary": "#ee2b6c",
        "primary-light": "#fff0f5",
        "primary-50": "#fdeaf1",
        "primary-100": "#fbd5e3",
        "primary-hover": "#d61f5c",
        "primary-dark": "#c2104c",
        "background-light": "#f8f6f6",
        "background-dark": "#221016",
        "surface-light": "#ffffff",
        "surface-dark": "#2d151d",
        "surface-highlight-light": "#fff0f5",
        "surface-highlight-dark": "#3a1a25",
        "neutral-light": "#fdfbfc",
        "neutral-dark": "#2e1a21",
      },
      fontFamily: {
        "display": ["Plus Jakarta Sans", "sans-serif"],
        "plusJakartaSans": ["Plus Jakarta Sans", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.375rem", // rounded-md
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}
