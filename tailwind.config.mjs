import tailwindcssAnimate from "tailwindcss-animate";
/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: {
          DEFAULT: "#2563EB", // Modern blue for CTAs and primary actions
          light: "#60A5FA", // Lighter shade for hover states
          dark: "#1E40AF", // Darker shade for active states
        },

        // Secondary Colors
        secondary: {
          DEFAULT: "#7C3AED", // Purple for highlighting important features
          light: "#A78BFA", // Lighter purple for secondary elements
          dark: "#5B21B6", // Darker purple for emphasis
        },

        // Accent Colors
        accent: {
          success: "#10B981", // Green for positive actions/status
          warning: "#F59E0B", // Amber for warnings/pending
          danger: "#ef4444", // Red for errors/critical
          info: "#3B82F6", // Blue for information
          heavyDanger: "#ff0000",
        },

        // Background Colors
        background: {
          primary: "#FFFFFF", // Main background
          secondary: "#F9FAFB", // Secondary background
          tertiary: "#F3F4F6", // Tertiary background
          dark: "#111827", // Dark mode background
        },

        // Surface Colors
        surface: {
          light: "#FFFFFF", // Cards and elevated surfaces
          medium: "#F9FAFB", // Secondary surfaces
          dark: "#1F2937", // Dark mode surfaces
        },

        // Text Colors
        text: {
          primary: "#111827", // Primary text
          secondary: "#4B5563", // Secondary text
          muted: "#9CA3AF", // Muted text
          light: "#FFFFFF", // Light text
        },

        // Border Colors
        border: {
          light: "#E5E7EB", // Light borders
          medium: "#D1D5DB", // Medium borders
          dark: "#374151", // Dark borders
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-in": "slideIn 0.3s ease-in-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
