import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // VVMS Official Brand Colour System (Approved Palette)
        vvms: {
          primaryGold: "#F9DB5C",
          lightGold: "#F6E785",
          turquoise: "#22CDE1",
          red: "#C20E10",
          antiqueGold: "#B78D42",
          charcoal: "#202020",
          offWhite: "#F2F2F2",
        },
        // Hybrid Glass Core System
        surface: {
          dark: "#202020",
          darkGlass: "rgba(32, 32, 32, 0.85)",
          light: "#F2F2F2",
          whiteGlass: "rgba(242, 242, 242, 0.88)",
        },
        text: {
          primary: "#202020",
          secondary: "#4A5568",
        },
        accent: {
          goldPrimary: "#F9DB5C",
          goldSecondary: "#F6E785",
          antiqueGold: "#B78D42",
          cyan: "#22CDE1",
          red: "#C20E10",
          green: "#15803D",
        },
        // Logo-derived brand color system mapped to the 7 approved colors
        brand: {
          black: "#202020",      // Charcoal Black #202020
          charcoal: "#202020",   // Charcoal Black
          offWhite: "#F2F2F2",   // Off White
          dark: "#252525",       // Dark elevated surface
          card: "#2B2B2B",       // Dark card surface
          gold: "#F9DB5C",       // Primary Gold #F9DB5C
          goldLight: "#F6E785",  // Light Gold #F6E785
          goldDark: "#B78D42",   // Antique Gold #B78D42
          antiqueGold: "#B78D42",// Antique Gold #B78D42
          cyan: "#22CDE1",       // Turquoise Blue #22CDE1
          cyanLight: "#67E8F9",  // Light turquoise
          cyanDark: "#0891B2",   // Deep turquoise
          turquoise: "#22CDE1",  // Turquoise Blue
          red: "#C20E10",        // Construction Red #C20E10
          redDark: "#9E0A0C",    // Deep construction red
        },
        navy: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#334155",
          700: "#1E293B",
          800: "#202020",
          900: "#1A1A1A",
          950: "#121212",        // Deepest backdrop
        },
        gold: {
          50: "#FEFCE8",
          100: "#FEF9C3",
          200: "#F6E785",        // Light Gold #F6E785
          300: "#F9DB5C",        // Primary Gold #F9DB5C
          400: "#F9DB5C",        // Primary Gold #F9DB5C
          500: "#E0BF38",
          600: "#B78D42",        // Antique Gold #B78D42
          700: "#9A7332",
          800: "#7A5B27",
          950: "#3A2A12",
        },
        cyan: {
          50: "#ECFEFF",
          100: "#CFFAFE",
          200: "#A5F3FC",
          300: "#67E8F9",
          400: "#22CDE1",        // Turquoise Blue #22CDE1
          500: "#22CDE1",        // Turquoise Blue #22CDE1
          600: "#0891B2",
          700: "#0E7490",
          800: "#155E75",
          900: "#164E63",
        },
        emerald: {
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          800: "#15803D",        // WhatsApp and DTCP verified
          900: "#064E3B",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      boxShadow: {
        gold: "0 4px 20px -2px rgba(249, 219, 92, 0.40)",
        antique: "0 4px 20px -2px rgba(183, 141, 66, 0.35)",
        cyan: "0 4px 20px -2px rgba(34, 205, 225, 0.35)",
        red: "0 4px 20px -2px rgba(194, 14, 16, 0.35)",
        card: "0 4px 24px -2px rgba(32, 32, 32, 0.08)",
        floating: "0 10px 30px -5px rgba(32, 32, 32, 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
