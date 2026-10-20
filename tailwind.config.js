/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        work: '#FFD000',
        about: '#00D2AA',
        profile: '#FF2964',
        experience: '#0EAD69',
        photo: '#540D6E',
        tldr: '#540D6E',
        stroke: '#313131',
        darkCanvas: '#090909',
      },
      fontFamily: {
        boldonse: ['Boldonse', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
