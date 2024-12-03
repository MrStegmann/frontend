/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.card-size': {
          width: '6rem',
          height: '9rem',
          fontSize: ".6rem",
          lineHeight: ".75rem"
        },
        '@screen lg': {
          '.card-size': {
            width: '14.375rem',
            height: '20rem',
            fontSize: "1.2rem",
            lineHeight: "1rem"
          },
        },
      });
    },
  ],
}

