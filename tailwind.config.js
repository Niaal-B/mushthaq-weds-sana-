export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#3b2a22',
        inksoft: '#5a4537',
        wine: '#3a1218',
        winedeep: '#22090d',
        plum: '#4a1f2a',
        gold: '#b08a4a',
        goldlight: '#d9bd84',
        cream: '#ede4d7',
        parchment: '#e9e0d1',
        champagne: '#e4c99c',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        serif: ['Lora', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        quran: ['"Amiri Quran"', 'Amiri', 'serif'],
        arabic: ['Amiri', '"Noto Naskh Arabic"', 'serif'],
      },
    },
  },
};
