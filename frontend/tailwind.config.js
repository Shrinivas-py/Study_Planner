export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
      },
      backgroundImage: {
        'mesh': "radial-gradient(at 0% 0%, hsla(160,84%,39%,0.15) 0px, transparent 50%), radial-gradient(at 98% 1%, hsla(180,70%,50%,0.12) 0px, transparent 50%), radial-gradient(at 50% 100%, hsla(200,80%,60%,0.1) 0px, transparent 50%)",
      },
    },
  },
  plugins: [],
}