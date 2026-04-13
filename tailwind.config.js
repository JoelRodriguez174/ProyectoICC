/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#000000',
        'secondary': '#4b5563',
        'accent': '#ef4444',
        'bg-main': '#ffffff',
        'bg-secondary': '#f9fafb',
      }
    },
  },
  plugins: [],
}
