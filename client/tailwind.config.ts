import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "var(--color-bg-primary, #FAF8F5)",
          secondary: "var(--color-bg-secondary, #F1ECE4)",
        },
        text: {
          primary: "var(--color-text-primary, #241F1C)",
          secondary: "var(--color-text-secondary, #6B625B)",
        },
        accent: {
          DEFAULT: "var(--color-accent, #C97B63)",
          alt: "var(--color-accent-alt, #8B7355)",
        },
        success: "var(--color-success, #6B8F71)",
        error: "var(--color-error, #B54A4A)",
        border: "var(--color-border, #E3DDD3)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Playfair Display", "Cormorant Garamond", "serif"],
        body: ["var(--font-body)", "Inter", "Be Vietnam Pro", "sans-serif"],
      },
      borderRadius: {
        button: "8px",
        input: "8px",
        card: "12px",
      },
    },
  },
  plugins: [],
};
export default config;
