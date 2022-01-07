module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        "mesh-bg": "url('/static/background.png')",
      },
      fontFamily: {
        sans: ["BalsamiqSans", "Helvetica", "Arial", "sans-serif"],
        custom: ["BalsamiqSans"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
