module.exports = {
  mode: 'jit',
  darkMode: false,
  purge: {
    content: ['./src/app/**/*.{js,ts,jsx,tsx}', './src/app/components/**/*.{js,ts,jsx,tsx}'],
    options: {
      safelist: {
        standard: [/^bg-/, /^text-/],
      },
    },
  },
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}
