export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: '#F1F4F1',
        ink: {
          DEFAULT: '#152019',
          600: '#33443A',
          400: '#5C6E63',
        },
        moss: {
          50: '#EAF3EE',
          100: '#D2E6DA',
          400: '#3F8F73',
          500: '#1E7F5C',
          600: '#166248',
          700: '#0F4B37',
        },
        gold: {
          50: '#FBF1DC',
          400: '#E3A93C',
          500: '#CC9327',
          600: '#A9791C',
        },
        clay: {
          50: '#FBEAE4',
          400: '#E2704F',
          500: '#C85A3B',
          600: '#A5462C',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}