/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBg: "#0B0F17",
        surfaceCard: "#161F30",
        surfaceHover: "#1E293B",
        emeraldAccent: "#10B981",
        cyanAccent: "#06B6D4"
      }
    },
  },
  plugins: [],
}
