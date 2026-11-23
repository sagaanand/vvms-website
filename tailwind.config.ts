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
        // Hybrid Glass Core System
        surface: {
          dark: "#0A0E17",
          darkGlass: "rgba(15, 23, 42, 0.75)",
          light: "#F8FAFC",
          whiteGlass: "rgba(255, 255, 255, 0.80)",
        },
        text: {
          primary: "#0F172A",
          secondary: "#475569",
        },
        accent: {
          goldPrimary: "#D97706",
          goldSecondary: "#F59E0B",
          cyan: "#0284C7",
          green: "#15803D",
        },
        // Logo-derived brand color system
        brand: {
          black: "#0D1117",      // Deep onyx black from logo background
          dark: "#161B22",       // Dark surface slate
          card: "#1F242C",       // Dark elevated card surface
          gold: "#F59E0B",       // Warm gold/yellow from "வீடு" typography & roof frame
          goldLight: "#FDE047",  // Light golden accent
          goldDark: "#D97706",   // Deep amber gold
          cyan: "#00BCD4",       // Vivid Cyan from "வீட்டுமனை சந்தை" typography
          cyanLight: "#38BDF8",  // Sky cyan
          cyanDark: "#0891B2",   // Deep teal cyan
          red: "#EF4444",        // Vibrant Red from logo building & YouTube icon
          redDark: "#DC2626",
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
          800: "#0F172A",
          900: "#0C101A",
          950: "#070A10",        // Deepest backdrop
        },
        gold: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",        // Matched with logo "வீடு" gold
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          950: "#451A03",
        },
        cyan: {
          50: "#ECFEFF",
          100: "#CFFAFE",
          200: "#A5F3FC",
          300: "#67E8F9",
          400: "#22D3EE",
          500: "#06B6D4",        // Matched with logo "வீட்டுமனை சந்தை" cyan
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
        gold: "0 4px 20px -2px rgba(245, 158, 11, 0.35)",
        cyan: "0 4px 20px -2px rgba(6, 182, 212, 0.35)",
        card: "0 4px 24px -2px rgba(13, 17, 23, 0.08)",
        floating: "0 10px 30px -5px rgba(13, 17, 23, 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
