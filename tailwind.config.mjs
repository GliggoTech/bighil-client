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
        blue: "#0d6efd",
        indigo: "#6610f2",
        purple: "#6f42c1",
        pink: "#d63384",
        red: "#dc3545",
        orange: "#fd7e14",
        yellow: "#ffc107",
        green: "#198754",
        teal: "#20c997",
        cyan: "#0dcaf0",
        gray: "#6c757d",
        text_color: "#242e4c",
        default_bg: "#f7f8f9",
        info_bg: "#2f89f5",
        danger_bg: "#fb5454",
        back_bg: "#f4f6fd",
        toast_success_bg: "#56d094",
        bighil_dashboard_bg: "#f0f0f8",
        pagination_border: "#dee2e6",
        dialog_inside_border_color: "#eff0f6",
        client_login_bg: "#525ce5",
        "active-link": "#0d6efd",
        "gray-dark": "#343a40",
        "gray-100": "#f8f9fa",
        "gray-200": "#e9ecef",
        "gray-300": "#dee2e6",
        "gray-400": "#ced4da",
        "gray-500": "#adb5bd",
        "gray-600": "#6c757d",
        "gray-700": "#495057",
        "gray-800": "#343a40",
        "gray-900": "#212529",
        black: "#000000",
        white: "#ffffff",

        // Theme aliases
        primary: "#0d6efd",
        secondary: "#6c757d",
        success: "#198754",
        info: "#0dcaf0",
        warning: "#ffc107",
        danger: "#dc3545",
        light: "#f8f9fa",
        dark: "#212529",

        // Subtle BGs
        "primary-bg-subtle": "#cfe2ff",
        "secondary-bg-subtle": "#e2e3e5",
        "success-bg-subtle": "#d1e7dd",
        "info-bg-subtle": "#cff4fc",
        "warning-bg-subtle": "#fff3cd",
        "danger-bg-subtle": "#f8d7da",
        "light-bg-subtle": "#fcfcfd",
        "dark-bg-subtle": "#ced4da",

        // Subtle borders
        "primary-border-subtle": "#9ec5fe",
        "secondary-border-subtle": "#c4c8cb",
        "success-border-subtle": "#a3cfbb",
        "info-border-subtle": "#9eeaf9",
        "warning-border-subtle": "#ffe69c",
        "danger-border-subtle": "#f1aeb5",
        "light-border-subtle": "#e9ecef",
        "dark-border-subtle": "#adb5bd",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
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
