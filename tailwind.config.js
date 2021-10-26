module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Helvetica", "Arial", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        "mesh-bg": "url('/static/background.png')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
