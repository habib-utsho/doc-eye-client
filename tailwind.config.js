import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        spin360: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        spin360: "spin360 0.5s linear",
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        dark: {
          extend: "dark", // Inherit default values from dark theme
          colors: {
            background: "#0D001A",
            foreground: "#ffffff",
            paragraph: "#E0E0E0",
            primary: {
              50: "#3B096C",
              100: "#520F83",
              200: "#7318A2",
              300: "#9823C2",
              400: "#c031e2",
              500: "#09528C", // Updated primary color
              600: "#F182F6",
              700: "#FCADF9",
              800: "#FDD5F9",
              900: "#FEECFE",
              DEFAULT: "#09528C", // Updated primary color
              foreground: "#ffffff", // Primary foreground
            },
            secondary: {
              DEFAULT: "#E57373", // Updated secondary color
            },
            warning: "#FFA500", // Updated warning color
            success: "#17BD8D", // Updated success color
            danger: "#FF4E3E", // Updated danger color
            focus: "#F182F6",
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
        light: {
          extend: "light", // Inherit default values from light theme
          colors: {
            background: "#ffffff",
            foreground: "#0D001A",
            paragraph: "#333333",
            primary: {
              50: "#3B096C",
              100: "#520F83",
              200: "#7318A2",
              300: "#9823C2",
              400: "#c031e2",
              500: "#09528C", // Updated primary color
              600: "#F182F6",
              700: "#FCADF9",
              800: "#FDD5F9",
              900: "#FEECFE",
              DEFAULT: "#09528C", // Updated primary color
              foreground: "#0D001A", // Primary foreground
            },
            secondary: {
              DEFAULT: "#E57373", // Updated secondary color
            },
            warning: "#FFA500", // Updated warning color
            success: "#17BD8D", // Updated success color
            danger: "#FF4E3E", // Updated danger color
            focus: "#F182F6",
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
      },
    }),
  ],
};
