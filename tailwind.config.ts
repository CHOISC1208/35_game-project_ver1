import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6B6B",
        secondary: "#4ECDC4",
        accent: "#FFE66D",
        pastel: {
          pink: "#FFD6D6",
          blue: "#D6E8FF",
          green: "#D6FFE8",
          yellow: "#FFF9D6",
          purple: "#EDD6FF",
        },
      },
      fontFamily: {
        rounded: ["Nunito", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      animation: {
        bounce: "bounce 0.6s ease-in-out infinite",
        "stamp-in": "stamp-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      keyframes: {
        "stamp-in": {
          "0%": { transform: "scale(3)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
