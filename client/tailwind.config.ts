import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        white: "#FFFFFF",
        black: "#000000",
        neutral50: "#fafafa",
        neutral100: "#f5f5f5",
        neutral200: "#e5e5e5",
        neutral300: "#d4d4d4",
        neutral400: "#a3a3a3",
        neutral500: "#737373",
        neutral600: "#525252",
        neutral700: "#404040",
        neutral800: "#262626",
        neutral900: "#171717",
        neutral950: "#0a0a0a",
      },
    },
  },
  plugins: [],
};
export default config;
