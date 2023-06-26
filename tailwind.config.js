/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      backgroundImage: {
        'spawn-zombie-back': "url('./img/ZombicideSpawnBack.png')",
        'spawn-zombie-front': "url('./img/ZombicideSpawnFront.png')",
        'spawn-necromancer': "url('./img/necromancer.png')",
        'spawn-double': "url('./img/double.png')",
        'spawn-horde': "url('./img/horde.png')"
      }
    },
  },
  plugins: [],
}

