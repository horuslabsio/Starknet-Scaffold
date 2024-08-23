import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-black": "#1F1F1F",
        "bg-white": "#FFFFFF",
        "dark-font-color": "#141925",
      },
      fontFamily: {
        Coolvetica: ["Coolvetica", "sans-serif"],
      },
      backgroundImage: {
        "hero-image": "url('/hero-bg.png')",
        "footer-image": "url('/footer-bg.png')",
        "linear-gradient":
          "linear-gradient(180deg, #FF8D4E -9.12%, #FF6734 39.7%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "glass-gradient":
          "linear-gradient(180deg, rgba(255,255,255,0.1) 32%, rgba(0,0,0,0.3) 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
