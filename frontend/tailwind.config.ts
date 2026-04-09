import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        surface: "#131313",
        "surface-lowest": "#0e0e0e",
        "surface-low": "#1c1b1b",
        "surface-high": "#2a2a2a",
        "surface-highest": "#353534",
        primary: "#adc6ff",
        "primary-deep": "#4d8eff",
        secondary: "#4edea3",
        tertiary: "#ffb786",
        muted: "#c2c6d6",
        outline: "#8c909f",
        "secondary-container": "#00311f"
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        display: ["var(--font-inter)"],
        label: ["var(--font-space-grotesk)"],
        mono: ["var(--font-jetbrains-mono)"]
      },
      boxShadow: {
        glow: "0 0 40px -14px rgba(173, 198, 255, 0.32)"
      },
      backgroundImage: {
        grid: "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
        dots: "radial-gradient(circle, rgba(140, 144, 159, 0.15) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
