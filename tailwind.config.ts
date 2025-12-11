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
        "primary-dark": "#2F4858",
        "primary-light": "#C4B39A",
        "text-ui": "#3A332B",
        background: "#F0EBE7",
        "accent-warm": "#6AADBD",
        "accent-cool": "#6A8EAE",
        "heading-accent": "#5B4C3A",
      },
      fontFamily: {
        garamond: ["EB Garamond", "serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
