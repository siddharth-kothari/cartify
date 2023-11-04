import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        abril: ["Abril Fatface", "san-serif"],
        manrope: ["Manrope", "sans"],
      },
    },
  },
  plugins: [],
};
export default config;
