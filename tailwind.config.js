/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        normal: '#9099a1ff',
        bug: '#90c12cff',
        electric: '#f3d23bff',
        fighting: '#ce4069ff',
        ghost: '#5269acff',
        psychic: '#f97176ff',
        flying: '#92aadeff',
        steel: '#5a8ea1ff',
        ice: '#74cec0ff',
        poison: '#ab6ac8ff',
        fire: '#ff9c54ff',
        dragon: '#096dc4ff',
        ground: '#d97746ff',
        water: '#4d90d5ff',
        dark: '#5a5366ff',
        rock: '#c7b78bff',
        grass: '#63bb5bff',
        fairy: '#ec8fe6ff',
      }
    },
  },
  plugins: [],
}