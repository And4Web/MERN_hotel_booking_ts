/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    container: {
      padding: {
        lg: "6rem",
        md: "4rem",
        sm: "2rem",
        xs: "1rem"
      }
    }
  },
  plugins: [],
}

