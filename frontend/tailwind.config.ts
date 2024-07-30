import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "dark-1": "#000",
        "white-1": "#fff",
        primary: "#f77448",
        secondary: "#3B82F6",
      },
      fontFamily: {
        coolvetica: ["coolvetica", "sans-serif"],
      },
      backgroundImage: {
        "footer-image": "url('/assets/footer-bg.svg')",
        "burner-wallet-bg": "url('/assets/burnerWalletBg.svg')",
        "burner-wallet-bg-dark": "url('/assets/burnerWalletBgDark.svg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        primaryGradient:
          "linear-gradient(180deg, #FF8D4E -9.12%, #FF6734 39.7%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
