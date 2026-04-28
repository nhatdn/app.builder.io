/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "beige-50": "#F5F1ED",
        "beige-100": "#E8E3DC",
        "beige-200": "#D9CEC3",
        "sage-500": "#6B8E6F",
        "orange-500": "#E8A93B",
        "orange-600": "#D1901B",
        "mint-50": "#D4F4E8",
        "mint-100": "#B8E8D9",
        "red-100": "#F5D4D4",
        "red-500": "#E74C3C",
        "brown-500": "#8B6F47",
        "amber-600": "#B87333",
      },
    },
  },
  plugins: [],
};
